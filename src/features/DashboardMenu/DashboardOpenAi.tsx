import { OpenaiControllerCreate200Item, RequestBodyOpenaiDto } from "@api/services/models";
import { useOpenaiControllerCreate } from "@api/services/openai";
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
import { useAuthStore } from "@store/auth";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

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
	const { user } = useAuthStore();
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
	});

	const openAiApi = useOpenaiControllerCreate();

	const initialValues: RequestBodyOpenaiDto = {
		prompt: "",
	};

	const handleSubmit = async (values: RequestBodyOpenaiDto) => {
		try {
			setRows([]);
			setColumns([]);
			const a = await openAiApi.mutateAsync({
				data: {
					prompt: values.prompt + ". i want data related to my account: user_id=" + user?.id,
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
			console.error(error);
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
					{() => {
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
									<Field
										name="prompt"
										label="Prompt"
										placeholder="Prompt"
										component={TextFormField}
									/>
									<Button type="submit" variant="contained">
										Submit
									</Button>
								</Box>
							</Form>
						);
					}}
				</Formik>
			</Grid>

			{openAiApi?.isPending ? (
				<Grid item xs={12}>
					<Loader />
				</Grid>
			) : rows?.length === 0 ? (
				<Grid item xs={12} textAlign={"center"}>
					Prompt to get data
				</Grid>
			) : (
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
			)}
		</Grid>
	);
};

export default DashboardOpenAi;
