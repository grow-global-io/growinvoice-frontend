import { Box, Typography } from "@mui/material";
import ProductReportTableList from "./ProductReportTableList";
const ProductSales = () => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: { xs: "column", lg: "row" },
				}}
				mb={2}
			>
				<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"}>
					Product Report
				</Typography>
			</Box>
			<Box
				sx={{ width: { xs: "85vw", sm: "auto" }, overflowX: { xs: "scroll", sm: "visible" } }}
				my={2}
			>
				<ProductReportTableList />
			</Box>
		</>
	);
};

export default ProductSales;
