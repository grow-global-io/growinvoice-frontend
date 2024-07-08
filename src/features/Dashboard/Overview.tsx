import { Button, Grid, Typography } from "@mui/material";
import ExpensesSummary from "./ExpensesSummary";
import LottieNoDataFound from "@shared/components/LottieNoDataFound";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Overview = () => {
	const navigate = useNavigate();

	return (
		<>
			<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
				Overview
			</Typography>
			<ExpensesSummary />
			<Grid container spacing={2} mt={1}>
				<Grid item xs={12} textAlign={"right"}>
					<Button
						startIcon={<AddIcon />}
						variant="contained"
						color="primary"
						onClick={() => {
							navigate("/dashboard");
						}}
					>
						Add Widget
					</Button>
				</Grid>
				<Grid item xs={12}>
					<LottieNoDataFound message="No Dashboard Widgets Found" />
				</Grid>
			</Grid>
		</>
	);
};

export default Overview;
