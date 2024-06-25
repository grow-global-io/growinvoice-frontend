import { Typography, Box, Button, Drawer } from "@mui/material";
import HsnCodeTableList from "./HsnCodeTableList";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import HsnCodeForm from "./HsnCodeForm";

const HsnCode = () => {
	const [state, setState] = React.useState({ right: false });

	const toggleDrawer = (open: boolean) => {
		setState({ right: open });
	};

	const list = () => (
		<HsnCodeForm
			handleClose={() => {
				toggleDrawer(false);
			}}
		/>
	);

	return (
		<>
			<Box>
				<Box display={"flex"} justifyContent={"space-between"} mb={2}>
					<Typography variant="h4">HSN Code</Typography>
					<Button variant="text" onClick={() => toggleDrawer(true)} startIcon={<AddIcon />}>
						Add HSN
					</Button>
				</Box>

				<HsnCodeTableList />

				<Drawer anchor="right" open={state.right} onClose={() => toggleDrawer(false)}>
					{list()}
				</Drawer>
			</Box>
		</>
	);
};

export default HsnCode;
