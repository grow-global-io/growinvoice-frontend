import { Dialog, DialogContent, Typography } from "@mui/material";
import AppDialogHeader from "../../shared/components/Dialog/AppDialogHeader";

const StartUp = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
			<AppDialogHeader title="Test" handleClose={handleClose} />
			<DialogContent>
				<Typography variant="h6">This is a test dialog</Typography>
			</DialogContent>
		</Dialog>
	);
};

export default StartUp;
