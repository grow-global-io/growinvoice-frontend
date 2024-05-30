import {
	Box,
	Button,
	Card,
	CardContent,
	IconButton,
	InputAdornment,
	Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextFormField } from "../../shared/components/FormFields/TextFormField";
import { useState } from "react";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BgImageSvg from "../../assets/bgpng.png";
import { useNavigate } from "react-router-dom";


const Register = () => {
	const navigation = useNavigate();

	const initialValues = {
		fullname: "",
		companyname: "",
		email: "",
		password: "",
		conpassword: "",
	};

	const schema = yup.object().shape({
		fullname: yup.string().email().required("Name is required"),
		companyname: yup.string().email().required("Company Name is required"),
		email: yup.string().email().required("Email is required"),
		password: yup.string().min(7, "Password is at least 7 characters").required("Password is required"),
		conpassword: yup.string()
			.oneOf([yup.ref('password')], 'Passwords must match')
			.required('Confirm Password is required')
	});

	const [hidePassword, setHidePassword] = useState(true);

	const [hideConPassword, setHideConPassword] = useState(true);

	const handleClickHidePassword = () => {
		setHidePassword(!hidePassword);
	};
	const handleClickHideConPassword = () => {
		setHideConPassword(!hideConPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleSubmit = () => {
	};

	return (
		<Box
			sx={{
				position: "relative",
				backgroundImage: `url(${BgImageSvg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				margin: 0,
				padding: 2,
				height: "95vh",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.2)", // black overlay with 50% transparency
					zIndex: 1,
				},
			}}
		>
			<Box sx={{ position: "relative", zIndex: 2, width: "30%"}}  >
				<Card sx={{ borderRadius: 4, p: 2, mb: 3, overflow: "auto" }} >
					<CardContent>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography variant='h1' sx={{ mb: 2 }}>
								Lets Start !
							</Typography>
							<Typography color="text.secondary" sx={{ mb: 2 }} variant="h4" fontWeight="400" textAlign={"center"}>
								Please create your account to continue with growinvoice.
							</Typography>
						</Box>
						<Box sx={{ mb: 2, mt: 2 }}>
							<Formik
								initialValues={initialValues}
								validationSchema={schema}
								onSubmit={handleSubmit}
							>
								{(formik) => {
									return (
										<Form>
											<Field name="fullname" component={TextFormField} label="Full Name:" required={true} />
											<Field name="companyname" component={TextFormField} label="Company Name:" required={true} />
											<Field name="email" component={TextFormField} label="Email:" required={true} />
											<Field
												name="password"
												type={hidePassword ? "password" : "text"}
												component={TextFormField}
												label="Password"
												required={true}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={handleClickHidePassword}
																onMouseDown={handleMouseDownPassword}
																edge="end"
															>
																{hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
											<Field
												name="conpassword"
												type={hideConPassword ? "password" : "text"}
												component={TextFormField}
												label="Confirm Password:"
												required={true}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={handleClickHideConPassword}
																onMouseDown={handleMouseDownPassword}
																edge="end"
															>
																{hideConPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
															</IconButton>
														</InputAdornment>
													),
												}}
											/>
											{/* <Box
												sx={{
													display: "flex",
													justifyContent: "flex-end",
													marginBottom: 1,
												}}
											>
												<ForgotPassword />
											</Box> */}
											<Box
												sx={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													flexDirection: "column",
													gap: 2,
												}}
											>
												<Button
													// disabled={!formik.isValid || formik.isSubmitting}
													type="submit"
													variant="contained"
													color="primary"
													sx={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														minWidth: 200,
													}}
												>
													Register
												</Button>
												<Button
													variant="outlined"
													color="primary"
													sx={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														minWidth: 200,
													}}
													onClick={() => { navigation("/login"); }}
												>
													login
												</Button>
											</Box>
										</Form>
									);
								}}
							</Formik>
						</Box>
					</CardContent>
				</Card>
			</Box>
			<Box>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{
						fontStyle: "italic",
						fontSize: 10,
						fontWeight: 700,
						textAlign: "center",
					}}
				>
					© GROW INVOICE - {new Date().getFullYear()}
				</Typography>
			</Box>
		</Box>
	);
};

export default Register;
