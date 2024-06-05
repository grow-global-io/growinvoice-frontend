import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Step,
	Stepper,
	StepConnector,
	stepConnectorClasses,
	styled,
} from "@mui/material";
import React from "react";
import GetStartedInitialScreen from "./GetStarted/GetStartedInitialScreen";
import CurrencyUpdateForm from "./GetStarted/CurrencyUpdateForm";
import CompanyUpdateForm from "./GetStarted/CompanyUpdateForm";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";

const validationSchema = Yup.object().shape({
	currency: Yup.string().required("Currency is required"),
	companyType: Yup.string().required("Company Type is required"),
	phoneNumber: Yup.string().required("Phone Number is required"),
	country: Yup.string().required("Country is required"),
	state: Yup.string().required("State is required"),
	city: Yup.string().required("City is required"),
	address: Yup.string().required("Address is required"),
	logo: Yup.string().required("Logo is required"),
});

const steps = ["Personal Inf.", "Verification", "Insurance", "Payment"];

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 0,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.primary.main,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.primary.main,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 5,
		border: 0,
		width: "100%",
		padding: 0,
		backgroundColor: theme.palette.grey[100],
		borderRadius: 1,
	},
}));
const CustomStepperBox = styled(Box)(() => ({
	width: "60%", // Adjust the width as needed to control the spacing
	margin: "auto",
}));

const GetStartedDialog = ({ open, handleClose }: { open: boolean; handleClose?: () => void }) => {
	console.log(open);
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const initialValues = {
		currency: "",
		companyName: "",
		phoneNumber: "",
		country: "",
		state: "",
		city: "",
		address: "",
		zipCode: "",
		vat: "",
		logo: "",
	};

	const handleSubmit = (
		values: typeof initialValues,
		actions: FormikHelpers<typeof initialValues>,
	) => {
		actions.setSubmitting(true);
		console.log(values);
		actions.setSubmitting(false);
	};

	return (
		<>
			<Dialog open={false} onClose={handleClose} fullWidth maxWidth={"sm"}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ submitForm }) => (
						<Form>
							<DialogContent dividers style={{ maxHeight: "70vh", overflowY: "auto" }}>
								<CustomStepperBox>
									<Stepper
										activeStep={activeStep}
										alternativeLabel
										connector={<CustomStepConnector />}
									>
										{steps.map((label) => (
											<Step key={label}></Step>
										))}
									</Stepper>
								</CustomStepperBox>
								<Box textAlign={"center"} pt={3}>
									{activeStep === 0 && <GetStartedInitialScreen />}
									{activeStep === 1 && <CurrencyUpdateForm />}
									{activeStep === 2 && <CompanyUpdateForm />}
								</Box>
							</DialogContent>

							<DialogActions
								sx={{
									justifyContent: "space-between",
								}}
							>
								<Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
									Back
								</Button>

								{activeStep !== steps.length - 2 && (
									<Button variant="contained" onClick={handleNext}>
										Next
									</Button>
								)}
								{activeStep === steps.length - 2 && (
									<Button variant="contained" onClick={submitForm}>
										Finish
									</Button>
								)}
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</>
	);
};

export default GetStartedDialog;
