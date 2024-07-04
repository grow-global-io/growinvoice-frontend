import { Box, Grid, Typography } from "@mui/material";
import MembershipCard from "@shared/components/MembershipCard";
import MembershipData from "../../data/memberShipData.json";

const Plans = () => {
	return (
		<Box>
			<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
				Plans
			</Typography>
			<Grid container spacing={2} display={"flex"} justifyContent={"center"} mt={5}>
				{MembershipData.map((item, index) => (
					<Grid item xs={12} sm={6} md={4} key={index} my={2}>
						<MembershipCard
							packValue={item.packValue}
							packValuePer={item.packValueper}
							list={item.lists}
							duration={item.duration}
							key={index}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Plans;
