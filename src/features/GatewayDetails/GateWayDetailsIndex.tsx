import { Button, Grid, Typography } from "@mui/material";
import GateWayDetailsList from "./GateWayDetailsList";
import AddIcon from "@mui/icons-material/Add";

const GateWayDetailsIndex = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6} display="flex" alignItems={"center"}>
				<Typography variant="h4" mb={3}>
					Gateway Details
				</Typography>
			</Grid>
			<Grid item xs={6} display="flex" justifyContent="flex-end" alignItems={"center"}>
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => {}}>
					Add Gateway Details
				</Button>
			</Grid>
			<Grid item xs={12}>
				<GateWayDetailsList />
			</Grid>
		</Grid>
	);
};

export default GateWayDetailsIndex;
