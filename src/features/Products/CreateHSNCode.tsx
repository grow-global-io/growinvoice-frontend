import {
	getHsncodeControllerFindAllQueryKey,
	useHsncodeControllerCreate,
} from "@api/services/hsncode";
import { CreateHSNCodeDto } from "@api/services/models";
import { Box, Button } from "@mui/material";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { useAuthStore } from "@store/auth";
import { Formik, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

const style = {
	bgcolor: "rgba(246, 250, 255, 1)",
	padding: 2,
	borderRadius: 1,
	mb: 1,
};

const CreateHSNCode = ({ handleClose }: { handleClose?: () => void }) => {
	const queryClient = useQueryClient();
	const { user } = useAuthStore();
	const createHSNCode = useHsncodeControllerCreate();
	const validationSchema: Yup.Schema<CreateHSNCodeDto> = Yup.object().shape({
		code: Yup.string().required("HSN Code is required"),
		tax: Yup.number()
			.required("Tax is required")
			.min(0, "Tax should be greater than 0")
			.max(100, "Tax should be less than 100"),
		user_id: Yup.string().required("User id is required"),
	});

	const initialValues: CreateHSNCodeDto = {
		code: "",
		tax: 0,
		user_id: user?.id ?? "",
	};

	const handleSubmit = async (
		values: CreateHSNCodeDto,
		action: FormikHelpers<CreateHSNCodeDto>,
	) => {
		action.setSubmitting(true);
		await createHSNCode.mutateAsync({
			data: values,
		});
		action.resetForm();
		if (handleClose) handleClose();
		queryClient.invalidateQueries({
			queryKey: getHsncodeControllerFindAllQueryKey(),
		});
		action.setSubmitting(false);
	};

	return (
		<Box sx={style}>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{({ handleSubmit }) => {
					return (
						<>
							<Field component={TextFormField} name="code" label="HSN Code" />
							<Field
								component={TextFormField}
								type="number"
								name="tax"
								label="Tax (in percentage)"
							/>
							<Box textAlign={"center"}>
								<Button
									variant="contained"
									onClick={() => {
										handleSubmit();
									}}
								>
									Create HSN Code
								</Button>
								{handleClose && (
									<Button variant="outlined" onClick={handleClose}>
										Close
									</Button>
								)}
							</Box>
						</>
					);
				}}
			</Formik>
		</Box>
	);
};

export default CreateHSNCode;
