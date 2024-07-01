import { Box, Typography, Grid, Button, Divider, InputAdornment } from "@mui/material";
import { Formik, Form, Field, FormikProps, FormikHelpers } from "formik";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { DateFormField } from "@shared/components/FormFields/DateFormField";
import * as yup from "yup";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { Constants } from "@shared/constants";
import FullFeaturedCrudGrid from "@shared/components/EditableProductListTable";
import { GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { useCreateCustomerStore } from "@store/createCustomerStore";
import AddIcon from "@mui/icons-material/Add";
import { useCustomerControllerFindAll } from "@api/services/customer";
import {
	getQuotationControllerFindAllQueryKey,
	getQuotationControllerFindOneQueryKey,
	useQuotationControllerCreate,
	useQuotationControllerFindOne,
	useQuotationControllerUpdate,
} from "@api/services/quotation";
import { useAuthStore } from "@store/auth";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Loader from "@shared/components/Loader";
import SubtotalFooter from "@shared/components/SubtotalFooter";
import { formatToIso } from "@shared/formatter";
import { useNavigate } from "react-router-dom";
const CreateQuotation = ({ id }: { id?: string }) => {
	const navigate = useNavigate();
	const [errorText, setErrorText] = useState<string | undefined>(undefined);
	const queryClient = useQueryClient();
	const { setOpenCustomerForm } = useCreateCustomerStore.getState();
	const customerData = useCustomerControllerFindAll();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const { user } = useAuthStore();
	const createQuotation = useQuotationControllerCreate();
	const quotationFindOne = useQuotationControllerFindOne(id ?? "", {
		query: {
			enabled: id !== undefined,
		},
	});

	const quotationUpdate = useQuotationControllerUpdate();

	useEffect(() => {
		if (quotationFindOne.isSuccess) {
			setRows(
				quotationFindOne?.data?.product?.map((product) => ({
					id: product.id,
					product_id: product.product_id,
					quantity: product.quantity,
					price: product.price,
					tax: product.tax,
					hsnCode: product.hsnCode,
					total: product.total,
					isNew: true,
					isEditPosible: false,
					isEditble: true,
				})) ?? [],
			);
		}
	}, [quotationFindOne.isSuccess]);
	const initialValues = {
		user_id: user?.id ?? "",
		customer_id: quotationFindOne?.data?.customer_id ?? "",
		quatation_number: quotationFindOne?.data?.quatation_number ?? "",
		reference_number: quotationFindOne?.data?.reference_number ?? "",
		date: quotationFindOne?.data?.date ?? "",
		expiry_at: quotationFindOne?.data?.expiry_at ?? "",
		notes: quotationFindOne?.data?.notes ?? "",
		private_notes: quotationFindOne?.data?.private_notes ?? "",
		sub_total: quotationFindOne?.data?.sub_total ?? 0,
		tax_id: quotationFindOne?.data?.tax_id ?? "",
		total: quotationFindOne?.data?.total ?? 0,
		discountPercentage: quotationFindOne?.data?.discountPercentage ?? 0,
		product: quotationFindOne?.data?.product ?? [],
	};

	const formikRef = useRef<FormikProps<typeof initialValues>>(null);

	const schema = yup.object().shape({
		customer_id: yup.string().required("Customer is required"),
		user_id: yup.string().required("User is required"),
		quatation_number: yup.string().required("Quotaion number is required"),
		reference_number: yup.string(),
		date: yup.string().required("Quotation date is required"),
		expiry_at: yup.string().required("Expiry date is required"),
		notes: yup.string(),
		private_notes: yup.string(),
		sub_total: yup.number().required("Subtotal is required"),
		tax_id: yup.string(),
		total: yup.number().required("Total is required"),
		discountPercentage: yup.number(),
		quotation: yup
			.array()
			.of(
				yup.object({
					product_id: yup.string().required("Product is required"),
					quantity: yup.number().required("Quantity is required"),
					price: yup.number().required("Price is required"),
					total: yup.number().required("Total is required"),
				}),
			)
			.min(1, "At least one product is required"),
	});

	const handleSubmit = async (
		values: typeof initialValues,
		actions: FormikHelpers<typeof initialValues>,
	) => {
		if (id) {
			await quotationUpdate.mutateAsync({
				id,
				data: {
					...values,
					date: formatToIso(values.date),
					expiry_at: formatToIso(values.expiry_at),
				},
			});
		} else {
			await createQuotation.mutateAsync({
				data: {
					...values,
					date: formatToIso(values.date),
					expiry_at: formatToIso(values.expiry_at),
				},
			});
		}

		await queryClient.refetchQueries({
			queryKey: getQuotationControllerFindOneQueryKey(id ?? ""),
		});
		await queryClient.refetchQueries({
			queryKey: getQuotationControllerFindAllQueryKey(),
		});
		actions.resetForm();
		setRows([]);
		navigate("/quotation/quotationlist");
	};

	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];

	if (quotationFindOne.isLoading || quotationFindOne.isFetching || quotationFindOne?.isRefetching) {
		return <Loader />;
	}

	return (
		<>
			<Typography
				variant="h3"
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<img src={Constants.customImages.QuotationIcon} alt="Invoice Icon" /> New Quotation
			</Typography>
			<Divider
				sx={{
					my: 2,
				}}
			/>
			<Box sx={{ mb: 2, mt: 2 }}>
				<Formik
					initialValues={initialValues}
					validationSchema={schema}
					onSubmit={handleSubmit}
					innerRef={formikRef}
				>
					{(formik) => {
						console.log(formik?.errors);
						return (
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={4}>
										<Field
											name="customer_id"
											label="Customer Name"
											component={AutocompleteField}
											options={customerData?.data?.map((customer) => ({
												value: customer.id,
												label: customer.display_name,
											}))}
											loading={customerData.isLoading}
											isRequired={true}
										/>
									</Grid>
									<Grid item xs={12} sm={4} alignItems={"center"} display={"flex"}>
										<Button
											variant="text"
											startIcon={<AddIcon />}
											onClick={() => {
												setOpenCustomerForm(true);
											}}
										>
											Add Customer
										</Button>
									</Grid>
									<Grid item xs={12} mb={3}>
										<Divider />
									</Grid>
									<Grid item xs={12} sm={6} lg={4}>
										<Field
											name="quatation_number"
											component={TextFormField}
											label="Quotation Number"
											InputProps={{
												startAdornment: <InputAdornment position="start">QTN -</InputAdornment>,
											}}
											isRequired={true}
										/>
									</Grid>
									<Grid item xs={12} sm={6} lg={4}>
										<Field
											name="reference_number"
											component={TextFormField}
											label="Reference Number"
										/>
									</Grid>
									<Grid item xs={12} sm={6} lg={4}>
										<Field
											name="date"
											component={DateFormField}
											label="Quotation Date"
											isRequired={true}
										/>
									</Grid>
									<Grid item xs={12} sm={6} lg={4}>
										<Field
											name="expiry_at"
											component={DateFormField}
											label="Expiry At"
											minDate={moment(formik?.values.date).add(1, "days").toDate()}
											isRequired={true}
										/>
									</Grid>
									<Grid item xs={12} mb={3}>
										<Divider />
									</Grid>
									<Grid item xs={12} sx={{ width: { xs: "90vw", sm: "auto" } }}>
										<FullFeaturedCrudGrid
											rows={rows}
											setRows={setRows}
											errorText={errorText}
											setErrorText={setErrorText}
											formik={formik}
										/>
									</Grid>
									<Grid item xs={12} mb={3}>
										<Divider />
									</Grid>
									<Grid
										item
										xs={12}
										sm={6}
										sx={{
											pr: {
												lg: "20%",
												xs: 0,
											},
										}}
									>
										<Field
											name="notes"
											component={TextFormField}
											label="Add Notes"
											multiline
											rows={5}
										/>
										<Field
											name="private_notes"
											component={TextFormField}
											label=" Private Notes"
											multiline
											rows={5}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<SubtotalFooter formik={formik} />
									</Grid>
									<Grid item xs={12} sm={3.5}>
										<Field
											name="quotation_template"
											label="Invoice Template"
											component={AutocompleteField}
											options={options}
											isRequired={true}
										/>
									</Grid>
									<Grid item xs={12} sm={6} display="flex" alignItems="center">
										<Button variant="outlined">Preview</Button>
									</Grid>
									<Grid item xs={12} textAlign={"center"}>
										<Button variant="contained" type="submit">
											Save Invoice
										</Button>
									</Grid>
								</Grid>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</>
	);
};

export default CreateQuotation;
