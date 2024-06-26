import {
	OpenaiControllerCreate200Item,
	OpenaiControllerCreateGraph201,
} from "@api/services/models";
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
import Loader from "@shared/components/Loader";
import { snakeToReadableText } from "@shared/formatter";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import BarChart from "./DashboardChart";
import { Constants } from "@shared/constants";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { stringToListDto } from "@shared/models/ListDto";
import NoDataFound from "@shared/components/NoDataFound";
import { AlertService } from "@shared/services/AlertService";

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
	const initialValues = {
		prompt: "",
		type: "Table",
	};
	const formikRef = useRef<FormikProps<typeof initialValues>>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [rows, setRows] = useState<any[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [columns, setColumns] = useState<any[]>([]);
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
		type: Yup.string().required("Type is required"),
	});
	const openAiApi = useOpenaiControllerCreate();
	const openAiApiGraph = useOpenaiControllerCreateGraph({
		mutation: {
			onError: (error) => {
				AlertService.instance?.errorMessage("Error occured! please try again after 30secs");
				console.error(error);
			},
		},
	});

	const [graphData, setGraphData] = useState<OpenaiControllerCreateGraph201>();

	const handleSubmit = async (values: typeof initialValues) => {
		setRows([]);
		setColumns([]);
		setGraphData(undefined);
		if (values?.type === "Table") {
			try {
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
				const keysData = response as OpenaiControllerCreateGraph201;
				setGraphData(keysData);
			} catch (error) {
				console.error(error);
				setGraphData(undefined);
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
					innerRef={formikRef}
				>
					{() => {
						const buttonText = openAiApi?.isPending ? "Loading..." : "Submit";
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
										<Field
											name="type"
											label="Type"
											component={AutocompleteField}
											options={Object.keys(Constants.dashboardType).map(stringToListDto)}
										/>
									</Box>
									<Field
										name="prompt"
										label="Prompt"
										placeholder="Prompt"
										component={AutocompleteField}
										optionUrl="/api/openai/suggestions"
										isGpt
									/>
									<Button type="submit" variant="contained" disabled={openAiApi?.isPending}>
										{buttonText}
									</Button>
								</Box>
							</Form>
						);
					}}
				</Formik>
			</Grid>
			{openAiApi?.isPending && (
				<Grid item xs={12}>
					<Loader />
				</Grid>
			)}

			{openAiApi?.isError && rows?.length === 0 && graphData === undefined && (
				<Grid item xs={12}>
					<NoDataFound message="Error occured! please try again after 30secs" />
				</Grid>
			)}

			{formikRef?.current?.values?.type === "" ||
				(formikRef?.current?.values?.prompt === "" && (
					<Grid item xs={12} textAlign={"center"}>
						Prompt to get data
					</Grid>
				))}

			{rows?.length > 0 && (
				<Grid item xs={12}>
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
			)}

			{formikRef?.current?.values?.type === Constants.dashboardType.Graph && graphData && (
				<Grid item sm={12}>
					<BarChart graphData={graphData} />
				</Grid>
			)}
		</Grid>
	);
};

export default DashboardOpenAi;
