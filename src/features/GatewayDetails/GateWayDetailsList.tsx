import { useGatewaydetailsControllerFindAll } from "@api/services/gatewaydetails";
import { Box, Chip, Grid, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import Loader from "@shared/components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const GateWayDetailsList = () => {
	const gateWayList = useGatewaydetailsControllerFindAll();

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
						<CustomIconButton src={EditIcon} onClick={() => {}} />
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
								// handleOpen({
								// 	title: "Delete Details",
								// 	message: "Are you sure you want to delete this payment?",
								// 	onConfirm: async () => {
								// 		await removeDetails.mutateAsync({
								// 			id: params.row.id,
								// 		});
								// 		paymentDetails.refetch();
								// 	},
								// 	onCancel: () => {
								// 		cleanUp();
								// 	},
								// 	confirmButtonText: "Delete",
								// });
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
