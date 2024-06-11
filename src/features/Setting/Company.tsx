import { Box, Button, Grid, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { PhoneInputFormField } from "@shared/components/FormFields/PhoneInputFormField";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";

const Company = () => {
	const initialValues = {
		company_name: "",
		phone: "",
		vat_number: "",
		country: "",
		state: "",
		city: "",
		postal_code: "",
		address: "",
	};

	const schema = yup.object().shape({
		company_name: yup.string().required("Company name is required"),
		vat_number: yup.string().required("Vat Number is required"),
		country: yup.string().required("Select Country"),
		state: yup.string().required("Select state"),
		city: yup.string().required("Select city"),
		phone: yup.number().required("Phone Number is required"),
		postal_code: yup.string().required("Postal Code is required"),
		address: yup.string().required("Address is required"),
	});

	const handleSubmit = () => {};
	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];
	return (
		<>
			<Box>
				<Typography variant="h3" textTransform={"capitalize"} mb={3}>
					Setting
				</Typography>
			</Box>
			<Box
				display="flex"
				sx={{ flexDirection: { xs: "column", sm: "row" } }}
				height={{ xs: "auto", sm: "75vh" }}
			>
				<Sidebar />
				<Box flex={1} padding={{ xs: 0, sm: 2 }} sx={{ overflowY: "scroll" }}>
					<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
						{() => (
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Field
											name="company_name"
											label="Company Name"
											component={TextFormField}
											required={true}
											placeholder={"Enter company name"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="phone"
											label="Phone"
											component={PhoneInputFormField}
											required={true}
											placeholder={"Enter mobile nuber"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="vat_number"
											label="Vat Number"
											component={TextFormField}
											required={true}
											placeholder={"Vat Number"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="country"
											label="Currency"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="state"
											label="State"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="city"
											label="City"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<Field
											name="postal_code"
											label="Postal Code"
											component={TextFormField}
											required={true}
											placeholder={"Enter postal code"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="address"
											label="Address"
											component={TextFormField}
											required={true}
											placeholder={"Add address"}
											multiline
											rows={5}
										/>
									</Grid>

									<Grid item xs={12} textAlign={"center"} my={2}>
										<Button variant="contained" type="submit">
											Update
										</Button>
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</Box>
			</Box>
		</>
	);
};

export default Company;
