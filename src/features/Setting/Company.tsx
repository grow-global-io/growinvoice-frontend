import { Box, Button, Grid, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Formik, Field, Form, FormikProps, FormikHelpers } from "formik";
import * as yup from "yup";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { PhoneInputFormField } from "@shared/components/FormFields/PhoneInputFormField";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { useAuthStore } from "@store/auth";
import { useCurrencyControllerFindCountries } from "@api/services/currency";
import StateFormField from "@shared/components/FormFields/StateFormField";
import { useRef } from "react";
import { useCompanyControllerUpdate } from "@api/services/company";

const Company = () => {
	const { user } = useAuthStore();
	const countryFindAll = useCurrencyControllerFindCountries();
	const companyUpdate = useCompanyControllerUpdate({
		mutation: {
			onSuccess: () => {
				// handle success
			},
			onError: (error) => {
				// handle error
				console.error("Update failed", error);
			},
		},
	});

	const initialValues = {
		name: user?.company?.[0]?.name ?? "",
		phone: user?.company?.[0]?.phone ?? "",
		vat: user?.company?.[0]?.vat ?? "",
		country_id: user?.company?.[0]?.country_id ?? "",
		state_id: user?.company?.[0]?.state_id ?? "",
		city: user?.company?.[0]?.city ?? "",
		zip: user?.company?.[0]?.zip ?? "",
		address: user?.company?.[0]?.address ?? "",
		logo: user?.company?.[0]?.logo ?? "",
		user_id: user?.company?.[0]?.user_id ?? "",
	};
	const formikRef = useRef<FormikProps<typeof initialValues>>(null);
	const schema = yup.object().shape({
		name: yup.string().required("Company name is required"),
		vat: yup.string(),
		country_id: yup.string().required("Select Country"),
		state_id: yup.string().required("Select state"),
		city: yup.string().required("Select city"),
		phone: yup.number().required("Phone Number is required"),
		zip: yup.string().required("Postal Code is required"),
		logo: yup.string().required("logo is required"),
		address: yup.string().required("Address is required"),
	});

	const id = user?.company?.[0]?.user_id ?? "";

	const handleSubmit = async (
		values: typeof initialValues,
		actions: FormikHelpers<typeof initialValues>,
	) => {
		try {
			await companyUpdate.mutateAsync({
				id: id,
				data: values,
			});
			actions.resetForm();
			console.log("Update successful");
		} catch (error) {
			console.error("Update failed", error);
		}
	};

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
					<Formik
						initialValues={initialValues}
						validationSchema={schema}
						onSubmit={handleSubmit}
						innerRef={formikRef}
					>
						{() => (
							<Form>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Field
											name="name"
											label="Company Name"
											component={TextFormField}
											isRequired={true}
											placeholder={"Enter company name"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="phone"
											label="Phone"
											component={PhoneInputFormField}
											isRequired={true}
											placeholder={"Enter mobile nuber"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="vat"
											label="Vat Number"
											component={TextFormField}
											placeholder={"Vat Number"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="country_id"
											label="Currency"
											component={AutocompleteField}
											options={countryFindAll.data?.map((item) => ({
												label: item.name,
												value: item.id,
											}))}
											loading={countryFindAll.isLoading}
											placeholder={"Select"}
											isRequired={true}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<StateFormField
											countryFieldName="country_id"
											stateFieldName="state_id"
											stateLabel="State"
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="city"
											label="City"
											component={TextFormField}
											isRequired={true}
											placeholder={"Select"}
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<Field
											name="zip"
											label="Postal Code"
											component={TextFormField}
											isRequired={true}
											placeholder={"Enter postal code"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="address"
											label="Address"
											component={TextFormField}
											isRequired={true}
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
