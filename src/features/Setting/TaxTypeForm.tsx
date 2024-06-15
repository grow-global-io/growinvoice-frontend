import { Box, Grid, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDialog } from "@shared/hooks/useDialog";
import CreateTaxes from "@features/Products/CreateTaxes";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
const TaxTypeForm = ({ handleClose }: { handleClose: () => void }) => {
	const {
		// handleClickOpen: handleTaxesOpen,
		handleClose: handleTaxesClose,
		// open: openTaxesForm,
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
					<DescriptionOutlinedIcon /> New Tax
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
				<CreateTaxes handleClose={handleTaxesClose} />
			</Box>
		</Box>
	);
};

export default TaxTypeForm;
