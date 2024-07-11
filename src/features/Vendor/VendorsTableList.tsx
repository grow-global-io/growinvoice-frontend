import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VendorsData from "./../../data/VendorsTableList.json";

const VendorsTableList = () => {
	const VendorsList = VendorsData;
	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "ID",
			flex: 1,
			minWidth: 150,
			renderCell: (params) => {
				return (
					<Typography variant="body1" color="secondary">
						{params.value}
					</Typography>
				);
			},
		},
		{
			field: "displayName",
			headerName: "Display Name",
			flex: 1,
			minWidth: 150,
			renderCell: (params) => {
				return (
					<Typography variant="body1" color="secondary">
						{params.value}
					</Typography>
				);
			},
		},
		{
			field: "contactName",
			headerName: "Contact Name",
			flex: 1,
			minWidth: 150,
			renderCell: (params) => {
				return <Typography>{params.value}</Typography>;
			},
		},
		{
			field: "expenses",
			headerName: "Expenses",
			flex: 1,
			minWidth: 150,
			renderCell: (params) => {
				return <Typography>{params.value}</Typography>;
			},
		},
		{
			field: "createdAt",
			headerName: "Created At",
			flex: 1,
			minWidth: 150,
			renderCell: (params) => {
				return <Typography>{params.value}</Typography>;
			},
		},
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			minWidth: 150,
			type: "actions",
			getActions: (params) => [
				<CustomIconButton key={params.row?.id} src={VisibilityOutlinedIcon} />,
			],
		},
	];

	return (
		<Box>
			<DataGrid autoHeight rows={VendorsList} columns={columns} />
		</Box>
	);
};

export default VendorsTableList;
