import Box from "@mui/material/Box";
import {
	DataGrid,
	GridColDef,
	GridColumnHeaderParams,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import QuotationListData from "../../data/QuotationListData.json";
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
		field: "quotationNumber",
		headerName: "Quotation Number",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: (params) => CellStyle(params, "secondary.main"),
	},
	{
		field: "date",
		headerName: "Date",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
	{
		field: "expiryDate",
		headerName: "Expiry Date",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
	{
		field: "customer",
		headerName: "Customer",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
	{
		field: "status",
		headerName: "Status",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: (params) => {
			return (
				<Box
					sx={{
						bgcolor: "custom.tableBtnBgColor",
						borderRadius: 1,
						px: 5,
						py: 1,
					}}
				>
					<Typography variant="h6" color={"primary.contrastText"} fontWeight={fontWeight}>
						{params.row.status}
					</Typography>
				</Box>
			);
		},
	},
	{
		field: "total",
		headerName: "Total",
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

const QuotationTableList = () => {
	const QuotationData = QuotationListData;

	return (
		<Box>
			<DataGrid autoHeight rows={QuotationData} columns={columns} checkboxSelection />
		</Box>
	);
};

export default QuotationTableList;
