import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { useReportsControllerGetProfitLossReports } from "@api/services/reports";
import Loader from "@shared/components/Loader";

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
		field: "invoice_number",
		headerName: "Invoice Number",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "expenseDate",
		headerName: "Category",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
	{
		field: "sub_total",
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
		field: "reference_number",
		headerName: "Reference Number",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value}</Typography>;
		},
	},
];
const ProfitLossTableList = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const profitLossReportData = useReportsControllerGetProfitLossReports({
		end: toDate,
		start: fromDate,
	});
	const combined = profitLossReportData?.data?.invoices.map((item, index) => {
		return { ...item, ...profitLossReportData?.data?.expenses[index] };
	  });

	if (profitLossReportData?.isLoading || profitLossReportData?.isFetching) { return <Loader /> }
	return (
		<Box>
			<DataGrid autoHeight rows={combined} columns={columns} />
		</Box>
	);
};

export default ProfitLossTableList;
