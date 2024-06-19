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
	Dialog,
	DialogContent,
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
import PaymentDetailsDrawer from "../Payments/PaymentDetailsDrawer";
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
	useInvoiceControllerInvoicePreviewFromBody,
} from "@api/services/invoice";
import { useCreateCustomerStore } from "@store/createCustomerStore";
import CreateTaxes from "@features/Products/CreateTaxes";
import { useTaxcodeControllerFindAll } from "@api/services/tax-code";
import Loader from "@shared/components/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";

const CreateInvoice = ({ id }: { id?: string }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [productErrorText, setProductErrorText] = useState<string | undefined>(undefined);
	const { open, handleClickOpen, handleClose } = useDialog();
	const {
		open: openInvoicePreview,
		handleClickOpen: handleClickOpenInvoicePreview,
		handleClose: handleCloseInvoicePreview,
	} = useDialog();
	const { user } = useAuthStore();
	const customerData = useCustomerControllerFindAll();
	const paymentData = usePaymentdetailsControllerFindAll();
	const createInvoice = useInvoiceControllerCreate();
	const { setOpenCustomerForm } = useCreateCustomerStore.getState();
	const [taxesCreateopen, setTaxesCreateOpen] = useState(false);
	const taxCodes = useTaxcodeControllerFindAll();
	const [previewString, setPreviewString] = useState<string | undefined>(undefined);
	const invoiceFindOne = useInvoiceControllerFindOne(id ?? "", {
		query: {
			enabled: id !== undefined,
		},
	});

	const invoiceUpdate = useInvoiceControllerUpdate();
	const invoicePreview = useInvoiceControllerInvoicePreviewFromBody();

	const handleClosePreview = () => {
		setPreviewString(undefined);
		handleCloseInvoicePreview();
	};

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
	}, [invoiceFindOne.isSuccess || invoiceFindOne?.isRefetching]);

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
					product_id: yup.string(),
					quantity: yup.number(),
					price: yup.number(),
					total: yup.number(),
				}),
			)
			.min(1, "At least one product is required"),
		user_id: yup.string().required("User is required"),
	});

	const handleSubmit = async (
		values: typeof initialValues,
		actions: FormikHelpers<typeof initialValues>,
	) => {
		if (rows?.length === 0) {
			setProductErrorText("At least one product is required");
			return;
		} else if (rows?.find((row) => row.product_id === "")) {
			setProductErrorText("Fullfill all the product details");
			return;
		}

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
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindOneQueryKey(id ?? ""),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindAllQueryKey(),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueInvoicesQueryKey(),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindPaidInvoicesQueryKey(),
		});
		await queryClient.refetchQueries({
			queryKey: ["invoicedetails", id ?? ""],
		});
		actions.resetForm();
		setRows([]);
		navigate("/invoice/createinvoice");
		navigate("/invoice/invoicelist");
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

	if (invoiceFindOne.isLoading || invoiceFindOne?.isRefetching || invoiceFindOne?.isFetching)
		return <Loader />;

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
									formik?.values?.sub_total * (formik?.values?.discountPercentage / 100);
								const taxPercentage =
									formik?.values?.sub_total * (Number(tax?.percentage ?? 0) / 100);
								formik?.setFieldValue(
									"total",
									formik?.values?.sub_total - discount + taxPercentage,
								);
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
											minDate={moment(formik?.values.date).add(1, "days").toDate()}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={4} display={"flex"} alignItems={"center"}>
										<Field name="is_recurring" label="Is Recurring" component={CheckBoxFormField} />
									</Grid>
									{formik?.values.is_recurring && (
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
										<FullFeaturedCrudGrid
											rows={rows}
											setRows={setRows}
											setErrorText={setProductErrorText}
											errorText={productErrorText}
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
										{formik?.values.paymentId ? (
											<Box
												sx={{
													bgcolor: "custom.lightBlue",
													padding: 2,
													borderRadius: 1,
													mb: 1,
												}}
											>
												{paymentData?.data
													?.filter((payment) => payment.id === formik?.values.paymentId)
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
														<Field
															name="total"
															component={TextFormField}
															type="number"
															required={true}
															disabled
														/>
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
										<Button
											variant="outlined"
											onClick={async () => {
												const data = await invoicePreview.mutateAsync({
													data: {
														...formik.values,
														recurring: formik.values
															.recurring as CreateInvoiceWithProductsRecurring,
													},
												});
												setPreviewString(data as string);
												handleClickOpenInvoicePreview();
											}}
											disabled={formik.isValid === false || rows?.length === 0}
										>
											Preview
										</Button>
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

			<Dialog open={openInvoicePreview} onClose={handleClosePreview} fullWidth maxWidth="md">
				<AppDialogHeader title="Invoice Preview" handleClose={handleClosePreview} />
				<DialogContent>
					<Box
						component="iframe"
						srcDoc={previewString}
						sx={{
							width: {
								xs: "1100px",
								md: "100%",
							},
							height: "75vh",
							overflowX: { xs: "scroll", sm: "visible" },
						}}
					></Box>
				</DialogContent>
			</Dialog>

			<PaymentDetailsDrawer open={open} handleClose={handleClose} />
		</>
	);
};

export default CreateInvoice;
