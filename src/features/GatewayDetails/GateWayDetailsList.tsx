import {
	getGatewaydetailsControllerFindAllQueryKey,
	useGatewaydetailsControllerFindAll,
	useGatewaydetailsControllerRemove,
} from "@api/services/gatewaydetails";
import { Box, Chip, Grid, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import Loader from "@shared/components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useConfirmDialogStore } from "@store/confirmDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateGeteWayStore } from "@store/createGatewayStore";

const GateWayDetailsList = () => {
	const queryClient = useQueryClient();
	const gateWayList = useGatewaydetailsControllerFindAll();
	const { handleOpen, cleanUp } = useConfirmDialogStore();
	const removePayment = useGatewaydetailsControllerRemove();
	const { updateGateWay } = useCreateGeteWayStore.getState();

	const columns: GridColDef[] = [
		{
			field: "type",
			headerName: "Type",
			minWidth: 150,
			flex: 1,
		},
		{
			field: "enabled",
			headerName: "Status",
			minWidth: 150,
			flex: 1,
			renderCell: (params) => {
				return (
					<Chip
						label={params.value ? "Enabled" : "Disabled"}
						color={params.value ? "success" : "error"}
					/>
				);
			},
		},
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			type: "actions",
			getActions: (params) => [
				<Tooltip title="Edit" key={params.row?.id}>
					<Box>
						<CustomIconButton
							src={EditIcon}
							onClick={() => {
								updateGateWay(params.row);
							}}
						/>
					</Box>
				</Tooltip>,

				<Tooltip title="Delete" key={params.row?.id}>
					<Box>
						<CustomIconButton
							key={params.row?.id}
							src={DeleteIcon}
							buttonType="delete"
							iconColor="error"
							onClick={async () => {
								handleOpen({
									title: "Delete GateWay Detail",
									message: "Are you sure you want to delete this GateWay Detail?",
									onConfirm: async () => {
										await removePayment.mutateAsync({ id: params.row.id });
										queryClient.invalidateQueries({
											queryKey: getGatewaydetailsControllerFindAllQueryKey(),
										});
									},
									onCancel: () => {
										cleanUp();
									},
									confirmButtonText: "Delete",
								});
							}}
						/>
						,
					</Box>
				</Tooltip>,
			],
		},
	];

	if (gateWayList?.isLoading || gateWayList?.isRefetching) {
		return <Loader />;
	}
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<DataGrid rows={gateWayList?.data ?? []} columns={columns} />
			</Grid>
		</Grid>
	);
};

export default GateWayDetailsList;
