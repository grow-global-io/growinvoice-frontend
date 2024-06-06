import { Grid, Typography } from "@mui/material";
import InvoiceExpenses from "./InvoiceExpenses";
import DataGridDemo from "./InvoiceTableList";

const InvoiceList = () => {
	return (
		<>
			<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
				Invoices
			</Typography>
			<InvoiceExpenses />
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<DataGridDemo />
				</Grid>
			</Grid>
		</>
	);
};

export default InvoiceList;
