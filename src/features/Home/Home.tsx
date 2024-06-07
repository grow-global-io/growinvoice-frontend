import { Button, Typography } from "@mui/material";
import { getAuthControllerStatusQueryKey, useAuthControllerGetUser } from "@api/services/auth";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@shared/components/Loader";

const Home = () => {
	const a = useAuthControllerGetUser({
		id: "clwtpnjfz0000ijbabwxvxbmh",
	});
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
			<Button variant="outlined" color="primary" onClick={handleRefetch}>
				Refetch
			</Button>
			<Button variant="text" color="primary" onClick={handleRefetch}>
				Refetch
			</Button>
		</>
	);
};

export default Home;
