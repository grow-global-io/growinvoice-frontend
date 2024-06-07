import Box from "@mui/material/Box";
import {
	DataGrid,
	GridColDef,
	GridColumnHeaderParams,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import InvoiceListData from "../../data/InvoiceListData.json";
import { Typography } from "@mui/material";
import { Constants } from "@shared/constants";
const fontWeight = "500";
const HeaderStyle = (params: GridColumnHeaderParams) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Typography variant={"h6"} color={"secondary.dark"}>
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
		field: "invoiceNumber",
		headerName: "Invoice Number",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: (params) => CellStyle(params, "secondary.main"),
	},
	{
		field: "invoiceDate",
		headerName: "Invoice Date",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: CellStyle,
	},
	{
		field: "dueDate",
		headerName: "Due Date",
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
						bgcolor: "#121212",
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
		field: "paidStatus",
		headerName: "Paid Status",
		flex: 1,
		renderHeader: HeaderStyle,
		renderCell: (params) => {
			return (
				<Box sx={{ flex: 0.8 }}>
					<Box
						bgcolor={
							params.row.paidStatus == "Paid"
								? "rgba(145, 197, 97, 0.12)"
								: "rgba(214, 162, 67, 0.12)"
						}
						px={3}
						borderRadius={"40px"}
						py={"10px"}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						flex={1}
					>
						<img
							src={
								params.row.paidStatus == "Paid"
									? Constants.customImages.GreenCheck
									: Constants.customImages.UnpaidSymbol
							}
							width={"20px"}
							alt={params.row.paidStatus == "Paid" ? "greenCheck" : "UnpaidSymbol"}
						/>
						<Typography
							variant="h6"
							color={
								params.row.paidStatus == "Paid" ? "rgba(145, 197, 97, 1)" : "rgba(214, 162, 67, 1)"
							}
							ml={1}
							fontWeight={fontWeight}
						>
							{params.row.paidStatus}
						</Typography>
					</Box>
				</Box>
			);
		},
	},
	{
		field: "amountDue",
		headerName: "Amount Due",
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

export default function DataGridDemo() {
	const invoiceData = InvoiceListData;

	return (
		<Box>
			<DataGrid autoHeight rows={invoiceData} columns={columns} />
		</Box>
	);
}
