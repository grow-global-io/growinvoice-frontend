import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip, Typography } from "@mui/material";
import {
	getProductControllerFindAllQueryKey,
	useProductControllerFindAll,
	useProductControllerRemove,
} from "@api/services/product";
import Loader from "@shared/components/Loader";
import { timeAgo } from "@shared/formatter";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useCreateProductStore } from "@store/createProductStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "@tanstack/react-query";

const ProductTableList = () => {
	const queryClient = useQueryClient();
	const { updateProduct } = useCreateProductStore.getState();
	const productList = useProductControllerFindAll();
	const removeProduct = useProductControllerRemove();

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Product",
			flex: 1,
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
			renderCell: (params) => {
				return <Typography textTransform={"capitalize"}>{params?.row?.unit?.name}</Typography>;
			},
		},
		{
			field: "price",
			headerName: "Price",
			flex: 1,
			renderCell: (params) => {
				return (
					<Chip
						label={`${params.row.currency.symbol} ${params.value}`}
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
			field: "createdAt",
			headerName: "Created At",
			flex: 1,
			renderCell: (params) => {
				return <Typography>{timeAgo(params.value)}</Typography>;
			},
		},
		{
			field: "action",
			headerName: "Action",
			flex: 1,
			type: "actions",
			getActions: (params) => [
				<CustomIconButton
					key={params.row?.id}
					src={EditIcon}
					onClick={() => {
						updateProduct(params.row);
					}}
				/>,
				<CustomIconButton
					key={params.row?.id}
					src={DeleteIcon}
					buttonType="delete"
					iconColor="error"
					onClick={async () => {
						await removeProduct.mutateAsync({ id: params.row.id });
						queryClient.invalidateQueries({
							queryKey: getProductControllerFindAllQueryKey(),
						});
					}}
				/>,
			],
		},
	];

	if (productList.isLoading || productList.isRefetching || productList.isFetching)
		return <Loader />;
	return (
		<Box>
			<DataGrid autoHeight rows={productList?.data} columns={columns} />
			{/* <DataGrid autoHeight rows={productList?.data} columns={columns} /> */}
		</Box>
	);
};

export default ProductTableList;
