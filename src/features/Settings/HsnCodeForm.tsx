import { Box, Grid, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDialog } from "@shared/hooks/useDialog";
import CreateHSNCode from "@features/HSNCode/CreateHSNCode";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
const HsnCodeForm = ({ handleClose }: { handleClose: () => void }) => {
	const {
		// handleClickOpen: handleHsnCodeOpen,
		handleClose: handleHsnCodeClose,
		// open: openHsnCodeForm,
	} = useDialog();

	return (
		<Box sx={{ width: { sm: "400px" } }} role="presentation" p={2}>
			<Grid container justifyContent={"space-between"}>
				<Typography
					variant="h4"
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}
				>
					<ContentPasteOutlinedIcon /> New HSN Code
					{/* <img src={Constants.customImages.QuotationIcon} alt="Invoice Icon" /> New Quotation */}
				</Typography>
				<IconButton
					sx={{
						color: "secondary.dark",
					}}
					onClick={() => handleClose()}
				>
					<CloseIcon />
				</IconButton>
			</Grid>
			<Divider />
			<Box sx={{ mb: 2, mt: 2 }}>
				<CreateHSNCode handleClose={handleHsnCodeClose} />
			</Box>
		</Box>
	);
};

export default HsnCodeForm;
