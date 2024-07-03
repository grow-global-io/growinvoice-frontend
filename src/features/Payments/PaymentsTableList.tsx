import { usePaymentsControllerFindAll } from "@api/services/payments";
import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loader from "@shared/components/Loader";
import NoDataFound from "@shared/components/NoDataFound";
import { currencyFormatter, parseDateStringToFormat } from "@shared/formatter";
import { useAuthStore } from "@store/auth";

const PaymentsTableList = () => {
	const { user } = useAuthStore();
	const paymentsList = usePaymentsControllerFindAll();
	const columns: GridColDef[] = [
		{
			field: "paymentDate",
			headerName: "Payment Date",
			flex: 1,
			renderCell: (params) => {
				return (
					<Typography variant="body1" color="secondary">
						{parseDateStringToFormat(params.value)}
					</Typography>
				);
			},
		},
		{
			field: "amount",
			headerName: "Payment Amount",
			flex: 1,
			renderCell: (params) => {
				return (
					<Chip
						label={`${currencyFormatter(params.value, user?.currency?.short_code ?? "USD")}`}
						style={{
							color: "custom.productTblColor",
							backgroundColor: "custom.productTbleBgColor",
							fontWeight: "bold",
						}}
					/>
				);
			},
		},
		{
			field: "paymentMethod",
			headerName: "Payment Method",
			flex: 1,
			renderCell: (params) => {
				return (
					<Typography textTransform={"capitalize"}>
						{params.row?.paymentDetails?.paymentType}
					</Typography>
				);
			},
		},
		{
			field: "invoiceNumber",
			headerName: "Invoice Number",
			flex: 1,
			renderCell: (params) => {
				return (
					<Typography textTransform={"capitalize"}>
						{params.row?.invoice?.invoice_number}
					</Typography>
				);
			},
		},
	];

	if (paymentsList.isLoading || paymentsList.isFetching || paymentsList?.isRefetching) {
		return <Loader />;
	}

	if (paymentsList?.data === undefined) {
		return <NoDataFound message="No Payments Found" />;
	}

	return (
		<Box>
			<DataGrid autoHeight rows={paymentsList?.data ?? []} columns={columns} />
		</Box>
	);
};

export default PaymentsTableList;
