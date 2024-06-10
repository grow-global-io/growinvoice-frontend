import { Box, Grid, Typography, Divider, Button, IconButton } from "@mui/material";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { CheckBoxFormField } from "@shared/components/FormFields/CheckBoxFormField";
import { PhoneInputFormField } from "@shared/components/FormFields/PhoneInputFormField";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { Constants } from "@shared/constants";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateCustomerStore } from "@store/createCustomerStore";
import {
	CreateCustomerWithAddressDto,
	CreateCustomerWithAddressDtoOption,
} from "@api/services/models";
import { stringToListDto } from "@shared/models/ListDto";
import {
	useCurrencyControllerFindAll,
	useCurrencyControllerFindCountries,
} from "@api/services/currency";
import StateFormField from "@shared/components/FormFields/StateFormField";
import { useCustomerControllerCreate } from "@api/services/customer";
import { useAuthStore } from "@store/auth";

const CustomerForm = () => {
	const countryFindAll = useCurrencyControllerFindCountries();
	const createCustomer = useCustomerControllerCreate();
	const currencyList = useCurrencyControllerFindAll();

	const { user } = useAuthStore();

	const { setOpenCustomerForm } = useCreateCustomerStore.getState();
	const initialValues: CreateCustomerWithAddressDto = {
		currencies_id: "",
		name: "",
		option: "Freelancer",
		user_id: user?.id ?? "",
		billingDetails: {
			address: "",
			city: "",
			country_id: "",
			state_id: "",
			zip: "",
		},
		shippingDetails: {
			address: "",
			city: "",
			country_id: "",
			state_id: "",
			zip: "",
		},
		display_name: "",
		email: "",
		phone: "",
		website: "",
	};

	const schema: yup.Schema<CreateCustomerWithAddressDto> = yup.object({
		currencies_id: yup.string().required("Currency is required"),
		name: yup.string().required("Name is required"),
		option: yup
			.string()
			.required("Option is required")
			.oneOf(Object.values(CreateCustomerWithAddressDtoOption), "Invalid Type"),
		user_id: yup.string().required("User is required"),
		billingDetails: yup.object().shape({
			address: yup.string().required("Address is required"),
			city: yup.string().required("City is required"),
			country_id: yup.string().required("Country is required"),
			state_id: yup.string().required("State is required"),
			zip: yup.string().required("Zip is required"),
		}),
		shippingDetails: yup.object().shape({
			address: yup.string().required("Address is required"),
			city: yup.string().required("City is required"),
			country_id: yup.string().required("Country is required"),
			state_id: yup.string().required("State is required"),
			zip: yup.string().required("Zip is required"),
		}),
		display_name: yup.string().required("Display Name is required"),

		email: yup.string().required("Email is required").email(),

		email: yup.string().required("Email is required"),

		phone: yup.string().required("Phone is required"),
		website: yup.string().required("Website is required"),
	});

	const handleSubmit = async (
		values: CreateCustomerWithAddressDto,
		actions: FormikHelpers<CreateCustomerWithAddressDto>,
	) => {
		actions.setSubmitting(true);
		await createCustomer.mutateAsync({
			data: values,
		});
		setOpenCustomerForm(false);
		actions.setSubmitting(false);
	};

	return (
		<Box sx={{ width: { sm: "700px" } }} role="presentation" padding={2}>
			<Grid container justifyContent={"space-between"}>
				<Typography
					variant="h4"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					<img src={Constants.customImages.CustomerImg} alt="Invoice Icon" /> Add New Customer
				</Typography>
				<IconButton
					sx={{
						color: "secondary.dark",
					}}
					onClick={() => setOpenCustomerForm(false)}
				>
					<CloseIcon />
				</IconButton>
			</Grid>

			<Box sx={{ mb: 2, mt: 2 }}>
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
					{({ errors }) => {
						console.log(errors);
						return (
							<Form>
								<Divider />

								<Grid container spacing={2} bgcolor={"custom.lightgray"} my={1}>

								<Grid container spacing={2} bgcolor={"rgba(217, 217, 217, 0.07)"} my={1}>

									<Grid item xs={12} sm={8}>
										<Field
											name="option"
											label="Customer Type"
											component={AutocompleteField}
											options={Object.values(CreateCustomerWithAddressDtoOption).map(
												stringToListDto,
											)}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field name="name" label="Customer Name" component={TextFormField} />
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field name="display_name" label="Display Name" component={TextFormField} />
									</Grid>
									{/* <Grid item xs={12} sm={8}>
									<Field
										name="gstNumber"
										label="GST Number"
										component={TextFormField}
										type="number"
									/>
								</Grid> */}
									<Grid item xs={12} sm={6}>
										<Field name="email" label="Email" component={TextFormField} />
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field name="phone" label="Phone" component={PhoneInputFormField} />
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field name="website" label="Website" component={TextFormField} />
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="currencies_id"
											label="Currency"
											loading={currencyList.isLoading || currencyList.isFetching}
											component={AutocompleteField}
											options={currencyList.data?.map((currency) => ({
												value: currency.id,
												label: `${currency.short_code} - ${currency.name}`,
											}))}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={2} my={1}>
									<Grid item xs={12} sm={12}>
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
									<Grid item xs={12}>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={6}>
												<Field
													name="billingDetails.country_id"
													component={AutocompleteField}
													label="Country"
													options={countryFindAll.data?.map((item) => ({
														label: item.name,
														value: item.id,
													}))}
													loading={countryFindAll.isLoading}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												{/* <Field
												name="billingDetails.state_id"
												component={AutocompleteField}
												label="State"
											/> */}
												<StateFormField
													countryFieldName="billingDetails.country_id"
													stateFieldName="billingDetails.state_id"
													stateLabel="State"
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<Field name="billingDetails.city" component={TextFormField} label="City" />
												<Field
													name="billingDetails.zip"
													component={TextFormField}
													label="Zip Code"
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<Field
													name="billingDetails.address"
													component={TextFormField}
													label="Address"
													multiline
													rows={6}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								<Divider />
								<Grid container my={1}>
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
										Shipping Address
									</Typography>
									<Grid item xs={12} sm={6} textAlign={{ xs: "start", sm: "center" }}>
										<Field
											name="sameasBillAd"
											component={CheckBoxFormField}
											label="Same as billing address"
										/>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12} sm={6}>
											<Field
												name="shippingDetails.country_id"
												component={AutocompleteField}
												label="Country"
												options={countryFindAll.data?.map((item) => ({
													label: item.name,
													value: item.id,
												}))}
												loading={countryFindAll.isLoading}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											{/* <Field
											name="shippingDetails.state_id"
											component={AutocompleteField}
											label="State"
										/> */}
											<StateFormField
												countryFieldName="shippingDetails.country_id"
												stateFieldName="shippingDetails.state_id"
												stateLabel="State"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Field name="shippingDetails.city" component={TextFormField} label="City" />
											<Field
												name="shippingDetails.zip"
												component={TextFormField}
												label="Zip Code"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Field
												name="shippingDetails.address"
												component={TextFormField}
												label="Address"
												multiline
												rows={6}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} textAlign={"center"}>
									<Button variant="contained" type="submit">
										Save
									</Button>
								</Grid>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</Box>
	);
};

export default CustomerForm;
