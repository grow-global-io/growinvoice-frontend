import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { Constants } from "@shared/constants";
import SettingFormHeading from "./SettingFormHeading";

const Preferences = () => {
	const initialValues = {
		language: "",
		timezone: "",
		date_format: "",
		month_starts: "",
		month_ends: "",
		discount_month_starts: "",
	};

	const schema = yup.object().shape({
		language: yup.string().required("Please Select Language"),
		timezone: yup.string().required("Please Select Timezone"),
		date_format: yup.string().required("Please Select Date formate"),
		month_starts: yup.string().required("Please Select Start Month"),
		month_ends: yup.string().required("Please Select End Month"),
		discount_month_starts: yup.string().required("Please Select Month Start"),
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
											name="language"
											label="Language"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="timezone"
											label="TimeZone"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="date_format"
											label="Date Format"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>

									<Grid item xs={12} sm={12}>
										<Divider />
									</Grid>

									<SettingFormHeading
										heading="Financial Year"
										icon={Constants.customImages.FinancialIcon}
									/>
									<Grid item xs={12} sm={6}>
										<Field
											name="month_starts"
											label="Month Starts"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="month_ends"
											label="Month Ends"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
										/>
									</Grid>

									<Grid item xs={12} sm={12}>
										<Divider />
									</Grid>

									<SettingFormHeading
										heading="Discount Type"
										icon={Constants.customImages.PencilEditIcon}
										text="Choose how to apply discount on invoices/estimates"
									/>

									<Grid item xs={12} sm={12}>
										<Field
											name="discount_month_starts"
											label="Month Starts"
											component={AutocompleteField}
											options={options}
											placeholder={"Select"}
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

export default Preferences;
