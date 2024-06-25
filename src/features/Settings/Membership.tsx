import { Box, Grid, Typography } from "@mui/material";
import MembershipCard from "@shared/components/MembershipCard";
import MembershipData from "../../data/memberShipData.json";

const Membership = () => {
	return (
		<>
			<Box>
				<Grid container spacing={2} display={"flex"} justifyContent={"center"}>
					<Grid item xs={12} sm={12} textAlign={"center"}>
						<Typography variant="h4" fontWeight={600}>
							You are currently using our demo plan trail version
						</Typography>
						<Typography variant="h5" fontWeight={400} lineHeight={1.2} mt={1.5}>
							upgrade your plan to generate more invoices and access other features
						</Typography>
					</Grid>
					{MembershipData.map((item, index) => (
						<Grid item xs={12} sm={5.5} key={index} my={2}>
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
		</>
	);
};

export default Membership;
