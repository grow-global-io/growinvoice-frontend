import {
	CreateAIDashboardDtoType,
	OpenaiControllerCreate200Item,
	OpenaiControllerCreateGraph200Item,
} from "@api/services/models";
import { useOpenaiControllerCreate, useOpenaiControllerCreateGraph } from "@api/services/openai";
import {
	Button,
	Card,
	CardContent,
	Checkbox,
	Dialog,
	DialogContent,
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
import LottieNoDataFound from "@shared/components/LottieNoDataFound";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { useDialog } from "@shared/hooks/useDialog";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";
import AppDialogFooter from "@shared/components/Dialog/AppDialogFooter";
import {
	getDashboardsControllerFindAllQueryKey,
	useDashboardsControllerCreate,
} from "@api/services/dashboards";
import { useAuthStore } from "@store/auth";
import { useQueryClient } from "@tanstack/react-query";

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

export function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

const DashboardOpenAi = () => {
	const queryClient = useQueryClient();
	const { open, handleClickOpen, handleClose } = useDialog();
	const { user } = useAuthStore();
	const initialValues = {
		prompt: "",
		type: "Table",
		title: "",
		user_id: user?.id ?? "",
		query: "",
	};
	const formikRef = useRef<FormikProps<typeof initialValues>>(null);
	const [rows, setRows] = useState<OpenaiControllerCreate200Item[]>([]);
	const [columns, setColumns] = useState<any[]>([]);
	const [isError, setIsError] = useState(false);
	const [prompText, setPromptText] = useState("");
	const [queryText, setQueryText] = useState("");
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
			onError: () => {
				AlertService.instance?.errorMessage("Error occurred! please try again after 30 seconds");

				setIsError(true);
			},
		},
	});

	const [graphData, setGraphData] = useState<OpenaiControllerCreateGraph200Item | undefined>(
		undefined,
	);

	const handleSubmit = async (values: typeof initialValues) => {
		setRows([]);
		setColumns([]);
		setIsError(false);
		setGraphData(undefined);
		setPromptText("");
		setQueryText("");
		if (values?.type === "Table") {
			try {
				const a = await openAiApi.mutateAsync({
					data: {
						prompt: values.prompt,
					},
				});
				const keysData = a as OpenaiControllerCreate200Item;
				setPromptText(keysData?.prompt);
				setQueryText(keysData?.query);
				const keys = Object.keys(keysData?.result[0]);

				const rowsData = keysData?.result?.map(
					(item: OpenaiControllerCreate200Item, index: number) => {
						return {
							id: item?.id ?? index + 1,
							...item,
						};
					},
				);

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
						minWidth: 150,
						flex: 1,
						show: true,
					};
				});

				setColumns(columns.filter((item) => item !== null));
			} catch (error) {
				setRows([]);
				setIsError(true);
				setColumns([]);
				console.error(error);
				setPromptText("");
				setQueryText("");
			}
		} else {
			try {
				const response = await openAiApiGraph.mutateAsync({
					data: {
						prompt: values.prompt,
					},
				});
				const keysData = response as OpenaiControllerCreateGraph200Item;
				setPromptText(keysData?.prompt);
				setQueryText(keysData?.query);
				setGraphData(keysData?.graphData);
			} catch (error) {
				console.error(error);
				setIsError(true);
				setGraphData(undefined);
				setPromptText("");
				setQueryText("");
			}
		}
	};

	const handleReset = () => {
		setRows([]);
		setColumns([]);
		setIsError(false);
		setGraphData(undefined);
		formikRef.current?.resetForm({
			values: {
				...formikRef.current?.values,
				prompt: formikRef.current?.values.prompt, // Keep the prompt value unchanged
			},
		});
	};

	const createDashboard = useDashboardsControllerCreate();
	const handleSubmitData = async (values: typeof initialValues) => {
		await createDashboard.mutateAsync({
			data: {
				...values,
				prompt: prompText,
				query: queryText,
				type: graphData ? CreateAIDashboardDtoType?.Chart : CreateAIDashboardDtoType?.Table,
			},
		});
		queryClient.refetchQueries({
			queryKey: getDashboardsControllerFindAllQueryKey(),
		});
		handleClose();
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
								<Grid container spacing={1}>
									<Grid item xs={12} md={2}>
										<Field
											name="type"
											label="Type"
											component={AutocompleteField}
											options={Object.keys(Constants.dashboardType).map(stringToListDto)}
										/>
									</Grid>
									<Grid item xs={12} md={8}>
										<Field
											name="prompt"
											label="Tell us what you want to see?"
											placeholder="Tell us what you want to see?"
											component={TextFormField}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={1}
										mx={2}
										display={"flex"}
										alignItems={"center"}
										justifyContent={"center"}
									>
										<Button
											type="submit"
											variant="contained"
											fullWidth
											disabled={openAiApi?.isPending}
										>
											{buttonText}
										</Button>
									</Grid>
								</Grid>
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

			{openAiApi?.isError && isError && (
				<Grid item xs={12}>
					<NoDataFound message="Error occurred! please try again after 30 seconds" />
				</Grid>
			)}

			{formikRef?.current?.values?.type === "" ||
				(formikRef?.current?.values?.prompt === "" && (
					<Grid item xs={12} textAlign={"center"}>
						Prompt to get data
					</Grid>
				))}

			{rows?.length > 0 && openAiApi?.isSuccess && (
				<>
					<Grid item xs={12}>
						<Card
							sx={{
								width: "100%",
							}}
						>
							<CardContent>
								<FormControl sx={{ m: 1, width: 250 }}>
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
														columns.some(
															(item) => item?.field === column?.field && item?.show,
														) as boolean
													}
												/>
												<ListItemText primary={column?.headerName} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<div style={{ width: "100%" }}>
									<div style={{ height: 350, width: "100%" }}>
										<DataGrid
											rows={rows ?? []}
											columns={columns?.filter((item) => item?.show) ?? []}
											slots={{ toolbar: CustomToolbar }}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={12} textAlign={"center"} gap={1}>
						<Button variant="contained" onClick={handleClickOpen}>
							Save
						</Button>
						<Button variant="outlined" onClick={handleReset}>
							Reset
						</Button>
					</Grid>
				</>
			)}

			{rows?.length === 0 && openAiApi?.isSuccess && graphData === undefined && (
				<Grid item xs={12}>
					<LottieNoDataFound message="Please request your widget again." />
				</Grid>
			)}
			{formikRef?.current?.values?.type === Constants.dashboardType.Graph && graphData && (
				<>
					<Grid item sm={12}>
						<BarChart graphData={graphData} />
					</Grid>
					<Grid item sm={12} textAlign={"center"} gap={1}>
						<Button variant="contained" onClick={handleClickOpen}>
							Save
						</Button>
						<Button variant="outlined" onClick={handleReset}>
							Reset
						</Button>
					</Grid>
				</>
			)}

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
				<Formik initialValues={initialValues} onSubmit={handleSubmitData}>
					{(formik) => {
						return (
							<Form>
								<AppDialogHeader title="save the Data" handleClose={handleClose} />
								<DialogContent>
									<Field
										name="title"
										label="Title"
										component={TextFormField}
										placeholder="Enter Title"
									/>
								</DialogContent>
								<AppDialogFooter
									onClickCancel={handleClose}
									saveButtonText="Submit"
									saveButtonDisabled={!formik.isValid || formik.isSubmitting}
								/>
							</Form>
						);
					}}
				</Formik>
			</Dialog>
		</Grid>
	);
};

export default DashboardOpenAi;
