import Box from "@mui/material/Box";
import {
	DataGrid,
	GridColDef,
	GridColumnHeaderParams,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import ProductListData from "../../data/ProductListData.json"
import { Typography } from "@mui/material";
import { Constants } from "@shared/constants";
const fontWeight = "500";
const HeaderStyle = (params: GridColumnHeaderParams) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Typography variant="h6" color="secondary.dark">
				{params.colDef.headerName}
			</Typography>
		</Box>
	);
};
const CellStyle = (params: GridRenderCellParams, color = "grey.500") => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Typography variant="h6" color={color} fontWeight={fontWeight}>
				{params.value}
			</Typography>
		</Box>
	);
};

const columns: GridColDef[] = [
	{
		field: "productId",
		headerName: "Product ID",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: (params) => CellStyle(params, "secondary.main"),
	},
	{
		field: "product",
		headerName: "Product",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
	{
		field: "unit",
		headerName: "Unit",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
    {
		field: "createdAt",
		headerName: "Created At",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	
	},
    	{
		field: "action",
		headerName: "Action",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: () => (
			<img src={Constants.customImages.Eye} alt="action" style={{ width: "40px" }} />
		),
	},
	

];

const ProductTableList = () => {
 
	const invoiceData = ProductListData;

	return (
		<Box>
			<DataGrid autoHeight rows={invoiceData} columns={columns}  checkboxSelection/>
		</Box>
	);
}

export default ProductTableList
