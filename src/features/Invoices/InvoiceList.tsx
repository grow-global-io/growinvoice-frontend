
import { Grid, Tab, Tabs, Typography } from "@mui/material";

import { Grid, Typography } from "@mui/material";

import InvoiceExpenses from "./InvoiceExpenses";
import DataGridDemo from "./InvoiceTableList";
import { useTabs } from "@shared/hooks/useTabs";
import TabPanel from "@shared/components/TabPanel";

const InvoiceList = () => {
	const { handleChange, tabValue } = useTabs("invoiceTab");
	return (
		<>
			<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
				Invoices
			</Typography>
			<InvoiceExpenses />
			<Grid container mt={2}>
				<Grid item xs={12}>

					<Tabs
						value={tabValue}
						onChange={handleChange}
						variant="standard"
						textColor="primary"
						indicatorColor="secondary"
						scrollButtons="auto"
					>
						<Tab
							label="Drafts"
							style={{ fontWeight: "bold", fontSize: 14, textTransform: "capitalize" }}
						/>
						<Tab
							label="Due Invoices"
							style={{ fontWeight: "bold", fontSize: 14, textTransform: "capitalize" }}
						/>
						<Tab
							label="Paid Invoices"
							style={{ fontWeight: "bold", fontSize: 14, textTransform: "capitalize" }}
						/>
						<Tab
							label="All Invoices"
							style={{ fontWeight: "bold", fontSize: 14, textTransform: "capitalize" }}
						/>
						<Tab
							label="Archived Invoices"
							style={{ fontWeight: "bold", fontSize: 14, textTransform: "capitalize" }}
						/>
					</Tabs>
				</Grid>
				<Grid item xs={12}>
					<TabPanel value={tabValue} index={0}>
						<Typography variant="h3" sx={{ paddingBottom: 2, textTransform: "capitalize" }}>
							Draft Invoices
						</Typography>
						<DataGridDemo />
					</TabPanel>

					<TabPanel value={tabValue} index={1}>
						<Typography variant="h3" sx={{ paddingBottom: 2, textTransform: "capitalize" }}>
							Due Invoices
						</Typography>
						<DataGridDemo />
					</TabPanel>

					<TabPanel value={tabValue} index={2}>
						<Typography variant="h3" sx={{ paddingBottom: 2, textTransform: "capitalize" }}>
							Paid Invoices
						</Typography>
						<DataGridDemo />
					</TabPanel>

					<TabPanel value={tabValue} index={3}>
						<Typography variant="h3" sx={{ paddingBottom: 2, textTransform: "capitalize" }}>
							All Invoices
						</Typography>
						<DataGridDemo />
					</TabPanel>

					<TabPanel value={tabValue} index={4}>
						<Typography variant="h3" sx={{ paddingBottom: 2, textTransform: "capitalize" }}>
							Archived Invoices
						</Typography>
						<DataGridDemo />
					</TabPanel>

					<DataGridDemo />

				</Grid>
			</Grid>
		</>
	);
};

export default InvoiceList;
