import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProductReportsData from "./../../data/ExpensesReportsData.json";
import { Typography } from "@mui/material";

const expenseData = ProductReportsData;

const columns: GridColDef[] = [
	{
		field: "expenseCategory",
		headerName: "Expense Category",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "expenseDate",
		headerName: "Expense Date",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "expenseAmount",
		headerName: "Expense Amount",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
];

const ExpensesReportTable = () => {
	return (
		<Box>
			<DataGrid autoHeight rows={expenseData} columns={columns} />
		</Box>
	);
};

export default ExpensesReportTable;
