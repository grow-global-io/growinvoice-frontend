import * as React from "react";
import { Box, Drawer, Button, Typography, Grid, IconButton } from "@mui/material";
import { Constants } from "@shared/constants";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const style = {
	bgcolor: "rgba(246, 250, 255, 1)",
	padding: "15px",
	borderRadius: 1,
};

export default function CreateProduct() {
	const [state, setState] = React.useState({
		right: false,
		showUnitBox: false,
		showHsnBox: false,
		showTaxBox: false,
	});

	const initialValues = {
		productType: "",
		serviceName: "",
		unit: "",
		unitName: "",
		hsnCode: "",
		hsnCodeName: "",
		hsnCodeTaxes: "",
		taxes: "",
		taxesPercentage: "",
		taxesDescription: "",
		description: "",
	};

	const schema = yup.object().shape({});
	const handleSubmit = () => {};

	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];

	const toggleDrawer = (open: boolean) => {
		setState((prevState) => ({ ...prevState, right: open }));
	};

	const toggleBox = (box: string, value: boolean) => {
		setState((prevState) => ({ ...prevState, [box]: value }));
	};

	const ProductForm = () => (
		<Box sx={{ width: { sm: "400px" } }} padding={2}>
			<Grid container justifyContent={"space-between"}>
				<Typography
					variant="h4"
					color={"secondary.dark"}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					<img src={Constants.customImages.ProductSymbol} alt="Invoice Icon" /> New Product
				</Typography>

				<IconButton
					sx={{
						color: "secondary.dark",
					}}
					onClick={() => toggleDrawer(false)}
				>
					<CloseIcon />
				</IconButton>
			</Grid>

			<Box sx={{ mb: 2, mt: 2 }}>
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
					{() => (
						<Form>
							<Grid container>
								<Grid item xs={12}>
									<Field
										name="productType"
										label="Type"
										component={AutocompleteField}
										options={options}
										required={true}
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name="serviceName"
										component={TextFormField}
										label="Service Name"
										required={true}
									/>
								</Grid>

								<Grid item xs={12}>
									<Field
										name="unit"
										label="Unit"
										component={AutocompleteField}
										options={options}
										required={true}
									/>
									{!state.showUnitBox && (
										<Button
											variant="text"
											onClick={() => toggleBox("showUnitBox", true)}
											startIcon={<AddIcon />}
										>
											Add Unit
										</Button>
									)}
									{state.showUnitBox && (
										<Box sx={style}>
											<Field
												name="unitName"
												component={TextFormField}
												label="Name"
												required={true}
												placeholder={"Enter Name"}
											/>
											<Box textAlign={"center"} marginTop={2}>
												<Button variant="contained" type="submit">
													Create Product Unit
												</Button>
												<Button variant="outlined" onClick={() => toggleBox("showUnitBox", false)}>
													Cancel
												</Button>
											</Box>
										</Box>
									)}
								</Grid>

								<Grid item xs={12}>
									<Field
										name="hsnCode"
										label="HSN Code(India)"
										component={AutocompleteField}
										options={options}
										required={true}
										placeholder={"Select"}
									/>
									{!state.showHsnBox && (
										<Button
											variant="text"
											onClick={() => toggleBox("showHsnBox", true)}
											startIcon={<AddIcon />}
										>
											Add HSN
										</Button>
									)}
									{state.showHsnBox && (
										<Box sx={style}>
											<Field
												name="hsnCodeName"
												component={TextFormField}
												label="Name"
												required={true}
												placeholder={"Enter Name"}
											/>
											<Field
												name="hsnCodeTaxes"
												label="Choose Taxes"
												component={AutocompleteField}
												options={options}
												required={true}
												placeholder={"Select"}
											/>
											<Box textAlign={"center"} marginTop={2}>
												<Button variant="contained" type="submit">
													Create Hsn Code
												</Button>
												<Button variant="outlined" onClick={() => toggleBox("showHsnBox", false)}>
													Cancel
												</Button>
											</Box>
										</Box>
									)}
								</Grid>

								<Grid item xs={12}>
									<Field
										name="taxes"
										label="Taxes"
										component={AutocompleteField}
										options={options}
										required={true}
										placeholder={"Select"}
									/>
									{!state.showTaxBox && (
										<Button
											variant="text"
											onClick={() => toggleBox("showTaxBox", true)}
											startIcon={<AddIcon />}
										>
											Add Taxes
										</Button>
									)}
									{state.showTaxBox && (
										<Box sx={style}>
											<Field
												name="taxesPercentage"
												component={TextFormField}
												label="Percentage"
												required={true}
												placeholder={"Enter Percentage"}
												type="number"
											/>
											<Field
												name="taxesDescription"
												component={TextFormField}
												label="Description"
												required={true}
												placeholder={"Description"}
												multiline
												rows={5}
											/>
											<Box textAlign={"center"} marginTop={2}>
												<Button variant="contained" type="submit">
													Create Tax
												</Button>
												<Button variant="outlined" onClick={() => toggleBox("showTaxBox", false)}>
													Cancel
												</Button>
											</Box>
										</Box>
									)}
								</Grid>

								<Grid item xs={12}>
									<Field
										name="description"
										component={TextFormField}
										label="Description"
										required={true}
										placeholder={"Write description"}
										multiline
										rows={5}
									/>
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
	);

	return (
		<>
			<Button variant="contained" onClick={() => toggleDrawer(true)} startIcon={<AddIcon />}>
				Create New
			</Button>
			<Drawer anchor="right" open={state.right} onClose={() => toggleDrawer(false)}>
				<ProductForm />
			</Drawer>
		</>
	);
}
