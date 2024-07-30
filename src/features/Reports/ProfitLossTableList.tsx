import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProductReportsData from "./../../data/ProfitLossData.json";
import { Button, Typography } from "@mui/material";

const expenseData = ProductReportsData;

const columns: GridColDef[] = [
	{
		field: "type",
		headerName: "Type",
		flex: 1,
		renderCell: (params) => {
			return (
				<Button
					variant="contained"
					sx={{
						bgcolor: params.value == "invoice" ? "custom.GreenBtnColor" : "custom.apiBtnBgColor",
						fontWeight: 300,
					}}
				>
					{params.value}
				</Button>
			);
		},
	},
	{
		field: "expenseID",
		headerName: "Expense ID",
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
		field: "category",
		headerName: "Category",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "amount",
		headerName: "Amount",
		flex: 1,
		renderCell: (params) => {
			const color = params.row.type === "invoice" ? "custom.GreenBtnColor" : "custom.apiBtnBgColor";
			return (
				<Typography color={color}>
					{" "}
					{params.row.type === "invoice" ? "+" : "-"} {params.value}
				</Typography>
			);
		},
	},
	{
		field: "date",
		headerName: "Date",
		flex: 1,
		renderCell: (params) => {
			return <Typography> {params.value}</Typography>;
		},
	},
	{
		field: "referenceNumber",
		headerName: "Reference Number",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
];
const ProfitLossTableList = () => {
	return (
		<Box>
			<DataGrid autoHeight rows={expenseData} columns={columns} />
		</Box>
	);
};

export default ProfitLossTableList;
