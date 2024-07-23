import { usePlansControllerFindAll } from "@api/services/plans";
import { Box, Grid, Typography } from "@mui/material";
import Loader from "@shared/components/Loader";
import MembershipCard from "@shared/components/MembershipCard";

const Membership = () => {
	const findAllPlans = usePlansControllerFindAll();
	if (findAllPlans?.isLoading || findAllPlans?.isFetching) {
		return <Loader />;
	}
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
					{findAllPlans?.data?.map((item, index) => (
						<Grid item xs={12} sm={5.5} key={index} my={2}>
							<MembershipCard item={item} />
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default Membership;
