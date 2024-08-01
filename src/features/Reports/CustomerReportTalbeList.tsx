import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useReportsControllerGetCustomerReports } from "@api/services/reports";
import { parseDateStringToFormat } from "@shared/formatter";
import Loader from "@shared/components/Loader";

const columns: GridColDef[] = [
	{
		field: "name",
		headerName: "Customer Name",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params?.value}</Typography>;
		},
	},
	{
		field: "date",
		headerName: "Invoice Date",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{parseDateStringToFormat(params?.value)}</Typography>;
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
		field: "sub_total",
		headerName: "Invoice Amount",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params?.value}</Typography>;
		},
	},
];

const CustomerReportTalbeList = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const customerReportDate = useReportsControllerGetCustomerReports({
		end:toDate,
		start:fromDate,
	});
   if (customerReportDate?.isLoading || customerReportDate?.isFetching) { return <Loader /> }
	return (
		<Box>
			<DataGrid autoHeight rows={customerReportDate?.data} columns={columns} />
		</Box>
	);
};

export default CustomerReportTalbeList;
