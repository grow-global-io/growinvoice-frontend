import { Divider, Drawer, Grid, IconButton, Typography } from "@mui/material";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { Constants } from "@shared/constants";
import CloseIcon from "@mui/icons-material/Close";

const PaymentDetailsDrawer = ({
	open,
	handleClose,
}: {
	open: boolean;
	handleClose: () => void;
}) => {
	return (
		<Drawer anchor="right" open={open} onClose={handleClose}>
			<Grid container justifyContent={"space-between"} p={2}>
				<Typography
					variant="h4"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					<img src={Constants.customImages.CustomerImg} alt="Invoice Icon" /> Add Payment Details
				</Typography>
				<IconButton
					sx={{
						color: "secondary.dark",
					}}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</Grid>
			<Divider />
			<PaymentDetailsForm handleClose={handleClose} />
		</Drawer>
	);
};

export default PaymentDetailsDrawer;
