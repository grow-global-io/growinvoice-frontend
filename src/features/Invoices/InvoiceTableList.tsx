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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
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

export default function DataGridDemo() {
	const invoiceData = InvoiceListData;
	const navigate = useNavigate();
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
									? "custom.lightGreenColor"
									: "custom.lightOrangeColor"
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
								color={params.row.paidStatus == "Paid" ? "custom.darkGreen" : "custom.darkOrange"}
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
				<Box
					onClick={() => {
						navigate("/invoice/invoicedetail");
					}}
				>
					<VisibilityOutlinedIcon sx={{ fontSize: "30px" }} />
				</Box>
			),
		},
	];

	return (
		<Box>
			<DataGrid autoHeight rows={invoiceData} columns={columns} />
		</Box>
	);
}
