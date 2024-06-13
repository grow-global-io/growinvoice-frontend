import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { PhoneInputFormField } from "@shared/components/FormFields/PhoneInputFormField";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { Constants } from "@shared/constants";
import SettingFormHeading from "./SettingFormHeading";

const MyProfile = () => {
	const initialValues = {
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		currency: "",
		old_password: "",
		new_password: "",
	};

	const schema = yup.object().shape({
		first_name: yup.string().required("First name is required"),
		last_name: yup.string().required("Last name is required"),
		email: yup.string().required("Email is required").email("Email is invalid"),
		phone: yup.number().required("Phone Number is required"),
		currency: yup.string().required("Select Currency is required"),
		old_password: yup
			.string()
			.min(7, "Password is at least 7 characters")
			.required("Old Password is required"),
		new_password: yup
			.string()
			.min(7, "Password is at least 7 characters")
			.required("New Password is required"),
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
				sx={{ flexDirection: { xs: "column", lg: "row" } }}
				height={{ xs: "auto", lg: "75vh" }}
			>
				<Sidebar />
				<Box flex={1} padding={{ xs: 0, sm: 2 }} sx={{ overflowY: "scroll" }}>
					<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
						{() => (
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Field
											name="first_name"
											label="First Name"
											component={TextFormField}
											required={true}
											placeholder={"Enter first name"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="last_name"
											label="Last Name"
											component={TextFormField}
											required={true}
											placeholder={"Enter Last name"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="email"
											label="Email"
											component={TextFormField}
											required={true}
											placeholder={"Enter email ID"}
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
											name="currency"
											label="Currency"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<Divider />
									</Grid>

									<SettingFormHeading
										heading="Update Password"
										icon={Constants.customImages.UpdatePassWordIcon}
										text="If you want to update your password please fill the information below."
									/>
									<Grid item xs={12} sm={6}>
										<Field
											name="old_password"
											label="Old Password"
											component={TextFormField}
											required={true}
											placeholder={"Enter old password"}
											type="password"
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<Field
											name="new_password"
											label="New Passwod"
											component={TextFormField}
											required={true}
											placeholder={"Enter new password"}
											type="password"
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

export default MyProfile;
