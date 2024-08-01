import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useReportsControllerGetCustomerReports } from "@api/services/reports";
import { convertUtcToFormat, currencyFormatter, parseDateStringToFormat } from "@shared/formatter";
import Loader from "@shared/components/Loader";
import { useAuthStore } from "@store/auth";

const CustomerReportTalbeList = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const { user } = useAuthStore();
	const customerReportDate = useReportsControllerGetCustomerReports(
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

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Customer Name",
			flex: 1,
			renderCell: (params) => {
				return (
					<Typography
						sx={{
							color: "primary.main",
							cursor: "pointer",
							fontWeight: "bold",
						}}
					>
						{params?.row?.customer?.name}
					</Typography>
				);
			},
		},
		{
			field: "date",
			headerName: "Invoice Date",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{convertUtcToFormat(params?.value)}</Typography>;
			},
		},
		{
			field: "invoice_number",
			headerName: "Invoice Number",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{params?.value}</Typography>;
			},
		},
		{
			field: "total",
			headerName: "Invoice Amount",
			flex: 1,
			renderCell: (params) => {
				return (
					<Typography>{currencyFormatter(params?.value, user?.currency?.short_code)}</Typography>
				);
			},
		},
	];

	if (customerReportDate?.isLoading || customerReportDate?.isFetching) {
		return <Loader />;
	}
	return (
		<Box>
			<DataGrid autoHeight rows={customerReportDate?.data ?? []} columns={columns} />
		</Box>
	);
};

export default CustomerReportTalbeList;
