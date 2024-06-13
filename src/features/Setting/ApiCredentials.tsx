import { Box, Button, Grid, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
const ApiCredentials = () => {
	const initialValues = {
		token: "530d0fd116aaeec9cf3c4b4953fda6bcf3e7cc090104d6010b367431da",
	};
	const schema = yup.object().shape({});
	const handleSubmit = () => {};

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
									<Grid item sm={12}>
										<Typography variant="h4">API Token</Typography>
									</Grid>

									<Grid item xs={12} sm={9}>
										<Field name="token" component={TextFormField} />
									</Grid>
									<Grid item xs={12} sm={3} display={"flex"} alignItems={"center"}>
										<Button
											variant="contained"
											type="submit"
											sx={{ bgcolor: "custom.apiBtnBgColor" }}
										>
											Revoke Token
										</Button>
									</Grid>
									<Grid item sm={12} display={"flex"}>
										<Typography variant="body1" mt={{ md: -2, xs: 1 }}>
											To learn more, check the documentation:
											<Typography
												component="a"
												href="https://growinvoice-94ee0dd2031b.herokuapp.com/docs"
												color="custom.primary"
												sx={{ ml: 1, wordBreak: "break-all" }}
											>
												https://growinvoice-94ee0dd2031b.herokuapp.com/docs
											</Typography>
										</Typography>
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

export default ApiCredentials;
