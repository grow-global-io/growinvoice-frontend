import { Box, Typography, Grid, Button, Divider } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { DateFormField } from "@shared/components/FormFields/DateFormField";
import * as yup from "yup";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { Constants } from "@shared/constants";
import FullFeaturedCrudGrid from "@features/Invoices/ProductListDataGrid";
import { GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";

const CreateQuotation = () => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const initialValues = {
		customerName: "",
		quotationNumber: "",
		referenceNumber: "",
		quotationDate: "",
		expirydate: "",
		addNote: "",
		privateNote: "",
		taxes: "",
		discount: "",
		quotationTemplate: "",
	};

	const schema = yup.object().shape({
		customerName: yup.string().required("Customer Name is required"),
		quotationNumber: yup.number().required("Quotation Number is required"),
		referenceNumber: yup.number().required("Reference Number is required"),
		quotationDate: yup.date().required("Quotation Date is required"),
		expirydate: yup.date().required("Expiry Date is required"),
		addNote: yup.string(),
		privateNote: yup.string(),
		taxes: yup
			.number()
			.required(" Taxes is required")
			.min(0, "Taxes should be greater than 0")
			.max(99, "taxes should be less than 99"),
		discount: yup
			.number()
			.required(" discount is required")
			.min(0, "discount should be greater than 0")
			.max(99, "discount should be less than 99"),
		quotationTemplate: yup.string().required("Quotation Template is required"),
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
				<img src={Constants.customImages.QuotationIcon} alt="Invoice Icon" /> New Quotation
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
										placeholder={"Select or Add Customer"}
									/>
								</Grid>
								<Grid item xs={12} mb={3}>
									<Divider />
								</Grid>
								<Grid item xs={12} sm={6} lg={4}>
									<Field
										name="quotationNumber"
										component={TextFormField}
										label="Quotation Number"
										required={true}
										placeholder={"Enter invoice number"}
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={4}>
									<Field
										name="referenceNumber"
										component={TextFormField}
										label="Reference Number"
										required={true}
										placeholder={"Enter reference number"}
									/>
								</Grid>
								<Grid item xs={12} sm={6} lg={4}>
									<Field
										name="quotationDate"
										component={DateFormField}
										label="Quotation Date"
										required={true}
										placeholder={"Select quotation date"}
									/>
								</Grid>

								<Grid item xs={12} sm={6} lg={4}>
									<Field
										name="expirydate"
										component={DateFormField}
										label="Expiry At "
										required={true}
										placeholder={"Select"}
									/>
								</Grid>
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
											lg: "20%",
											xs: 0,
										},
									}}
								>
									<Field
										name="addNote"
										component={TextFormField}
										label="Add Notes"
										required={true}
										multiline
										rows={5}
									/>
									<Field
										name="privateNote"
										component={TextFormField}
										label=" Private Notes"
										required={true}
										multiline
										rows={5}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Grid
										container
										px={2}
										py={3}
										borderRadius={1}
										sx={{ background: "custom.transparentWhite" }}
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
													backgroundColor={"custom.white"}
													type="number"
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
													backgroundColor={"custom.white"}
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
										name="quotationTemplate"
										label="Quotation Template"
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

export default CreateQuotation;
