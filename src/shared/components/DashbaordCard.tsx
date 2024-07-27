import { Card, Grid, Typography } from "@mui/material";

interface OverviewCardProps {
	name: string;
	icon: any;
	value: string | number;
	bgColor: string;
}

const DashbaordCard = ({ name, icon, value, bgColor }: OverviewCardProps) => {
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

					height: "100%",
				}}
			>
				<Grid
					item
					xs={4}
					sx={{
						bgcolor: bgColor,
						display: "flex",
						borderRadius: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{icon}
				</Grid>
				<Grid item xs={8} alignItems={"center"} pl={1}>
					<Typography variant="h6" sx={{ my: 1 }}>
						{name}{" "}
					</Typography>
					<Typography variant="h3">{value}</Typography>{" "}
				</Grid>
			</Grid>
		</Card>
	);
};

export default DashbaordCard;
