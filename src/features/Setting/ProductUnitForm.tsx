import { Box, Grid, Typography, IconButton, Divider } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CreateProductUnit from "@features/Products/CreateProductUnit";
import { useDialog } from "@shared/hooks/useDialog";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";

const ProductUnitForm = ({ handleClose }: { handleClose: () => void }) => {
	const {
		// handleClickOpen: handleProductUnitOpen,
		handleClose: handleProductUnitClose,
		// open: openProductUnitForm,
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
					<NoteOutlinedIcon /> New Product Unit
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
				<CreateProductUnit handleClose={handleProductUnitClose} />
			</Box>
		</Box>
	);
};

export default ProductUnitForm;
