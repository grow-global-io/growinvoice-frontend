import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductUnitTableList = () => {
	const row = [
		{
			id: 1,
			name: "unit",
		},
		{
			id: 2,
			name: "inch",
		},
	];

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Name",
			flex: 1,
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
		<DataGrid
			autoHeight
			rows={row}
			columns={columns}
			sx={{
				width: {
					sm: "100%",
					md: "100%",
					lg: "99%",
				},
			}}
		/>
	);
};

export default ProductUnitTableList;
