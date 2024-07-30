import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProductReportsData from "./../../data/CustomerReportsData.json";
import { Typography } from "@mui/material";
const expenseData = ProductReportsData;

const columns: GridColDef[] = [
	{
		field: "customerName",
		headerName: "Customer Name",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "invoiceDate",
		headerName: "Invoice Date",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "invoiceNumber",
		headerName: "Invoice Number",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "invoiceAmount",
		headerName: "Invoice Amount",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
];

const CustomerReportTalbeList = () => {
	return (
		<Box>
			<DataGrid autoHeight rows={expenseData} columns={columns} />
		</Box>
	);
};

export default CustomerReportTalbeList;
