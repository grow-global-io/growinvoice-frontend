import { Typography, Box, Button, Drawer } from "@mui/material";
import TaxTypeTableList from "./TaxTypeTableList";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import TaxTypeForm from "./TaxTypeForm";

const TaxType = () => {
	const [state, setState] = React.useState({ right: false });

	const toggleDrawer = (open: boolean) => {
		setState({ right: open });
	};

	const list = () => (
		<TaxTypeForm
			handleClose={() => {
				toggleDrawer(false);
			}}
		/>
	);

	return (
		<>
			<Box>
				<Box display={"flex"} justifyContent={"space-between"} mb={2}>
					<Typography variant="h4">Tax Type</Typography>
					<Button variant="text" onClick={() => toggleDrawer(true)} startIcon={<AddIcon />}>
						Add Taxes
					</Button>
				</Box>

				<TaxTypeTableList />

				<Drawer anchor="right" open={state.right} onClose={() => toggleDrawer(false)}>
					{list()}
				</Drawer>
			</Box>
		</>
	);
};

export default TaxType;
