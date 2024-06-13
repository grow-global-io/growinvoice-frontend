import {
	Box,
	Divider,
	Grid,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
} from "@mui/material";
import { styled } from "@mui/system";
import Sidebar from "./Sidebar";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { Constants } from "@shared/constants";
import SettingFormHeading from "./SettingFormHeading";
import { RichTextEditor } from "@shared/components/FormFields/RichTextEditor";
import { CheckBoxFormField } from "@shared/components/FormFields/CheckBoxFormField";

const CustomFormControlLabel = styled(FormControlLabel)(() => ({
	alignItems: "flex-start",
	margin: 0,
}));

const Invoices = () => {
	const initialValues = {
		invoice_prefix: "",
		reminder1: "",
		reminder2: "",
		overdue_reminder1: "",
		overdue_reminder2: "",
		company_address_format: `
{company.name} <br/>
{company.billing.address_1}<br/>
{company.billing.address_2}<br/>
{company.billing.city},{company.billing.state}<br/>
{company.billing.country}<br/>
{company.billing.phone}<br/>
GST NO: {company.vat_number}`,
		cus_bill_address_format: `
{company.name}<br/>
{company.billing.address_1}<br/>
{company.billing.address_2}<br/>
{company.billing.city}, {company.billing.state}<br/>
{company.billing.country}<br/>
{company.billing.phone}<br/>
GST NO: {company.vat_number}`,
		cus_ship_address_format: `
{company.name}<br/>
{company.billing.address_1}<br/>
{company.billing.address_2}<br/>
{company.billing.city}, {company.billing.state}<br/>
{company.billing.country}<br/>
{company.billing.phone}<br/>
GST NO: {company.vat_number`,
	};

	const schema = yup.object().shape({
		invoice_prefix: yup.string().required("Invoice prefix is required"),
		reminder1: yup.number().required("Reminder1 is required"),
		reminder2: yup.number().required("Reminder2 is required"),
		overdue_reminder1: yup.number().required("Reminder1 is required"),
		overdue_reminder2: yup.number().required("Reminder2 is required"),
	});

	const handleSubmit = () => {};
	const templateList = [
		Constants.customImages.Template1,
		Constants.customImages.Template2,
		Constants.customImages.Template3,
		Constants.customImages.Template4,
	];

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
									<Grid item xs={12} sm={6}>
										<Field
											name="invoice_prefix"
											label="Invoice Prefix"
											component={TextFormField}
											required={true}
											placeholder={"Ex “INV”"}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box>
											<Typography variant="h5">Auto Archive</Typography>
											<Field name="auto_archive" label="YES" component={CheckBoxFormField} />
											<Typography variant="body1" lineHeight={1.2}>
												Enable this, If you wish to auto archive approved or rejected estimates
												after 30 days.
											</Typography>
										</Box>
										<Box my={2}>
											<Typography variant="h5">Auto Archive</Typography>
											<Field name="auto_archive" label="YES" component={CheckBoxFormField} />
											<Typography variant="body1" lineHeight={1.2}>
												Enable this, If you wish to auto archive approved or rejected estimates
												after 30 days.
											</Typography>
										</Box>
									</Grid>

									<Grid item xs={12} sm={12}>
										<Field
											name="footer"
											label="Footer"
											component={RichTextEditor}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<Divider />
									</Grid>

									<SettingFormHeading
										heading="Due Notices"
										icon={Constants.customImages.OrangeNoticeIcon}
										text="Due reminders are sent to unpaid and partially paid invoices as reminders to the customer to pay the invoice before is due."
									/>

									<Grid item xs={12} sm={6}>
										<Field
											name="reminder1"
											label="Reminder 1"
											component={TextFormField}
											required={true}
											placeholder={"x days before due date"}
											type="number"
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="reminder2"
											label="Reminder 2"
											component={TextFormField}
											required={true}
											placeholder={"x days before due date"}
											type="number"
										/>
									</Grid>

									<SettingFormHeading
										heading="Overdue Notices"
										icon={Constants.customImages.redNoticeIcon}
										text="Due reminders are sent to unpaid and partially paid invoices as reminders to the customer to pay the invoice before is due."
									/>

									<Grid item xs={12} sm={6}>
										<Field
											name="overdue_reminder1"
											label="Reminder 1"
											component={TextFormField}
											required={true}
											placeholder={"x days before due date"}
											type="number"
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											name="overdue_reminder2"
											label="Reminder 2"
											component={TextFormField}
											required={true}
											placeholder={"x days before due date"}
											type="number"
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<Divider />
									</Grid>

									<SettingFormHeading
										heading="Addresses"
										icon={Constants.customImages.BlueLocationIcon}
									/>

									<Grid item xs={12} sm={12}>
										<Field
											name="company_address_format"
											label="Company Address Format"
											component={RichTextEditor}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<Field
											name="cus_bill_address_format"
											label="Customer Billing Address Format"
											component={RichTextEditor}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<Field
											name="cus_ship_address_format"
											label="Customer Shipping Address Format"
											component={RichTextEditor}
											required={true}
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<Divider />
									</Grid>
									<SettingFormHeading
										heading="Invoice Templates"
										icon={Constants.customImages.TemplateIcon}
									/>

									<Grid item xs={12} sm={12}>
										<FormControl component="fieldset">
											<RadioGroup row aria-label="invoice-template" name="invoice-template-group">
												{templateList.map((item, index) => (
													<Grid item xs={12} sm={3} key={index}>
														<CustomFormControlLabel
															value={`template${index + 1}`}
															control={<Radio />}
															label={
																<img src={item} width={"100%"} alt={`Template ${index + 1}`} />
															}
														/>
													</Grid>
												))}
											</RadioGroup>
										</FormControl>
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

export default Invoices;
