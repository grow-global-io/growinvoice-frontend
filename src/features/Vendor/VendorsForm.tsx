import { useCreateVendorsStore } from "@store/createVendorsStore";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { PhoneInputFormField } from "@shared/components/FormFields/PhoneInputFormField";
import { Constants } from "@shared/constants";
import StateFormField from "@shared/components/FormFields/StateFormField";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { useCurrencyControllerFindCountries } from "@api/services/currency";
import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

const VendorsForm = () => {
	const { setOpenVendorsForm } = useCreateVendorsStore.getState();
	const countryFindAll = useCurrencyControllerFindCountries();
	const initialValues = {
		contact_name: "",
		display_name: "",
		email: "",
		phone: "",
		website: "",
		billingaddress_name: "",
		billingaddress_phone: "",
		country: "",
		state: "",
		city: "",
		zip: "",
		address: "",
	};
	const schema = yup.object({
		contact_name: yup.string(),
		display_name: yup.string(),
		email: yup.string().email(),
		phone: yup.string().test("is-phone", "Phone number is not valid", function (value) {
			if (!value) return true;
			return isValidPhoneNumber(value);
		}),
		billingaddress_name: yup.string().required("Name is required"),
		billingaddress_phone: yup
			.string()
			.test("is-phone", "Phone number is not valid", function (value) {
				if (!value) return true;
				return isValidPhoneNumber(value);
			})
			.required("Phone number is required"),
		country: yup.string().required("Country is required"),
		state: yup.string().required("state is required"),
		city: yup.string().required("city is required"),
		zip: yup.string().required("pin code is required"),
		address: yup.string().required("address is required"),
	});
	const handleSubmit = () => {};

	return (
		<>
			<Box sx={{ width: { lg: "700px" } }} role="presentation">
				<Grid container justifyContent={"space-between"} padding={2}>
					<Typography
						variant="h4"
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}
					>
						<PersonOutlineOutlinedIcon /> Add New Vendor
					</Typography>

					<IconButton
						sx={{
							color: "secondary.dark",
						}}
						onClick={() => setOpenVendorsForm(false)}
					>
						<CloseIcon />
					</IconButton>
				</Grid>

				<Box sx={{ mb: 2, mt: 2 }}>
					<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
						{() => (
							<Form>
								<Grid container spacing={2} bgcolor={"custom.lightgray"} padding={2}>
									<Grid item xs={12} md={6}>
										<Field name="contact_name" label="Contact Name" component={TextFormField} />
									</Grid>
									<Grid item xs={12} md={6}>
										<Field name="display_name" label="Display Name" component={TextFormField} />
									</Grid>
									<Grid item xs={12} md={6}>
										<Field name="email" label="Email" component={TextFormField} />
									</Grid>

									<Grid item xs={12} md={6}>
										<Field name="phone" label="Phone" component={PhoneInputFormField} />
									</Grid>
									<Grid item xs={12} md={6}>
										<Field name="website" label="Website" component={TextFormField} />
									</Grid>
								</Grid>
								<Grid container spacing={2} padding={2}>
									<Grid item xs={12} md={12}>
										<Typography
											variant="h4"
											color={"secondary.dark"}
											sx={{
												display: "flex",
												alignItems: "center",
												gap: 1,
											}}
										>
											<img src={Constants.customImages.BillingAddressIcon} alt="Invoice Icon" />{" "}
											Billing Address
										</Typography>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="billingaddress_name"
											label="Name"
											component={TextFormField}
											isRequired={true}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="billingaddress_phone"
											label="Phone"
											component={PhoneInputFormField}
											isRequired={true}
										/>
									</Grid>

									<Grid item xs={12}>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={6}>
												<Field
													name="country"
													component={AutocompleteField}
													label="Country"
													options={countryFindAll?.data?.map((item) => ({
														label: item.name,
														value: item.id,
													}))}
													loading={countryFindAll.isLoading}
													isRequired={true}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<StateFormField
													countryFieldName="country"
													stateFieldName="state"
													stateLabel="State"
													isRequired={true}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<Field
													name="city"
													component={TextFormField}
													label="City"
													isRequired={true}
												/>
												<Field
													name="zip"
													component={TextFormField}
													label="Pincode"
													isRequired={true}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<Field
													name="address"
													component={TextFormField}
													label="Address"
													multiline
													rows={6}
													isRequired={true}
												/>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12} textAlign={"center"}>
										<Button variant="contained" type="submit">
											Save
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

export default VendorsForm;
