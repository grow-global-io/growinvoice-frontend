import { Box, Typography, Grid, useMediaQuery, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextFormField } from "../../shared/components/FormFields/TextFormField";
import { DateFormField } from "../../shared/components/FormFields/DateFormField";
import * as yup from "yup";
import InvoiceIcon from "./../../assets/img/invoice-icon.png";
import { useTheme } from "@mui/material/styles"; // Correct import for useTheme from MUI
import "./Dashboard.css";
import { AutocompleteField } from "../../shared/components/FormFields/AutoComplete";

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

	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];

	return (
		<>
			<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
				<img src={InvoiceIcon} alt="Invoice Icon" /> Invoices
			</Typography>
			<Box sx={{ mb: 2, mt: 2 }}>
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
					{() => (
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Field
										name="customerName"
										label="Customer Name"
										component={AutocompleteField}
										required={true}
										options={options}
										placeholder={"Select or add a customer"}
									/>
								</Grid>
							</Grid>
							<Typography border={"0.1px solid rgba(234, 234, 234, 1)"} my={3}></Typography>

							<Grid
								container
								spacing={isSmallScreen ? 2 : 10}
								width={isSmallScreen ? "100%" : "80%"}
							>
								<Grid item xs={12} sm={6}>
									<Field
										name="invoiceNumber"
										component={TextFormField}
										label="Invoice Number"
										required={true}
										placeholder={"Enter invoice number"}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										name="referenceNumber"
										component={TextFormField}
										label="Reference Number"
										required={true}
										placeholder={"Enter reference number"}
									/>
								</Grid>
							</Grid>

							<Grid
								container
								spacing={isSmallScreen ? 2 : 10}
								width={isSmallScreen ? "100%" : "80%"}
							>
								<Grid item xs={12} sm={6}>
									<Field
										name="invoiceDate"
										component={DateFormField}
										label="Invoice Date"
										required={true}
										placeholder={"Select invoice date"}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										name="isRecurring"
										label="Is Recurring"
										component={AutocompleteField}
										required={true}
										options={options}
										placeholder={"select"}
									/>
								</Grid>
							</Grid>

							<Grid
								container
								spacing={isSmallScreen ? 2 : 10}
								width={isSmallScreen ? "100%" : "80%"}
							>
								<Grid item xs={12} sm={6}>
									<Field
										name="invoiceDueDate"
										component={DateFormField}
										label="Invoice Due Date"
										required={true}
										placeholder={"Select invoice due date"}
									/>
								</Grid>
							</Grid>

							<Typography border={"0.1px solid rgba(234, 234, 234, 1)"} my={3}></Typography>

							<Grid container spacing={isSmallScreen ? 1 : 10} width={"100%"}>
								<Grid item xs={12} sm={6}>
									<Field
										name="addNote"
										component={TextFormField}
										label="Add Note"
										required={true}
										multiline
										rows={5}
									/>

									<Grid item xs={12} sm={8} my={2}>
										<Field
											name="paymentDetail"
											label="Payment Detail"
											component={AutocompleteField}
											required={true}
											options={options}
										/>
									</Grid>
								</Grid>

								<Grid item xs={12} sm={6}>
									<Box sx={{ background: "rgba(247, 247, 247, 1)" }} px={2} py={3} borderRadius={1}>
										<Box display={"flex"} justifyContent={"space-between"}>
											<Typography variant="h5">Subtotal</Typography>
											<Typography variant="h5">0.000</Typography>
										</Box>
										<Box display={"flex"} justifyContent={"space-between"}>
											<Box
												display={"flex"}
												alignItems={"center"}
												justifyContent={"space-between"}
												width={isSmallScreen ? "70%" : "55%"}
											>
												<Typography variant="h5">Taxes</Typography>
												<Grid item xs={8} sm={8}>
													<Field
														name="taxes"
														component={TextFormField}
														required={true}
														backgroundColor={"#fff"}
													/>
												</Grid>
											</Box>
											<Typography variant="h5">0.000</Typography>
										</Box>
										<Box display={"flex"} justifyContent={"space-between"}>
											<Box
												display={"flex"}
												alignItems={"center"}
												justifyContent={"space-between"}
												width={isSmallScreen ? "70%" : "55%"}
											>
												<Typography variant="h5">Discount</Typography>
												<Grid item xs={8} sm={8}>
													<Field
														name="discount"
														component={TextFormField}
														type={"number"}
														required={true}
														backgroundColor={"#fff"}
													/>
												</Grid>
											</Box>
											<Typography variant="h5">0.000</Typography>
										</Box>

										<Typography border={"0.1px solid rgba(234, 234, 234, 1)"} my={3}></Typography>

										<Box display={"flex"} justifyContent={"space-between"}>
											<Typography variant="h4">Total</Typography>
											<Typography variant="h4">0.000</Typography>
										</Box>
									</Box>
								</Grid>
							</Grid>

							<Grid container spacing={2} width={isSmallScreen ? "100%" : "70%"} mt={1}>
								<Grid item xs={12} sm={6}>
									<Field
										name="invoiceTemplate"
										label="Invoice Template"
										component={AutocompleteField}
										required={true}
										options={options}
									/>
								</Grid>
								<Grid item xs={12} sm={6} display="flex" alignItems="center" mt={1}>
									<Button variant="outlined">Preview</Button>
								</Grid>
							</Grid>

							<Box mt={5} textAlign={"center"}>
								<Button variant="contained" type="submit">
									Save Invoice
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
};

export default CreateInvoice;