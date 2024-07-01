import { OpenaiControllerCreate200Item, RequestBodyOpenaiDto } from "@api/services/models";
import { useOpenaiControllerCreate, useOpenaiControllerCreateGraph } from "@api/services/openai";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import Loader from "@shared/components/Loader";
import { snakeToReadableText } from "@shared/formatter";
import { Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import BarChart from "./DashboardChart";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

const DashboardOpenAi = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [rows, setRows] = useState<any[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [columns, setColumns] = useState<any[]>([]);
	const [type, setType] = useState("Card");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (event: SelectChangeEvent<any[]>) => {
		const {
			target: { value },
		} = event;
		setColumns((prev) => {
			return prev.map((item) => {
				if (value.includes(item?.field)) {
					return {
						...item,
						show: true,
					};
				}
				return {
					...item,
					show: false,
				};
			});
		});
	};

	const validationSchema = Yup.object().shape({
		prompt: Yup.string().required("Prompt is required"),
	});
	const openAiApi = useOpenaiControllerCreate();
	const openAiApiGraph = useOpenaiControllerCreateGraph();

	const initialValues: RequestBodyOpenaiDto = {
		prompt: "",
	};

	const [graphData, setGraphData] = useState({ options: null, series: null });

	const handleChangeType = (
		event: SelectChangeEvent,
		formik: FormikProps<RequestBodyOpenaiDto>,
	) => {
		setType(event.target.value as string);
		setRows([]);
		setColumns([]);
		setGraphData({ options: null, series: null });
		formik.setFieldValue("prompt", "");
	};
	const handleSubmit = async (values: RequestBodyOpenaiDto) => {
		if (type == "Card") {
			try {
				setRows([]);
				setColumns([]);
				const a = await openAiApi.mutateAsync({
					data: {
						prompt: values.prompt,
					},
				});
				const keysData = a as OpenaiControllerCreate200Item[];
				const keys = Object.keys(keysData[0]);

				const rowsData = keysData?.map((item, index) => {
					return {
						id: item?.id ?? index + 1,
						...item,
					};
				});

				setRows(rowsData);

				const columns = keys?.map((key) => {
					if (
						key === "id" ||
						key === "createdAt" ||
						key === "updatedAt" ||
						key === "deletedAt" ||
						key === "user_id" ||
						key === "isExist" ||
						key === "id" ||
						key?.includes("password") ||
						key?.includes("id")
					)
						return null;
					return {
						field: key,
						headerName: snakeToReadableText(key),
						flex: 1,
						show: true,
					};
				});

				setColumns(columns.filter((item) => item !== null));
			} catch (error) {
				setRows([]);
				setColumns([]);
				console.error(error);
			}
		} else {
			try {
				const response = await openAiApiGraph.mutateAsync({
					data: {
						prompt: values.prompt,
					},
				});
				setGraphData({
					options: response?.options,
					series: response?.series,
				});
			} catch (error) {
				console.error(error);
				setGraphData({ options: null, series: null });
			}
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					{(formik) => {
						const buttonText =
							rows.length > 0 || (graphData.options && graphData.series) ? "Regenerate" : "Submit";
						return (
							<Form>
								<Box
									sx={{
										display: "flex",
										flexDirection: {
											xs: "column",
											sm: "row",
										},
										alignItems: "center",
										justifyContent: "center",
										gap: 2,
									}}
								>
									<Box sx={{ minWidth: 120 }}>
										<FormControl fullWidth>
											{/* <InputLabel id="demo-simple-select-label">Type</InputLabel> */}
											<Select
												// labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={type}
												// label="Type"
												onChange={(event) => handleChangeType(event, formik)}
											>
												<MenuItem value={"Card"}>Card</MenuItem>
												<MenuItem value={"Graph"}>Graph</MenuItem>
											</Select>
										</FormControl>
									</Box>
									<Field
										name="prompt"
										label="Prompt"
										placeholder="Prompt"
										component={TextFormField}
									/>
									<Button type="submit" variant="contained">
										{buttonText}
									</Button>
								</Box>
							</Form>
						);
					}}
				</Formik>
			</Grid>

			{openAiApi?.isPending || openAiApi.isPending ? (
				<Grid item xs={12}>
					<Loader />
				</Grid>
			) : rows.length === 0 && (!graphData.options || !graphData.series) ? (
				<Grid item xs={12} textAlign={"center"}>
					Prompt to get data
				</Grid>
			) : type === "Card" ? (
				<Grid item xs={12} textAlign={"right"}>
					<FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel id="demo-multiple-checkbox-label">Column Filter</InputLabel>
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							value={columns?.filter((item) => item?.show)?.map((item) => item?.field)}
							onChange={handleChange}
							input={<OutlinedInput label="Column Filter" />}
							renderValue={(selected) => selected.join(", ")}
							MenuProps={MenuProps}
						>
							{columns.map((column) => (
								<MenuItem key={column?.field} value={column?.field}>
									<Checkbox
										checked={
											columns.some((item) => item?.field === column?.field && item?.show) as boolean
										}
									/>
									<ListItemText primary={column?.headerName} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<DataGrid
						rows={rows ?? []}
						columns={columns?.filter((item) => item?.show) ?? []}
						autoHeight
						slots={{ toolbar: CustomToolbar }}
					/>
				</Grid>
			) : (
				<Grid item sm={12}>
					<BarChart options={graphData?.options} series={graphData?.series} />
				</Grid>
			)}
		</Grid>
	);
};

export default DashboardOpenAi;
