import { Typography, Box, Button, Drawer } from "@mui/material";
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
				<Box display={"flex"} justifyContent={"space-between"} mb={2}>
					<Typography variant="h4">Product Units</Typography>
					<Button variant="text" onClick={() => toggleDrawer(true)} startIcon={<AddIcon />}>
						Add Product Unit
					</Button>
				</Box>

				<ProductUnitTableList />

				<Drawer anchor="right" open={state.right} onClose={() => toggleDrawer(false)}>
					{list()}
				</Drawer>
			</Box>
		</>
	);
};

export default ProductUnit;
