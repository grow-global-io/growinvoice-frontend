import {
	Box,
	Typography,
	Grid,
	Button,
	Divider,
	InputAdornment,
	Card,
	CardContent,
	FormHelperText,
} from "@mui/material";
import { Formik, Form, Field, FormikProps, FormikHelpers } from "formik";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { DateFormField } from "@shared/components/FormFields/DateFormField";
import * as yup from "yup";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { Constants } from "@shared/constants";
import FullFeaturedCrudGrid from "./ProductListDataGrid";
import { useAuthStore } from "@store/auth";
import { useCustomerControllerFindAll } from "@api/services/customer";
import { CheckBoxFormField } from "@shared/components/FormFields/CheckBoxFormField";
import { stringToListDto } from "@shared/models/ListDto";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import PaymentDetailsDrawer from "./PaymentDetailsDrawer";
import { useDialog } from "@shared/hooks/useDialog";
import { usePaymentdetailsControllerFindAll } from "@api/services/paymentdetails";
import {
	CreateInvoiceWithProductsRecurring,
	OmitCreateInvoiceProductsDto,
} from "@api/services/models";
import { useEffect, useRef, useState } from "react";
import { GridRowsProp } from "@mui/x-data-grid";
import {
	getInvoiceControllerFindAllQueryKey,
	getInvoiceControllerFindDueInvoicesQueryKey,
	getInvoiceControllerFindOneQueryKey,
	getInvoiceControllerFindPaidInvoicesQueryKey,
	useInvoiceControllerCreate,
	useInvoiceControllerFindOne,
	useInvoiceControllerUpdate,
} from "@api/services/invoice";
import { useCreateCustomerStore } from "@store/createCustomerStore";
import CreateTaxes from "@features/Products/CreateTaxes";
import { useTaxcodeControllerFindAll } from "@api/services/tax-code";
import Loader from "@shared/components/Loader";
import { useQueryClient } from "@tanstack/react-query";

const CreateInvoice = ({ id }: { id?: string }) => {
	const queryClient = useQueryClient();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const { open, handleClickOpen, handleClose } = useDialog();
	const { user } = useAuthStore();
	const customerData = useCustomerControllerFindAll();
	const paymentData = usePaymentdetailsControllerFindAll();
	const createInvoice = useInvoiceControllerCreate();
	const { setOpenCustomerForm } = useCreateCustomerStore.getState();
	const [taxesCreateopen, setTaxesCreateOpen] = useState(false);
	const taxCodes = useTaxcodeControllerFindAll();
	const invoiceFindOne = useInvoiceControllerFindOne(id ?? "", {
		query: {
			enabled: id !== undefined,
		},
	});

	const invoiceUpdate = useInvoiceControllerUpdate();

	useEffect(() => {
		if (invoiceFindOne.isSuccess) {
			setRows(
				invoiceFindOne?.data?.product?.map((product) => ({
					id: product?.id,
					product_id: product?.product_id,
					quantity: product?.quantity,
					price: product?.price,
					total: product?.total,
					isNew: true,
					isEditPosible: false,
					isEditble: true,
				})) ?? [],
			);
		}
	}, [invoiceFindOne.isSuccess]);

	const initialValues = {
		customer_id: invoiceFindOne?.data?.customer_id ?? "",
		user_id: user?.id ?? "",
		invoice_number: invoiceFindOne?.data?.invoice_number ?? "",
		reference_number: invoiceFindOne?.data?.reference_number ?? "",
		date: invoiceFindOne?.data?.date ?? "",
		due_date: invoiceFindOne?.data?.due_date ?? "",
		is_recurring: invoiceFindOne?.data?.is_recurring ?? false,
		notes: invoiceFindOne?.data?.notes ?? "",
		paymentId: invoiceFindOne?.data?.paymentId ?? "",
		sub_total: invoiceFindOne?.data?.sub_total ?? 0,
		tax_id: invoiceFindOne?.data?.tax_id ?? "",
		total: invoiceFindOne?.data?.total ?? 0,
		discountPercentage: invoiceFindOne?.data?.discountPercentage ?? 0,
		recurring: invoiceFindOne?.data?.recurring ?? CreateInvoiceWithProductsRecurring.Daily,
		product: invoiceFindOne?.data?.product ?? [],
	};

	const formikRef = useRef<FormikProps<typeof initialValues>>(null);

	const schema = yup.object().shape({
		customer_id: yup.string().required("Customer is required"),
		invoice_number: yup.string().required("Invoice number is required"),
		reference_number: yup.string().required("Reference number is required"),
		date: yup.string().required("Invoice date is required"),
		due_date: yup.string().required("Due date is required"),
		is_recurring: yup.boolean().required("Is recurring is required"),
		notes: yup.string(),
		paymentId: yup.string().required("Payment details is required"),
		sub_total: yup.number().required("Subtotal is required"),
		tax_id: yup.string(),
		total: yup.number().required("Total is required"),
		discountPercentage: yup.number().required("Discount is required"),
		recurring: yup
			.string()
			.required("Recurring is required")
			.oneOf(Object.values(CreateInvoiceWithProductsRecurring), "Invalid Type"),
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
		user_id: yup.string().required("User is required"),
	});

	const handleSubmit = async (
		values: typeof initialValues,
		actions: FormikHelpers<typeof initialValues>,
	) => {
		if (id) {
			await invoiceUpdate.mutateAsync({
				id,
				data: {
					...values,
					recurring: values.recurring as CreateInvoiceWithProductsRecurring,
				},
			});
		} else {
			await createInvoice.mutateAsync({
				data: {
					...values,
					recurring: values.recurring as CreateInvoiceWithProductsRecurring,
				},
			});
		}
		queryClient.invalidateQueries({
			queryKey: getInvoiceControllerFindOneQueryKey(id ?? ""),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindAllQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueInvoicesQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindPaidInvoicesQueryKey(),
		});
		actions.resetForm();
	};

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
		formik?.setFieldValue("sub_total", subtotal);
		const discount = subtotal * (Number(formik?.values?.discountPercentage) / 100);
		const taxAmount =
			subtotal *
			(taxCodes?.data?.find((tax) => tax.id === formik?.values.tax_id)?.percentage ?? 0 / 100);

		formik?.setFieldValue("total", subtotal - discount + taxAmount);
		if (rows?.length > 0) {
			formik?.setFieldTouched("product", false);
			formik?.setFieldError("product", undefined);
		} else {
			formik?.setFieldTouched("product", true);
			formik?.setFieldError("product", "Please add at least one product to create an invoice");
		}
	}, [rows]);

	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];

	if (invoiceFindOne.isLoading) return <Loader />;

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
				<img src={Constants.customImages.invoiceIcon} alt="Invoice Icon" /> New Invoices
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
					{({ values, touched, errors, setFieldValue }) => {
						useEffect(() => {
							if (values?.discountPercentage > 0 || values.tax_id) {
								const tax = taxCodes.data?.find((tax) => tax.id === values.tax_id);
								const discount = values?.sub_total * (values?.discountPercentage / 100);
								const taxAmount = values?.sub_total * (tax?.percentage ?? 0 / 100);
								setFieldValue("total", values?.sub_total - discount + taxAmount);
							} else {
								setFieldValue("total", values?.sub_total);
							}
						}, [values?.discountPercentage, values.tax_id]);
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
											required={true}
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
									<Grid item xs={12} sm={4}>
										<Field
											name="invoice_number"
											component={TextFormField}
											label="Invoice Number"
											InputProps={{
												startAdornment: <InputAdornment position="start">INV -</InputAdornment>,
											}}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Field
											name="reference_number"
											component={TextFormField}
											label="Reference Number"
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Field
											name="date"
											component={DateFormField}
											label="Invoice Date"
											// minDate={new Date()}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Field
											name="due_date"
											component={DateFormField}
											label="Invoice Due Date"
											minDate={moment(values.date).add(1, "days").toDate()}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={4} display={"flex"} alignItems={"center"}>
										<Field name="is_recurring" label="Is Recurring" component={CheckBoxFormField} />
									</Grid>
									{values.is_recurring && (
										<Grid item xs={12} sm={4}>
											<Field
												name="recurring"
												label="Recurring"
												component={AutocompleteField}
												options={Object.keys(CreateInvoiceWithProductsRecurring).map(
													stringToListDto,
												)}
												required={true}
											/>
										</Grid>
									)}
									<Grid item xs={12} mb={3}>
										<Divider />
									</Grid>

									<Grid item xs={12} sx={{ width: { xs: "90vw", sm: "auto" } }}>
										<FullFeaturedCrudGrid rows={rows} setRows={setRows} />
										{touched?.product && errors?.product !== undefined && (
											<FormHelperText error={true}>
												Please add at least one product to create an invoice
											</FormHelperText>
										)}
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
												sm: "20%",
												xs: 0,
											},
										}}
									>
										<Field
											name="notes"
											component={TextFormField}
											label="Notes"
											multiline
											rows={5}
										/>
										<Field
											name="paymentId"
											label="Payment Details"
											component={AutocompleteField}
											options={paymentData?.data?.map((payment) => ({
												value: payment.id,
												label: payment.paymentType,
											}))}
											loading={paymentData.isLoading}
											required={true}
										/>
										<Box>
											<Button variant="text" startIcon={<AddIcon />} onClick={handleClickOpen}>
												Add Payment
											</Button>
										</Box>
										{values.paymentId ? (
											<Box
												sx={{
													bgcolor: "custom.lightBlue",
													padding: 2,
													borderRadius: 1,
													mb: 1,
												}}
											>
												{paymentData?.data
													?.filter((payment) => payment.id === values.paymentId)
													.map((payment) => (
														<Box key={payment.id}>
															<Typography
																variant="h5"
																sx={{
																	textTransform: "uppercase",
																}}
															>
																{payment.paymentType}
															</Typography>
															{payment.paymentType === "IndianBank" && (
																<>
																	<Typography variant="subtitle1">
																		Account Number: <b>{payment.account_no}</b>
																	</Typography>
																	<Typography variant="subtitle1">
																		IFSC Code: <b>{payment.ifscCode}</b>
																	</Typography>
																</>
															)}
															{payment.paymentType === "UPI" && (
																<Typography variant="subtitle1">
																	UPI: <b>{payment.upiId}</b>
																</Typography>
															)}
															{payment.paymentType === "EuropeanBank" && (
																<>
																	<Typography variant="subtitle1">
																		BIC Number: <b>{payment.bicNumber}</b>
																	</Typography>
																	<Typography variant="subtitle1">
																		IBAN Number: <b>{payment.ibanNumber}</b>
																	</Typography>
																</>
															)}
															{payment.paymentType === "Mollie" && (
																<Typography variant="subtitle1">
																	Mollie ID: <b>{payment.mollieId}</b>
																</Typography>
															)}
															{payment.paymentType === "Paypal" && (
																<Typography variant="subtitle1">
																	Paypal ID: <b>{payment.paypalId}</b>
																</Typography>
															)}
															{payment.paymentType === "Razorpay" && (
																<Typography variant="subtitle1">
																	Razorpay ID: <b>{payment.razorpayId}</b>
																</Typography>
															)}
															{payment.paymentType === "Stripe" && (
																<Typography variant="subtitle1">
																	Stripe ID: <b>{payment.stripeId}</b>
																</Typography>
															)}
															{payment.paymentType === "SwiftCode" && (
																<Typography variant="subtitle1">
																	Swift Code: <b>{payment.swiftCode}</b>
																</Typography>
															)}
														</Box>
													))}
											</Box>
										) : (
											<></>
										)}
									</Grid>
									<Grid item xs={12} sm={6}>
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
															required={true}
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
															options={taxCodes.data?.map((item) => {
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
															required={true}
														/>
													</Grid>
													<Grid item xs={12}>
														<Divider />
													</Grid>
													<Grid item xs={12} sm={6}>
														<Typography variant="h5">Total</Typography>
													</Grid>
													<Grid item xs={12} sm={6} textAlign={"right"}>
														<Field name="total" component={TextFormField} type="number" required={true}/>
													</Grid>
												</Grid>
											</CardContent>
										</Card>
									</Grid>
									<Grid item xs={12} sm={3.5}>
										<Field
											name="invoiceTemplate"
											label="Invoice Template"
											component={AutocompleteField}
											options={options}
											required={true}
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
			<PaymentDetailsDrawer open={open} handleClose={handleClose} />
		</>
	);
};

export default CreateInvoice;
