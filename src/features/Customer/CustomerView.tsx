import { useCustomerControllerFindOne } from "@api/services/customer";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";
import Loader from "@shared/components/Loader";

const CustomerView = ({
	open,
	handleClose,
	customerId,
}: {
	open: boolean;
	handleClose: () => void;
	customerId: string;
}) => {
	const { data, isLoading } = useCustomerControllerFindOne(customerId, {
		query: {
			enabled: !!customerId && customerId !== "",
		},
	});

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<AppDialogHeader title="Customer Details" handleClose={handleClose} />
			<DialogContent>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							<Typography variant="inherit">
								<b>Name:</b> {data?.name}
							</Typography>
							<Typography variant="inherit">
								<b>Email:</b> {data?.email}
							</Typography>
							<Typography variant="inherit">
								<b>Phone:</b> {data?.phone}
							</Typography>
							<Typography
								variant="h5"
								sx={{
									textDecoration: "underline",
								}}
							>
								Billing Address:
							</Typography>
							<Typography variant="inherit">
								{data?.billingAddress?.address}, {data?.billingAddress?.city}
								{", "}
								{data?.billingAddress?.zip}
							</Typography>
							<Typography
								variant="h5"
								sx={{
									textDecoration: "underline",
								}}
							>
								Shipping Address:
							</Typography>
							<Typography variant="inherit">
								{data?.shippingAddress?.address}, {data?.shippingAddress?.city}
								{", "}
								{data?.shippingAddress?.zip}
							</Typography>
						</Box>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CustomerView;
