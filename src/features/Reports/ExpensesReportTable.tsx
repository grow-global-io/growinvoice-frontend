import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProductReportsData from "./../../data/ExpensesReportsData.json";
import { Typography } from "@mui/material";
import { useReportsControllerGetExpenseReports } from "@api/services/reports";
import Loader from "@shared/components/Loader";

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

const ExpensesReportTable = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const expensesDate = useReportsControllerGetExpenseReports({
		end: toDate,
		start: fromDate,
	});

	if (expensesDate.isLoading || expensesDate.isRefetching) {
		return <Loader />;
	}

	return (
		<Box>
			<DataGrid autoHeight rows={expenseData} columns={columns} />
		</Box>
	);
};

export default ExpensesReportTable;
