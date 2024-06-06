import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import InvoiceListData from "../../data/InvoiceListData.json";
import { Typography } from "@mui/material";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", flex: 0.25 },
	{
		field: "invoiceNumber",
		headerName: "Invoice Number",
		flex: 1,

		renderCell: (params) => {
			return (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Typography variant="h6">{params.row.invoiceNumber}</Typography>;
				</Box>
			);
		},
	},
	{
		field: "invoiceDate",
		headerName: "Invoice Date",
		flex: 1,
	},
	{
		field: "dueDate",
		headerName: "Due Date",
		flex: 1,
	},
	{
		field: "status",
		headerName: "Status",
		flex: 1,
	},
	{
		field: "paidStatus",
		headerName: "Paid Status",
		flex: 1,
	},
	{
		field: "amountDue",
		headerName: "Amount Due",
		flex: 1,
	},
];

export default function DataGridDemo() {
	const invoiceData = InvoiceListData;

	return (
		<Box sx={{ height: "auto", width: "100%" }}>
			<DataGrid rows={invoiceData} columns={columns} />
		</Box>
	);
}
