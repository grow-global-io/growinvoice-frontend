import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { Chip, Typography } from "@mui/material";
import { useProductControllerFindAll } from "@api/services/product";
import Loader from "@shared/components/Loader";
import { timeAgo } from "@shared/formatter";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";

const HeaderStyle = (params: GridColumnHeaderParams) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Typography variant="h6" color="secondary.dark">
				{params.colDef.headerName}
			</Typography>
		</Box>
	);
};
const ProductTableList = () => {
	const productList = useProductControllerFindAll();

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Product",
			flex: 1,
			renderHeader: HeaderStyle,
			renderCell: (params) => {
				return (
					<Typography variant="h6" color="secondary">
						{params.value}
					</Typography>
				);
			},
		},
		{
			field: "unit",
			headerName: "Unit",
			flex: 1,
			renderHeader: HeaderStyle,
			renderCell: (params) => {
				return <Typography textTransform={"capitalize"}>{params?.row?.unit?.name}</Typography>;
			},
		},
		{
			field: "price",
			headerName: "Price",
			flex: 1,
			renderHeader: HeaderStyle,
			renderCell: (params) => {
				return (
					<Chip
						label={`${params.row.currency.symbol} ${params.value}`}
						style={{ color: "#32C371", backgroundColor: "#D6F3E2", fontWeight: "bold" }}
					/>
				);
			},
		},
		{
			field: "createdAt",
			headerName: "Created At",
			flex: 1,
			renderHeader: HeaderStyle,
			renderCell: (params) => {
				return <Typography>{timeAgo(params.value)}</Typography>;
			},
		},
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			type: "actions",
			renderHeader: HeaderStyle,
			getActions: (params) => [
				<CustomIconButton key={params.row?.id} src={EditIcon} onClick={() => {}} />,
			],
		},
	];

	if (productList.isLoading || productList.isRefetching || productList.isFetching)
		return <Loader />;
	return (
		<Box>
			<DataGrid autoHeight rows={productList?.data} columns={columns} />
		</Box>
	);
};

export default ProductTableList;
