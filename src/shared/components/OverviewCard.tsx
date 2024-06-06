import { Box, Card, Grid, Typography } from "@mui/material";

const OverviewCard = ({ name, img }: { name: string; img: string }) => {
	return (
		<Card
			sx={{
				alignItems: "stretch",
				height: "100%",
			}}
		>
			<Grid
				container
				sx={{
					p: 2,
					alignItems: "center",
				}}
			>
				<Grid item xs={10}>
					<Typography variant="h3">$32.5k </Typography>{" "}
					<Typography variant="h6" sx={{ my: 1 }}>
						{name}{" "}
					</Typography>
				</Grid>
				<Grid item xs={2} alignItems={"center"}>
					<img src={img} alt="group-user-img" />
				</Grid>
			</Grid>
		</Card>
	);
};

export default OverviewCard;
