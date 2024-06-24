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

import { useNavigate } from "react-router-dom";

import { OmitCreateInvoiceProductsDto } from "@api/services/models";

import { useTaxcodeControllerFindAll } from "@api/services/tax-code";
import FinalCalOfInvoice from "@shared/components/FinalCalOfInvoice";
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
import { formatDateToIso } from "@shared/formatter";
const CreateQuotation = ({ id }: { id?: string }) => {
	const navigate = useNavigate();
	const [errorText, setErrorText] = useState<string | undefined>(undefined);
	const queryClient = useQueryClient();
	const { setOpenCustomerForm } = useCreateCustomerStore.getState();
	const customerData = useCustomerControllerFindAll();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const { user } = useAuthStore();
	const taxCodes = useTaxcodeControllerFindAll();
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
		product: yup
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
					product: values.product,
				},
			});
		} else {
			await createQuotation.mutateAsync({
				data: {
					...values,
					product: values.product,
					date: formatDateToIso(values.date),
					expiry_at: formatDateToIso(values.expiry_at),
				},
			});
		}

		queryClient.invalidateQueries({
			queryKey: getQuotationControllerFindOneQueryKey(id ?? ""),
		});
		queryClient.refetchQueries({
			queryKey: getQuotationControllerFindAllQueryKey(),
		});
		actions.resetForm();
		setRows([]);
		navigate("/quotation/quotationlist");
	};


	// const options = [
	// 	{ value: "1", label: "Option 1" },
	// 	{ value: "2", label: "Option 2" },
	// 	{ value: "3", label: "Option 3" },
	// ];

	useEffect(() => {
		const formik = formikRef.current;
		const subtotal = rows.reduce((acc, row) => acc + ((row.price * row.quantity) as number), 0);
		formik?.setFieldValue(
			"product",
			rows.map((row) => {
				return {
					product_id: row.product_id,
					quantity: Number(row.quantity),
					price: row.price,
					total: row.total,
				} as OmitCreateInvoiceProductsDto;
			}),
		);
		const tax = taxCodes?.data?.find((tax) => tax.id === formik?.values.tax_id);
		formik?.setFieldValue("sub_total", subtotal);
		const discount = subtotal * (Number(formik?.values?.discountPercentage) / 100);
		const taxPercentage = subtotal * (Number(tax?.percentage ?? 0) / 100);
		formik?.setFieldValue("total", subtotal - discount + taxPercentage);
	}, [rows]);

	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];


	if (quotationFindOne.isLoading) {
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
						useEffect(() => {

							if (
								formik?.values?.discountPercentage > 0 ||
								formik?.values.tax_id !== "" ||
								formik?.values.tax_id !== undefined ||
								formik?.values.tax_id !== null
							) {
								const tax = taxCodes.data?.find((tax) => tax.id === formik?.values.tax_id);
								const discount =
									formik?.values?.sub_total *
									(formik?.values?.discountPercentage.toString() === "NaN"
										? 0
										: formik?.values?.discountPercentage / 100);

								const taxPercentage =
									formik?.values?.sub_total * (Number(tax?.percentage ?? 0) / 100);
								formik?.setFieldValue(
									"total",
									formik?.values?.sub_total - discount + taxPercentage,
								);

							if (values?.discountPercentage > 0 || values.tax_id) {
								const tax = taxCodes?.data?.find((tax) => tax.id === values.tax_id);
								const discount = values?.sub_total * (values?.discountPercentage / 100);
								const taxAmount = values?.sub_total * (tax?.percentage ?? 0 / 100);
								setFieldValue("total", values?.sub_total - discount + taxAmount);

							} else {
								formik?.setFieldValue("total", formik?.values?.sub_total);
							}
						}, [formik?.values?.discountPercentage, formik?.values.tax_id]);

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
											minDate={moment(formik.values.date).add(1, "days").toDate()}
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
											taxCodes={taxCodes}
											formiks={formik}
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

										<FinalCalOfInvoice taxCodes={taxCodes} />

										<Card>
											<CardContent>
												<Grid
													container
													display={"flex"}
													alignItems={"center"}
													px={2}
													py={3}
													borderRadius={1}
													sx={{ background: "custom.transparentWhite" }}
												>
													<Grid item xs={12} sm={6}>
														<Typography variant="h5">Subtotal</Typography>
													</Grid>
													<Grid item xs={12} sm={6} textAlign={"right"}>
														<Field
															name="sub_total"
															component={TextFormField}
															type="number"
															disabled
															isRequired={true}
														/>
													</Grid>
													<Grid item xs={12} sm={6}>
														<Typography variant="h5">Taxes</Typography>
													</Grid>
													<Grid item xs={12} sm={6} textAlign={"right"}>
														<Field
															name="tax_id"
															component={AutocompleteField}
															loading={taxCodes.isLoading || taxCodes.isFetching}
															options={taxCodes?.data?.map((item) => {
																return {
																	label: item?.percentage + "%",
																	value: item?.id,
																};
															})}
														/>
														<Button
															variant="text"
															startIcon={<AddIcon />}
															onClick={() => setTaxesCreateOpen(true)}
														>
															Add Taxes
														</Button>
													</Grid>
													{taxesCreateopen && (
														<Grid item xs={12}>
															<CreateTaxes handleClose={() => setTaxesCreateOpen(false)} />
														</Grid>
													)}
													<Grid item xs={12} sm={6}>
														<Typography variant="h5">Discount</Typography>
													</Grid>
													<Grid item xs={12} sm={6}>
														<Field
															name="discountPercentage"
															component={TextFormField}
															type="number"
														/>
													</Grid>
													<Grid item xs={12}>
														<Divider />
													</Grid>
													<Grid item xs={12} sm={6}>
														<Typography variant="h5">Total</Typography>
													</Grid>
													<Grid item xs={12} sm={6} textAlign={"right"}>
														<Field
															name="total"
															component={TextFormField}
															type="number"
															isRequired={true}
														/>
													</Grid>
												</Grid>
											</CardContent>
										</Card>

									</Grid>
									{/* <Grid item xs={12} sm={3.5}>
										<Field
											name="template_id"
											label="Invoice Template"
											component={AutocompleteField}
											options={options}
										
										/>
									</Grid> */}
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
