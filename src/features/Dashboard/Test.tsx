import { Box, Typography } from "@mui/material";
import { useDialog } from "@shared/hooks/useDialog";
import StartUp from "./StartUp";

const Test = () => {
	const { open, handleClickOpen, handleClose } = useDialog();
	return (
		<Box>
			<Typography
				variant="h2"
				onClick={() => {
					handleClickOpen();
				}}
			>
				Test
			</Typography>
			<StartUp open={open} handleClose={handleClose} />
		</Box>
	);
};

export default Test;
