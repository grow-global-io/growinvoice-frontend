import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Constants } from "@shared/constants";
import {
	getInvoiceControllerFindAllQueryKey,
	getInvoiceControllerFindDueInvoicesQueryKey,
	getInvoiceControllerFindPaidInvoicesQueryKey,
	useInvoiceControllerFindDueInvoices,
	useInvoiceControllerRemove,
} from "@api/services/invoice";
import Loader from "@shared/components/Loader";
import { Invoice } from "@api/services/models";
import { currencyFormatter, parseDateStringToFormat } from "@shared/formatter";
import { useAuthStore } from "@store/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirmDialogStore } from "@store/confirmDialog";
import { useQueryClient } from "@tanstack/react-query";

const InvoiceTableDueList = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { user } = useAuthStore();
	const invoiceData = useInvoiceControllerFindDueInvoices();
	const { handleOpen, cleanUp } = useConfirmDialogStore();
	const removeInvoice = useInvoiceControllerRemove();

	const columns: GridColDef<Invoice>[] = [
		{
			field: "invoice_number",
			headerName: "Invoice Number",
			flex: 1,
			renderCell: (params) => {
				return (
					<Typography variant="h6" color={"secondary"}>
						{params.value}
					</Typography>
				);
			},
		},
		{
			field: "date",
			headerName: "Invoice Date",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{parseDateStringToFormat(params.value)}</Typography>;
			},
		},
		{
			field: "due_date",
			headerName: "Due Date",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{parseDateStringToFormat(params.value)}</Typography>;
			},
		},
		{
			field: "paid_status",
			headerName: "Paid Status",
			flex: 1,
			renderCell: (params) => {
				return (
					<Box sx={{ flex: 0.8 }}>
						<Box
							bgcolor={
								params.row.paid_status == "Paid"
									? "custom.lightGreenColor"
									: "custom.lightOrangeColor"
							}
							px={3}
							borderRadius={"40px"}
							py={"10px"}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							flex={1}
						>
							<img
								src={
									params.row.paid_status == "Paid"
										? Constants.customImages.GreenCheck
										: Constants.customImages.UnpaidSymbol
								}
								width={"20px"}
								alt={params.row.paid_status == "Paid" ? "greenCheck" : "UnpaidSymbol"}
							/>
							<Typography
								variant="h6"
								color={params.row.paid_status == "Paid" ? "custom.darkGreen" : "custom.darkOrange"}
								ml={1}
							>
								{params.row.paid_status}
							</Typography>
						</Box>
					</Box>
				);
			},
		},
		{
			field: "total",
			headerName: "Total",
			flex: 1,
			renderCell: (params) => {
				return (
					<Typography>{currencyFormatter(params.value, user?.currency?.short_code)}</Typography>
				);
			},
		},

		{
			field: "action",
			headerName: "Action",
			flex: 1,
			type: "actions",
			getActions: (params) => [
				<CustomIconButton
					key={params.row.id}
					onClick={() => {
						console.log("View Invoice");
					}}
					src={VisibilityIcon}
				/>,
				<CustomIconButton
					key={params.row.id}
					onClick={() => {
						navigate(`/invoice/createinvoice/${params.row.id}`);
					}}
					src={EditIcon}
				/>,
				<CustomIconButton
					key={params.row?.id}
					src={DeleteIcon}
					buttonType="delete"
					iconColor="error"
					onClick={async () => {
						handleOpen({
							title: "Delete Product",
							message: "Are you sure you want to delete this product?",
							onConfirm: async () => {
								await removeInvoice.mutateAsync({ id: params.row.id });
								queryClient.refetchQueries({
									queryKey: getInvoiceControllerFindAllQueryKey(),
								});
								queryClient.refetchQueries({
									queryKey: getInvoiceControllerFindDueInvoicesQueryKey(),
								});
								queryClient.refetchQueries({
									queryKey: getInvoiceControllerFindPaidInvoicesQueryKey(),
								});
							},
							onCancel: () => {
								cleanUp();
							},
							confirmButtonText: "Delete",
						});
					}}
				/>,
			],
		},
	];

	if (invoiceData.isLoading) return <Loader />;

	return (
		<Box>
			<DataGrid autoHeight rows={invoiceData?.data} columns={columns} />
		</Box>
	);
};

export default InvoiceTableDueList;
