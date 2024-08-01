import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useReportsControllerGetProductReports } from "@api/services/reports";
import Loader from "@shared/components/Loader";
import { convertUtcToFormat, currencyFormatter } from "@shared/formatter";

const columns: GridColDef[] = [
	{
		field: "product",
		headerName: "Product Name",
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
					{params.value?.name}
				</Typography>
			);
		},
	},
	{
		field: "invoiceDate",
		headerName: "Invoice Date",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{convertUtcToFormat(params.row?.invoice?.date)}</Typography>;
		},
	},
	{
		field: "invoiceNumber",
		headerName: "Invoice Number",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.row?.invoice?.invoice_number}</Typography>;
		},
	},
	{
		field: "invoiceAmount",
		headerName: "Invoice Amount",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{currencyFormatter(params.row?.invoice?.total)}</Typography>;
		},
	},
];
const ProductReportTableList = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const productReportDate = useReportsControllerGetProductReports(
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
	if (productReportDate.isLoading || productReportDate.isRefetching) {
		return <Loader />;
	}
	return (
		<Box>
			<DataGrid autoHeight rows={productReportDate?.data ?? []} columns={columns} />
		</Box>
	);
};

export default ProductReportTableList;
