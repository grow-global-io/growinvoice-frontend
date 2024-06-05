import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import InvoiceListData from "../../data/InvoiceListData.json";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 90 },
	{ field: "invoiceNumber", headerName: "Invoice Number", width: 90 },
	{
		field: "invoiceDate",
		headerName: "Invoice Date",
		width: 150,
	},
	{
		field: "dueDate",
		headerName: "Due Date",
		width: 150,
	},
	{
		field: "status",
		headerName: "Status",
		width: 110,
	},
	{
		field: "paidStatus",
		headerName: "Paid Status",
		width: 110,
	},
	{
		field: "amountDue",
		headerName: "Amount Due",
		width: 110,
	},
];

export default function DataGridDemo() {
	const [invoiceData, setInvoiceData] = React.useState(InvoiceListData);

	return (
		<Box sx={{ height: "auto", width: "100%" }}>
			<DataGrid
				rows={invoiceData}
				columns={columns}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				pageSizeOptions={[5, 10, 25]}
				checkboxSelection
				disableColumnFilter
				disableRowSelectionOnClick
			/>
		</Box>
	);
}
