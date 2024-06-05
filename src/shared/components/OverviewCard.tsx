import { Box, Typography } from "@mui/material";

const OverviewCard = ({ name, img }: { name: string; img: string }) => {
	return (
		<Box
			display={"flex"}
			border={"1px solid #EEEEEE"}
			padding={"16px"}
			borderRadius={"4px"}
			component={"div"}
			justifyContent={"space-between"}
			alignItems={"center"}
		>
			<Box>
				<Typography variant="h3" fontWeight={"600"}>
					$32.5k
				</Typography>
				<Typography variant="h6" fontWeight={"600"} sx={{ my: 1 }}>
					{name}
				</Typography>
			</Box>
			<Box>
				<img src={img} alt="group-user-img" />
			</Box>
		</Box>
	);
};

export default OverviewCard;
