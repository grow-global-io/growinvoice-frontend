import { CreateProductUnitDto } from "@api/services/models";
import {
	getProductunitControllerFindAllQueryKey,
	useProductunitControllerCreate,
} from "@api/services/productunit";
import { Box, Button } from "@mui/material";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { useAuthStore } from "@store/auth";
import { Field, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

const validationSchema: Yup.Schema<CreateProductUnitDto> = Yup.object().shape({
	name: Yup.string().required("Unit Name is required"),
	user_id: Yup.string().required("User id is required"),
});

const style = {

	bgcolor: "custom.lightBlue",

	bgcolor: "rgba(246, 250, 255, 1)",

	padding: 2,
	borderRadius: 1,
	mb: 1,
};

const CreateProductUnit = ({ handleClose }: { handleClose?: () => void }) => {
	const queryClient = useQueryClient();
	const { user } = useAuthStore();
	const createProductUnit = useProductunitControllerCreate();

	const initialValues: CreateProductUnitDto = {
		name: "",
		user_id: user?.id ?? "",
	};

	const handleSubmit = async (
		values: CreateProductUnitDto,
		action: FormikHelpers<CreateProductUnitDto>,
	) => {
		action.setSubmitting(true);
		await createProductUnit.mutateAsync({
			data: values,
		});
		action.resetForm();
		if (handleClose) handleClose();
		queryClient.invalidateQueries({
			queryKey: getProductunitControllerFindAllQueryKey(),
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
							<Field component={TextFormField} name="name" label="Unit Name" />
							<Box textAlign={"center"}>
								<Button
									variant="contained"
									onClick={() => {
										handleSubmit();
									}}
								>
									Create Product Unit
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

export default CreateProductUnit;
