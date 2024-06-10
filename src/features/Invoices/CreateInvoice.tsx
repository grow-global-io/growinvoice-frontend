import { Box, Typography, Grid, Button, Divider } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { DateFormField } from "@shared/components/FormFields/DateFormField";
import * as yup from "yup";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { Constants } from "@shared/constants";
import FullFeaturedCrudGrid from "./ProductListDataGrid";

const CreateInvoice = () => {
	const initialValues = {
		customerName: "",
		invoiceNumber: "",
		referenceNumber: "",
		invoiceDate: "",
		isRecurring: "",
		invoiceDueDate: "",
		addNote: "",
		invoiceTemplate: "",
		paymentDetail: "",
		taxes: "",
		discount: "",
	};

	const schema = yup.object().shape({
		customerName: yup.string().required("Customer Name is required"),
		invoiceNumber: yup.string().required("Invoice Number is required"),
		referenceNumber: yup.string().required("Reference Number is required"),
		invoiceDate: yup.date().required("Invoice Date is required"),
		isRecurring: yup.string().required("Is Recurring is required"),
		invoiceDueDate: yup.date().required("Invoice Due Date is required"),
		addNote: yup.string(),
		paymentDetail: yup.string().required(" Payment Detail is required"),
		taxes: yup.string().required(" Taxes is required"),
		discount: yup.string().required(" Discount is required"),
		invoiceTemplate: yup.string().required("Invoice Template is required"),
	});

	const handleSubmit = () => {};

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
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
					{() => (
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={4}>
									<Field
										name="customerName"
										label="Customer Name"
										component={AutocompleteField}
										options={options}
									/>
								</Grid>
								<Grid item xs={12} mb={3}>
									<Divider />
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="invoiceNumber"
										component={TextFormField}
										label="Invoice Number"
										required={true}
										placeholder={"Enter invoice number"}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="referenceNumber"
										component={TextFormField}
										label="Reference Number"
										required={true}
										placeholder={"Enter reference number"}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="invoiceDate"
										component={DateFormField}
										label="Invoice Date"
										required={true}
										placeholder={"Select invoice date"}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="isRecurring"
										label="Is Recurring"
										component={AutocompleteField}
										required={true}
										options={options}
										placeholder={"select"}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name="invoiceDueDate"
										component={DateFormField}
										label="Invoice Due Date"
										required={true}
										placeholder={"Select invoice due date"}
									/>
								</Grid>
								<Grid item xs={12} mb={3}>
									<Divider />
								</Grid>

								<Grid item xs={12}>
									<FullFeaturedCrudGrid />
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
										name="addNote"
										component={TextFormField}
										label="Notes"
										required={true}
										multiline
										rows={5}
									/>
									<Field
										name="paymentDetail"
										label="Payment Details"
										component={AutocompleteField}
										required={true}
										options={options}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Grid
										container
										px={2}
										py={3}
										borderRadius={1}
										sx={{ background: "rgba(247, 247, 247, 1)" }}
									>
										<Grid item xs={12} sm={6}>
											<Typography variant="h5">Subtotal</Typography>
										</Grid>
										<Grid item xs={12} sm={6} textAlign={"right"}>
											<Typography variant="h5">0.000</Typography>
										</Grid>
										<Grid item xs={12} sm={12} display={"flex"} alignItems={"center"}>
											<Typography variant="h5">Taxes</Typography>
											<Box
												sx={{
													width: "50%",
													px: 2,
												}}
											>
												<Field
													name="taxes"
													component={TextFormField}
													required={true}
													backgroundColor={"#fff"}
												/>
											</Box>
											<Box
												sx={{
													width: "100%",
													display: "flex",
													justifyContent: "flex-end",
												}}
											>
												<Typography variant="h5">0.000</Typography>
											</Box>
										</Grid>
										<Grid item xs={12} sm={12} display={"flex"} alignItems={"center"}>
											<Typography variant="h5">Discount</Typography>
											<Box
												sx={{
													width: "50%",
													px: 2,
												}}
											>
												<Field
													name="discount"
													type="number"
													component={TextFormField}
													required={true}
													backgroundColor={"#fff"}
												/>
											</Box>
											<Box
												sx={{
													width: "100%",
													display: "flex",
													justifyContent: "flex-end",
												}}
											>
												<Typography variant="h5">0.000</Typography>
											</Box>
										</Grid>
										<Grid item xs={12}>
											<Divider />
										</Grid>
										<Grid item xs={12} sm={6}>
											<Typography variant="h5">Total</Typography>
										</Grid>
										<Grid item xs={12} sm={6} textAlign={"right"}>
											<Typography variant="h5">0.000</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} sm={3.5}>
									<Field
										name="invoiceTemplate"
										label="Invoice Template"
										component={AutocompleteField}
										required={true}
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

							{/* <Box mt={5} textAlign={"center"}>
								<Button variant="contained" type="submit">
									Save Invoice
								</Button>
							</Box> */}
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
};

export default CreateInvoice;
