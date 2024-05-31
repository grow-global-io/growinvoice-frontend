import { Button, Typography } from "@mui/material";
import ExpensesSummary from "./ExpensesSummary";
import GetStartedDialog from "./GetStartedDialog";
import { useDialog } from "../../shared/hooks/useDialog";
const Overview = () => {
	const { open, handleClickOpen, handleClose } = useDialog();
	return (
		<>
			<Button variant="contained"
				onClick={() => {
					handleClickOpen();
				}}
			>
				dialog
			</Button>
			<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
				Overview
			</Typography>
			<ExpensesSummary />
			<GetStartedDialog open={open} handleClose={handleClose} />
		</>
	);
};

export default Overview;
