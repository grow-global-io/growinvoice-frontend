import { Box, Grid, Typography } from "@mui/material";
import { Field } from "formik";
import { TextFormField } from "@shared/components/FormFields/TextFormField";

const CompanyUpdateForm = () => {
	// companyName: "",
	// 	phoneNumber: "",
	// 	country: "",
	// 	state: "",
	// 	city: "",
	// 	address: "",
	// 	zipCode: "",
	// 	vat: "",
	// 	logo: "",
	return (
		<Box>
			<Typography variant="h3">Tell us about your company</Typography>
			<Typography variant="h5" px={5} color={"secondary.dark"} fontWeight={500}>
				Provide some basic company details to get started.
			</Typography>
			<Grid container spacing={1} mt={2}>
				<Grid item xs={12} sm={6}>
					<Field name="companyName" label="Company Name" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="phoneNumber" label="Phone Number" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="country" label="Country" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="state" label="State" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="city" label="City" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="address" label="Address" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="zipCode" label="Zip Code" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="vat" label="VAT" component={TextFormField} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field name="logo" label="Logo" component={TextFormField} />
				</Grid>
			</Grid>
		</Box>
	);
};

export default CompanyUpdateForm;
