import { Typography } from "@mui/material";
import ExpensesSummary from "./ExpensesSummary";
const Overview = () => {
	return (
		<>
			<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
				Overview
			</Typography>
			<ExpensesSummary />
		</>
	);
};

export default Overview;
