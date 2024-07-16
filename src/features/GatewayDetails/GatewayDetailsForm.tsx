import { Box, DialogContent } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import AppDialogFooter from "@shared/components/Dialog/AppDialogFooter";
import * as yup from "yup";
import { AutocompleteField } from "@shared/components/FormFields/AutoComplete";
import { CheckBoxFormField } from "@shared/components/FormFields/CheckBoxFormField";
import { useAuthStore } from "@store/auth";
import { CreateGateWayDetailsDto, CreateGateWayDetailsDtoType } from "@api/services/models";
import {
	getGatewaydetailsControllerFindAllQueryKey,
	getGatewaydetailsControllerFindOneQueryKey,
	useGatewaydetailsControllerCreate,
	useGatewaydetailsControllerUpdate,
} from "@api/services/gatewaydetails";
import { stringToListDto } from "@shared/models/ListDto";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateGeteWayStore } from "@store/createGatewayStore";
import { useGatewaydetailsControllerFindAll } from "../../api/services/auth/gatewaydetails";

const GatewayDetailsForm = () => {
	const queryClient = useQueryClient();
	const { user } = useAuthStore();
	const { setOpenGateWayForm, editValues } = useCreateGeteWayStore.getState();
	const gateWayList = useGatewaydetailsControllerFindAll();
	const filterTypeOptions = () => {
		const typesInList = gateWayList.data?.map((item) => item.type) || [];
		return Object.values(CreateGateWayDetailsDtoType)
			.filter((type) => !typesInList.includes(type))
			.map(stringToListDto);
	};

	const initialValues: CreateGateWayDetailsDto = {
		type: editValues?.type ?? "Stripe",
		key: editValues?.key ?? "",
		secret: editValues?.secret ?? "",
		user_id: user?.id ?? "",
		enabled: editValues?.enabled ?? false,
	};

	const schema: yup.Schema<CreateGateWayDetailsDto> = yup.object({
		type: yup
			.string()
			.required("Type is required")
			.oneOf(Object.values(CreateGateWayDetailsDtoType), "Invalid Type"),
		key: yup.string().required("Name is required"),
		secret: yup.string().required("Unit is required"),
		user_id: yup.string().required("User id is required"),
		enabled: yup.boolean().required("User id is required"),
	});

	const createGatwayDetail = useGatewaydetailsControllerCreate();
	const updateGatwayDetail = useGatewaydetailsControllerUpdate();
	const handleSubmit = async (
		values: CreateGateWayDetailsDto,
		action: FormikHelpers<CreateGateWayDetailsDto>,
	) => {
		if (editValues) {
			await updateGatwayDetail.mutateAsync({
				id: editValues.id,
				data: values,
			});
			queryClient.invalidateQueries({
				queryKey: getGatewaydetailsControllerFindOneQueryKey(editValues.id ?? ""),
			});
		} else {
			await createGatwayDetail.mutateAsync({
				data: values,
			});
		}
		action.resetForm();
		setOpenGateWayForm(false);
		queryClient.invalidateQueries({
			queryKey: getGatewaydetailsControllerFindAllQueryKey(),
		});
	};

	return (
		<Box>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
				{(formik) => {
					return (
						<Form>
							<AppDialogHeader
								title="Add Gateway Details"
								handleClose={() => {
									setOpenGateWayForm(false);
								}}
							/>
							<DialogContent>
								<Field
									name="type"
									label="Type"
									component={AutocompleteField}
									options={filterTypeOptions()}
									isRequired={true}
								/>
								<Field name="key" label="Key" component={TextFormField} placeholder="Enter Title" />
								<Field
									name="secret"
									label="Secret Id"
									component={TextFormField}
									placeholder="Enter Title"
								/>
								<Field
									name="enabled"
									label="Enabled it"
									component={CheckBoxFormField}
									placeholder="Enter Title"
								/>
							</DialogContent>
							<AppDialogFooter
								onClickCancel={() => {
									setOpenGateWayForm(false);
								}}
								saveButtonText="Submit"
								saveButtonDisabled={!formik.isValid || formik.isSubmitting}
							/>
						</Form>
					);
				}}
			</Formik>
		</Box>
	);
};

export default GatewayDetailsForm;
