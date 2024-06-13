import Sidebar from "./Sidebar";
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
				<Typography variant="h3" textTransform={"capitalize"} mb={3}>
					Setting
				</Typography>
			</Box>
			<Box
				display="flex"
				sx={{ flexDirection: { xs: "column", lg: "row" } }}
				height={{ xs: "auto", lg: "75vh" }}
			>
				<Sidebar />
				<Box flex={1} padding={{ xs: 0, sm: 2 }} sx={{ overflowY: "scroll" }}>
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
			</Box>
		</>
	);
};

export default HsnCode;
