import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	getQuotationControllerFindAllQueryKey,
	useQuotationControllerFindAll,
	useQuotationControllerRemove,
} from "@api/services/quotation";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/auth";
import { useConfirmDialogStore } from "@store/confirmDialog";
import { currencyFormatter, parseDateStringToFormat } from "@shared/formatter";
import { Quotation } from "@api/services/models";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import Loader from "@shared/components/Loader";
const QuotationTableList = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { user } = useAuthStore();
	const quationdata = useQuotationControllerFindAll();
	const { handleOpen, cleanUp } = useConfirmDialogStore();
	const removeQuotation = useQuotationControllerRemove();
	const columns: GridColDef<Quotation>[] = [
		{
			field: "quatation_number",
			headerName: "Quation Number",
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
			headerName: "Quotaion Date",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{parseDateStringToFormat(params.value)}</Typography>;
			},
		},
		{
			field: "expiry_at",
			headerName: "Expiry AT",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{parseDateStringToFormat(params.value)}</Typography>;
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
				<Tooltip title="View Quotation" key={params.row?.id}>
					<Box>
						<CustomIconButton
							onClick={() => {
								navigate(`/quotation/quotationdetail/${params.row.id}`);
							}}
							src={VisibilityIcon}
						/>
					</Box>
				</Tooltip>,
				<Tooltip title="Edit Quotation" key={params.row?.id}>
					<Box>
						<CustomIconButton
							onClick={() => {
								navigate(`/quotation/createquotation/${params.row.id}`);
							}}
							src={EditIcon}
						/>
					</Box>
				</Tooltip>,
				<Tooltip title="Delete Quotation" key={params.row?.id}>
					<Box>
						<CustomIconButton
							src={DeleteIcon}
							buttonType="delete"
							iconColor="error"
							onClick={async () => {
								handleOpen({
									title: "Delete Invoice",
									message: "Are you sure you want to delete this invoice?",
									onConfirm: async () => {
										await removeQuotation.mutateAsync({ id: params.row.id });
										queryClient.refetchQueries({
											queryKey: getQuotationControllerFindAllQueryKey(),
										});
									},
									onCancel: () => {
										cleanUp();
									},
									confirmButtonText: "Delete",
								});
							}}
						/>
					</Box>
				</Tooltip>,
			],
		},
	];

	if (quationdata.isLoading) return <Loader />;

	return (
		<Box>
			<DataGrid autoHeight rows={quationdata?.data} columns={columns} />
		</Box>
	);
};

export default QuotationTableList;
