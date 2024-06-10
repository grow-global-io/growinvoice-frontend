import Box from "@mui/material/Box";
import {
	DataGrid,
	GridColDef,
	GridColumnHeaderParams,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import CustomerListData from "../../data/CustomerListData.json";
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
		field: "customerId",
		headerName: "Customer Id",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: (params) => CellStyle(params, "secondary.main"),
	},
	{
		field: "displayName",
		headerName: "Display Name",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
	{
		field: "contactEmail",
		headerName: "Contact Email",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
	{
		field: "invoice",
		headerName: "Invoice",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},

	{
		field: "amountDue",
		headerName: "Amount Due",
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

const CustomerTableList = () => {
	const CustomerData = CustomerListData;

	return (
		<Box>
			<DataGrid autoHeight rows={CustomerData} columns={columns} checkboxSelection />
		</Box>
	);
};

export default CustomerTableList;
