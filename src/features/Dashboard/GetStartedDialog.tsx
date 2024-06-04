import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Step,
	StepConnector,
	StepLabel,
	Stepper,
	Typography,
	stepConnectorClasses,
	styled,
} from "@mui/material";
import GreetImg from "./../../assets/img/greet-img.png";
import React from "react";
import { useAuthControllerStatus } from "../../api/services/auth/auth";

const GetStartedDialog = ({ open, handleClose }: { open: boolean; handleClose?: () => void }) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set<number>());

	const getAuth = useAuthControllerStatus();
	console.log(getAuth?.isLoading);
	const isStepOptional = (step: number) => {
		return step === 1;
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

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
			margin: "0 25%",
			backgroundColor: theme.palette.grey[100],
			borderRadius: 1,
		},
	}));
	const CustomStepperBox = styled(Box)(() => ({
		width: "60%", // Adjust the width as needed to control the spacing
		margin: "auto",
	}));

	return (
		<>
			<Dialog open={false} onClose={handleClose} fullWidth maxWidth={"sm"}>
				<DialogContent>
					<CustomStepperBox>
						<Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector />}>
							{steps.map((label) => (
								<Step key={label}></Step>
							))}
						</Stepper>
					</CustomStepperBox>
					<Box textAlign={"center"} py={3}>
						{activeStep === 0 && (
							<Box>
								<img src={GreetImg} width={"230px"} />
								<Typography variant="h3">Almost There! Just a Few Details</Typography>
								<Typography variant="h5" fontWeight={500}>
									Just enter a few details like currency and company information to start creating
									your invoices in no time!
								</Typography>
							</Box>
						)}
						{activeStep === 1 && (
							<Box textAlign={"center"} py={2}>
								<Typography
									variant="h3"
									textAlign={"center"}
									color={"secondary.dark"}
									fontWeight={600}
								>
									Verification
								</Typography>
								<Typography
									variant="h5"
									textAlign={"center"}
									px={"15%"}
									mt={1}
									color={"secondary.dark"}
									fontWeight={500}
								>
									We need to verify your email address to ensure you have access to the application.
								</Typography>
								<Button variant="contained" onClick={handleNext} sx={{ mt: 3 }}>
									Next
								</Button>
							</Box>
						)}
					</Box>
				</DialogContent>
				<DialogActions
					sx={{
						justifyContent: "space-between",
					}}
				>
					<Button variant="outlined" onClick={handleBack}>
						Back
					</Button>
					<Button variant="contained" onClick={handleNext}>
						Next
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default GetStartedDialog;
