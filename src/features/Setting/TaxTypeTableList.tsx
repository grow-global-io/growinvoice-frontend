import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaxTypeTableList = () => {
	const row = [
		{
			id: 1,
			percent: 8,
		},
		{
			id: 2,
			percent: 13,
		},
	];

	const columns: GridColDef[] = [
		{
			field: "percent",
			headerName: "Percent",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{params.value}</Typography>;
			},
		},
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			type: "actions",
			getActions: (params) => [
				<CustomIconButton key={params.row?.id} src={EditIcon} />,
				<CustomIconButton
					key={params.row?.id}
					src={DeleteIcon}
					buttonType="delete"
					iconColor="error"
				/>,
			],
		},
	];
	return (
		<Box width={{ xs: "85vw", sm: "100%" }}>
			<DataGrid autoHeight rows={row} columns={columns} />
		</Box>
	);
};

export default TaxTypeTableList;
