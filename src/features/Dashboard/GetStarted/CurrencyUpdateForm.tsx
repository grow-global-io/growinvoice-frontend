import { Box, Typography } from "@mui/material";
import { Field } from "formik";
import { TextFormField } from "../../../shared/components/FormFields/TextFormField";

const CurrencyUpdateForm = () => {
	return (
		<Box>
			<Typography variant="h3">Choose Your Currency</Typography>
			<Typography variant="h5" px={5} mt={1} color={"secondary.dark"} fontWeight={500}>
				We need to verify your email address to ensure you have access to the application.
			</Typography>
			<Box>
				<Field name="currency" label="Currency" component={TextFormField} />
			</Box>
		</Box>
	);
};

export default CurrencyUpdateForm;
