import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useReportsControllerGetExpenseReports } from "@api/services/reports";
import Loader from "@shared/components/Loader";
import { currencyFormatter, parseDateStringToFormat } from "@shared/formatter";

const ExpensesReportTable = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const expensesDate = useReportsControllerGetExpenseReports(
		{
			end: toDate,
			start: fromDate,
		},
		{
			query: {
				enabled: !!fromDate && !!toDate,
			},
		},
	);

	const rows = (expensesDate?.data?.length ?? 0) > 0 ? expensesDate?.data ?? [] : [];
	console.log(rows);

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
				return (
					<Typography>
						{currencyFormatter(params.value, params?.row?.currency?.short_code)}
					</Typography>
				);
			},
		},
	];

	if (expensesDate.isLoading || expensesDate.isRefetching) {
		return <Loader />;
	}

	return (
		<Box>
			<DataGrid autoHeight rows={rows} columns={columns} />
		</Box>
	);
};

export default ExpensesReportTable;
