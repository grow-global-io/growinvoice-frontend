import { Button, Typography } from "@mui/material";
import {
	useAuthControllerStatus,
	getAuthControllerStatusQueryKey,
} from "../../api/services/auth/auth";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../../shared/components/Loader";

const Home = () => {
	const a = useAuthControllerStatus();
	const queryClient = useQueryClient();

	const handleRefetch = () => {
		queryClient.invalidateQueries({
			queryKey: getAuthControllerStatusQueryKey(),
		});
	};

	if (a.isLoading) {
		return <Loader />;
	}
	if (a.error) {
		return <Typography paragraph>{a.error.message}</Typography>;
	}
	return (
		<>
			<Typography paragraph>{a.data?.name}</Typography>
			<Button variant="contained" color="primary" onClick={handleRefetch}>
				Refetch
			</Button>
		</>
	);
};

export default Home;
