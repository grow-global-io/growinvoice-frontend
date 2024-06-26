import {
	Box,
	Divider,
	Grid,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	Dialog,
	DialogContent,
	Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { Constants } from "@shared/constants";
import SettingFormHeading from "./SettingFormHeading";
import { RichTextEditor } from "@shared/components/FormFields/RichTextEditor";
import { CheckBoxFormField } from "@shared/components/FormFields/CheckBoxFormField";
import { useDialog } from "@shared/hooks/useDialog";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";
import { useState } from "react";

const CustomFormControlLabel = styled(FormControlLabel)(() => ({
	alignItems: "flex-start",
	margin: 0,
}));

const Invoices = () => {
	const { open, handleClickOpen, handleClose } = useDialog();

	const initialValues: { [key: string]: string } = {
		invoice_prefix: "",
		reminder1: "",
		reminder2: "",
		overdue_reminder1: "",
		overdue_reminder2: "",
		company_address_format: "",
		cus_bill_address_format: "",
		cus_ship_address_format: "",
	};

	const schema = yup.object().shape({
		invoice_prefix: yup.string().required("Invoice prefix is required"),
		reminder1: yup.number().required("Reminder1 is required"),
		reminder2: yup.number().required("Reminder2 is required"),
		overdue_reminder1: yup.number().required("Reminder1 is required"),
		overdue_reminder2: yup.number().required("Reminder2 is required"),
	});

	const handleSubmit = () => {};

	const [currentTemplate, setCurrentTemplate] = useState("");

	const templateList = [
		Constants.customImages.Template1,
		Constants.customImages.Template2,
		Constants.customImages.Template3,
		Constants.customImages.Template4,
	];

	return (
		<>
			<Box>
				<Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
					{(formik) => (
						<Form>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<Field
										name="invoice_prefix"
										label="Invoice Prefix"
										component={TextFormField}
										required={true}
										placeholder="Ex “INV”"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Box>
										<Typography variant="h5">Auto Archive</Typography>
										<Field name="auto_archive" label="YES" component={CheckBoxFormField} />
										<Typography variant="body1" lineHeight={1.2}>
											Enable this, If you wish to auto archive approved or rejected estimates after
											30 days.
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12}>
									<Field name="footer" label="Footer" component={RichTextEditor} required={true} />
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<SettingFormHeading
									heading="Due Notices"
									icon={Constants.customImages.OrangeNoticeIcon}
									text="Due reminders are sent to unpaid and partially paid invoices as reminders to the customer to pay the invoice before is due."
								/>
								<Grid item xs={6}>
									<Field
										name="reminder1"
										label="Reminder 1"
										component={TextFormField}
										required={true}
										placeholder="x days before due date"
										type="number"
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name="reminder2"
										label="Reminder 2"
										component={TextFormField}
										required={true}
										placeholder="x days before due date"
										type="number"
									/>
								</Grid>
								<SettingFormHeading
									heading="Overdue Notices"
									icon={Constants.customImages.redNoticeIcon}
									text="Due reminders are sent to unpaid and partially paid invoices as reminders to the customer to pay the invoice before is due."
								/>
								<Grid item xs={6}>
									<Field
										name="overdue_reminder1"
										label="Reminder 1"
										component={TextFormField}
										required={true}
										placeholder="x days before due date"
										type="number"
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name="overdue_reminder2"
										label="Reminder 2"
										component={TextFormField}
										required={true}
										placeholder="x days before due date"
										type="number"
									/>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<SettingFormHeading
									heading="Addresses"
									icon={Constants.customImages.BlueLocationIcon}
								/>
								<Grid item xs={12}>
									<Box
										onClick={() => {
											handleClickOpen();
											setCurrentTemplate("company_address_format");
										}}
									>
										<Typography variant="h5" mb={1} sx={{ cursor: "pointer" }}>
											Show Templates
										</Typography>
									</Box>
									<Field
										name="company_address_format"
										label="Company Address Format"
										component={RichTextEditor}
										required={true}
									/>
								</Grid>
								<Grid item xs={12}>
									<Box
										onClick={() => {
											handleClickOpen();
											setCurrentTemplate("cus_bill_address_format");
										}}
									>
										<Typography variant="h5" mb={1} sx={{ cursor: "pointer" }}>
											Show Templates
										</Typography>
									</Box>
									<Field
										name="cus_bill_address_format"
										label="Customer Billing Address Format"
										component={RichTextEditor}
										required={true}
									/>
								</Grid>
								<Grid item xs={12}>
									<Box
										onClick={() => {
											handleClickOpen();
											setCurrentTemplate("cus_ship_address_format");
										}}
									>
										<Typography variant="h5" mb={1} sx={{ cursor: "pointer" }}>
											Show Templates
										</Typography>
									</Box>
									<Field
										name="cus_ship_address_format"
										label="Customer Shipping Address Format"
										component={RichTextEditor}
										required={true}
									/>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<SettingFormHeading
									heading="Invoice Templates"
									icon={Constants.customImages.TemplateIcon}
								/>
								<Grid item xs={12}>
									<FormControl component="fieldset">
										<RadioGroup row aria-label="invoice-template" name="invoice-template-group">
											{templateList.map((item, index) => (
												<Grid item xs={12} sm={3} key={index}>
													<CustomFormControlLabel
														value={`template${index + 1}`}
														control={<Radio />}
														label={<img src={item} width="100%" alt={`Template ${index + 1}`} />}
													/>
												</Grid>
											))}
										</RadioGroup>
									</FormControl>
								</Grid>
							</Grid>
							<Dialog open={open} onClose={handleClose} fullWidth={true}>
								<AppDialogHeader title="Template Tags" handleClose={handleClose} />
								<Divider />
								<DialogContent>
									<Grid container>
										{Constants?.invoiceAddressExpressions?.map((field, index) => (
											<Grid item xs={12} key={`${field?.name}-${index}`} my={0}>
												<FormControlLabel
													control={<Checkbox />}
													label={field.label}
													checked={formik?.values?.[currentTemplate]?.includes(field.label)}
													onChange={(_, checked) => {
														if (checked) {
															formik?.setFieldValue(
																currentTemplate,
																`${formik?.values?.[currentTemplate]} ${field.label}`,
															);
														} else {
															formik?.setFieldValue(
																currentTemplate,
																formik?.values?.[currentTemplate]?.replace(field.label, ""),
															);
														}
													}}
												/>
											</Grid>
										))}
									</Grid>
								</DialogContent>
							</Dialog>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
};

export default Invoices;
