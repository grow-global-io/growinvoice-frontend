import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const NotificationListItem = ({ title, body }: { title: string; body: string }) => {
	return (
		<>
			<Box my={1} display={"flex"} flexDirection={"row"} pr={2} alignItems={"center"}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h4" fontWeight={"bold"} textTransform={"capitalize"}>
							{title}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body1">{body}</Typography>
					</Grid>
				</Grid>
				<IconButton>
					<CloseIcon
						sx={{
							fontSize: "15px",
						}}
					/>
				</IconButton>
			</Box>
			<Divider />
		</>
	);
};

export default NotificationListItem;
