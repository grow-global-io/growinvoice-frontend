import {
	Box,
	Typography,
	Grid,
	Button,
	Divider,
	InputAdornment,
	Card,
	CardContent,
} from "@mui/material";
import { Formik, Form, Field, FormikProps } from "formik";
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
import { useInvoiceControllerCreate } from "@api/services/invoice";

const CreateInvoice = () => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const { open, handleClickOpen, handleClose } = useDialog();
	const { user } = useAuthStore();
	const customerData = useCustomerControllerFindAll();
	const paymentData = usePaymentdetailsControllerFindAll();
	const createInvoice = useInvoiceControllerCreate();

	const initialValues = {
		customer_id: "",
		user_id: user?.id ?? "",
		invoice_number: "",
		reference_number: "",
		date: "",
		due_date: "",
		is_recurring: false,
		notes: "",
		paymentId: "",
		sub_total: 0,
		tax_id: "",
		total: 0,
		discountPercentage: 0,
		recurring: "Daily",
		product: [],
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
		user_id: yup.string().required("User is required"),
	});

	const handleSubmit = async (values: typeof initialValues) => {
		console.log(values);
		await createInvoice.mutateAsync({
			data: {
				...values,
				recurring: values.recurring as CreateInvoiceWithProductsRecurring,
			},
		});
	};

	useEffect(() => {
		const formik = formikRef.current;
		formik?.setFieldValue(
			"product",
			rows.map((row) => row as OmitCreateInvoiceProductsDto),
		);
		formik?.setFieldValue(
			"sub_total",
			rows.reduce((acc, row) => acc + ((row.price * row.quantity) as number), 0),
		);
		formik?.setFieldValue(
			"total",
			rows.reduce((acc, row) => acc + ((row.price * row.quantity) as number), 0),
		);
	}, [rows]);

	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];

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
					{({ values }) => (
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
									/>
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
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="reference_number"
										component={TextFormField}
										label="Reference Number"
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="date"
										component={DateFormField}
										label="Invoice Date"
										// minDate={new Date()}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="due_date"
										component={DateFormField}
										label="Invoice Due Date"
										minDate={moment(values.date).add(1, "days").toDate()}
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
											options={Object.keys(CreateInvoiceWithProductsRecurring).map(stringToListDto)}
										/>
									</Grid>
								)}
								<Grid item xs={12} mb={3}>
									<Divider />
								</Grid>

								<Grid item xs={12} sx={{ width: { xs: "90vw", sm: "auto" } }}>
									<FullFeaturedCrudGrid rows={rows} setRows={setRows} />
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
									<Field name="notes" component={TextFormField} label="Notes" multiline rows={5} />
									<Field
										name="paymentId"
										label="Payment Details"
										component={AutocompleteField}
										options={paymentData?.data?.map((payment) => ({
											value: payment.id,
											label: payment.paymentType,
										}))}
										loading={paymentData.isLoading}
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
													<Field name="sub_total" component={TextFormField} type="number" />
												</Grid>
												<Grid item xs={12} sm={6}>
													<Typography variant="h5">Taxes</Typography>
												</Grid>
												<Grid item xs={12} sm={6} textAlign={"right"}>
													<Field name="tax_id" component={TextFormField} type="number" />
												</Grid>
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
													<Field name="total" component={TextFormField} type="number" />
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
					)}
				</Formik>
			</Box>
			<PaymentDetailsDrawer open={open} handleClose={handleClose} />
		</>
	);
};

export default CreateInvoice;
