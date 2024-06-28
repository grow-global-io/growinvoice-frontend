import { Typography, Box, Button, Drawer, Grid } from "@mui/material";
import ProductUnitTableList from "./ProductUnitTableList";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import ProductUnitForm from "./ProductUnitForm";

const ProductUnit = () => {
	const [state, setState] = React.useState({ right: false });

	const toggleDrawer = (open: boolean) => {
		setState({ right: open });
	};

	const list = () => (
		<ProductUnitForm
			handleClose={() => {
				toggleDrawer(false);
			}}
		/>
	);

	return (
		<>
			<Box>
				{/* <Box display={"flex"} justifyContent={"space-between"} mb={2}>
					<Typography variant="h4">Product Units</Typography>
					<Button variant="text" onClick={() => toggleDrawer(true)} startIcon={<AddIcon />}>
						Add Product Unit
					</Button>
				</Box> */}
				<Grid container spacing={2} mb={2}>
					<Grid item xs={12} md={6}>
						<Typography variant="h4">Product Units</Typography>
					</Grid>
					<Grid item xs={12} md={6} display={"flex"} justifyContent={"end"}>
						<Button variant="text" onClick={() => toggleDrawer(true)} startIcon={<AddIcon />}>
							Add Product Unit
						</Button>
					</Grid>
					<Grid item xs={12}>
						<ProductUnitTableList />
					</Grid>
				</Grid>

				<Drawer anchor="right" open={state.right} onClose={() => toggleDrawer(false)}>
					{list()}
				</Drawer>
			</Box>
		</>
	);
};

export default ProductUnit;
