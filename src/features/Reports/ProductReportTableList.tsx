import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ProductReportsData from "./../../data/ProductReportsData.json";
import { Typography } from "@mui/material";
import { useReportsControllerGetProductReports } from "@api/services/reports";
import Loader from "@shared/components/Loader";
const expenseData = ProductReportsData;

const columns: GridColDef[] = [
	{
		field: "product",
		headerName: "Product Name",
		flex: 1,
		renderCell: (params) => {
			return <Typography>{params.value?.name}</Typography>;
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
const ProductReportTableList = ({ fromDate, toDate }: { fromDate: string; toDate: string }) => {
	const productReportDate = useReportsControllerGetProductReports({
		end: toDate,
		start: fromDate,
	});
	if (productReportDate.isLoading || productReportDate.isRefetching) {
		return <Loader />;
	}
	return (
		<Box>
			<DataGrid autoHeight rows={expenseData} columns={columns} />
		</Box>
	);
};

export default ProductReportTableList;
