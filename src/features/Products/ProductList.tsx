import { Button, Grid, Typography } from "@mui/material";
import ProductTableList from "./ProductTableList";

function ProductList() {
	return (
		<>
			<Grid container justifyContent={"space-between"}>
				<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
					Product
				</Typography>
				<Button variant="contained">
					+ Create new
				</Button>
			</Grid>
			<Grid container mt={2}>
				<Grid item xs={12}>
					<ProductTableList/>
				</Grid>
			</Grid>

		</>

	);
}

export default ProductList;
