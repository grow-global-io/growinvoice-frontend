import * as React from 'react';
import { Box, Drawer, Button, Typography, Grid, Divider } from '@mui/material';
import { Constants } from '@shared/constants';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { TextFormField } from '@shared/components/FormFields/TextFormField';
import { AutocompleteField } from '@shared/components/FormFields/AutoComplete';
import { PhoneInputFormField } from "@shared/components/FormFields/PhoneInputFormField";
import { CheckBoxFormField } from "@shared/components/FormFields/CheckBoxFormField";

export default function CreateCustomer() {
	const [state, setState] = React.useState({ right: false, });

	const initialValues = {
		customerType:"",
		customerName:"",
		customerDisplayName:"",
		gstNumber:"",
		copanyname:"",
		city:"",
		country:"",
		state:"",
		pincode:"",
		phone:"",
		address:"",
		sameasBillAd:"",
		copanyNameShipAd:"",
		cityShipAd:"",
		countryShipAd:"",
		stateShipAd:"",
		pinCodeShipAd:"",
		phoneShipAd:"",
		addressShipAd:""
	};

	const schema = yup.object().shape({});

	const handleSubmit = () => { };

	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];

	const toggleDrawer = (open: boolean) => {
		setState({ right: open });
	};

	const list = () => (
		<Box
			sx={{ width: { sm: "700px" } }}
			role="presentation"
			padding={2}

		>
			<Grid container justifyContent={"space-between"}>
				<Typography
					variant="h3"
					color={"secondary.dark"}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,

					}}
					fontWeight={500}
				>
					<img src={Constants.customImages.CustomerImg} alt="Invoice Icon" /> Add New Customer
				</Typography>
				<img src={Constants.customImages.CloseIcon} alt='closeIcon' onClick={() => toggleDrawer(false)} width={"30px"} height={"30px"} />
			</Grid>

			<Box sx={{ mb: 2, mt: 2 }}>
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
					{() => (
						<Form>
                             <Divider />
							<Grid container spacing={2} bgcolor={"rgba(217, 217, 217, 0.07)"} my={1}>

								<Grid item xs={12} sm={8}>
									<Field
										name="customerType"
										label="Customer Type"
										component={AutocompleteField}
										options={options}
										required={true}
										placeholder={"Select"}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										name="customerName"
										label="Customer Name"
										component={TextFormField}
										required={true}
										placeholder={"Enter customer name"}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										name="customerDisplayName"
										label="Customer Display Name"
										component={TextFormField}
										required={true}
										placeholder={"Enter customer display name"}
									/>
								</Grid>
								<Grid item xs={12} sm={8}>
									<Field
										name="gstNumber"
										label="GST Number"
										component={TextFormField}
										required={true}
										type="number"
										placeholder={"Enter gst number"}
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
										<img src={Constants.customImages.BillingAddressIcon} alt="Invoice Icon" /> Billing Address
									</Typography>
								</Grid>
                                <Grid item xs={12} sm={6}>
									<Field
										name="copanyname"
										component={TextFormField}
										label="Name"
										required={true}
										placeholder={"Enter company name"}

									/>
									<Grid container spacing={1}>
										<Grid item xs={12} sm={6}>
											<Field
												name="city"
												component={AutocompleteField}
												label="City"
												required={true}
												options={options}
												placeholder={"Select"}
											/>

										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name="country"
												component={AutocompleteField}
												label="Contry"
												required={true}
												options={options}
												placeholder={"Select"}
											/>

										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name="state"
												component={AutocompleteField}
												label="State"
												required={true}
												options={options}
												placeholder={"Select"}
											/>

										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name="pincode"
												component={TextFormField}
												label="Picode"
												required={true}
												options={options}
												type="number"
												placeholder={"Enter Picode"}
											/>

										</Grid>

									</Grid>


								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										name="phone"
										component={PhoneInputFormField}
										label="Phone"
										required={true}
										placeholder={"Enter mobile number"}
									/>
									<Field
										name="address"
										component={TextFormField}
										label="Address"
										required={true}
										placeholder={"Enter Address"}
										multiline
										rows={6}

									/>

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
									<img src={Constants.customImages.BillingAddressIcon} alt="Invoice Icon" /> Shipping Address
								</Typography>
							  <Grid item xs={12} sm={6} textAlign={{xs:"start",sm:"center"}}>
							  <Field
										name="sameasBillAd"
										component={CheckBoxFormField}
										label="Same as billing address"
										required={true}
								/>
							  </Grid>
								
								

							</Grid>
							<Grid container spacing={2} my={1}>
								<Grid item xs={12} sm={6}>
									<Field
										name="copanyNameShipAd"
										component={TextFormField}
										label="Name"
										required={true}
										placeholder={"Enter company name"}

									/>
									<Grid container spacing={1}>
										<Grid item xs={12} sm={6}>
											<Field
												name="cityShipAd"
												component={AutocompleteField}
												label="City"
												required={true}
												options={options}
												placeholder={"Select"}
											/>

										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name="countryShipAd"
												component={AutocompleteField}
												label="Contry"
												required={true}
												options={options}
												placeholder={"Select"}
											/>

										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name="stateShipAd"
												component={AutocompleteField}
												label="State"
												required={true}
												options={options}
												placeholder={"Select"}
											/>

										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name="pinCodeShipAd"
												component={TextFormField}
												label="Picode"
												required={true}
												options={options}
												type="number"
												placeholder={"Enter Picode"}
											/>

										</Grid>

									</Grid>


								</Grid>
								<Grid item xs={12} sm={6}>
									<Field
										name="phoneShipAd"
										component={PhoneInputFormField}
										label="Phone"
										required={true}
										placeholder={"Enter mobile number"}
									/>
									<Field
										name="addressShipAd"
										component={TextFormField}
										label="Address"
										required={true}
										placeholder={"Enter Address"}
										multiline
										rows={6}

									/>

								</Grid>

							</Grid>
							<Grid item xs={12} textAlign={"center"}>
								<Button variant="contained" type="submit">
									Save
								</Button>
							</Grid>


						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);

	return (
		<div>
			<Button onClick={() => toggleDrawer(true)}>Open Right Drawer</Button>

			<Drawer
				anchor="right"
				open={state.right}
				onClose={() => toggleDrawer(false)}
			>
				{list()}
			</Drawer>
		</div>
	);
}
