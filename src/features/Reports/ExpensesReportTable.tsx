import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useReportsControllerGetExpenseReports } from "@api/services/reports";
import Loader from "@shared/components/Loader";
import { parseDateStringToFormat } from "@shared/formatter";



const columns: GridColDef[] = [
	{
		field: "category",
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
			return <Typography>{parseDateStringToFormat(params.value)}</Typography>;
		},
	},
	{
		field: "amount",
		headerName: "Expense Amount",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
];

const ExpensesReportTable = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const expensesReportDate = useReportsControllerGetExpenseReports({
		end: toDate,
		start: fromDate,
	});
	if (expensesReportDate.isLoading || expensesReportDate.isRefetching) {
		return <Loader />;
	}

	return (
		<Box>
			<DataGrid autoHeight rows={expensesReportDate?.data} columns={columns} />
		</Box>
	);
};

export default ExpensesReportTable;
