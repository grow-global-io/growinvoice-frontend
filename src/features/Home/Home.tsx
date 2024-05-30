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
	console.log(a.data);
	if (a.isLoading) {
		return <Loader />;
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
