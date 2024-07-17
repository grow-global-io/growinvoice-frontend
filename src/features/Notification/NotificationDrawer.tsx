import { useRef, useCallback, useEffect, useState } from "react";
import { Box, Drawer, Grid, IconButton, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateNotificationStore } from "@store/createNotificationStore";
import { notificationsControllerFindAll } from "@api/services/notifications";
import NotificationListItem from "@shared/components/NotificationListItem";
import Loader from "@shared/components/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthStore } from "@store/auth";
import NoDataFound from "@shared/components/NoDataFound";

const NotificationDrawer = ({ open, handleClose }: { open: boolean; handleClose?: () => void }) => {
	const { setOpenNotificationForm } = useCreateNotificationStore.getState();
	const { user } = useAuthStore();
	const [notifications, setNotifications] = useState<any[]>([]);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
		queryKey: ["Notification", user?.id],
		queryFn: async ({ pageParam = "" }) => {
			const response = await notificationsControllerFindAll({
				skip: pageParam,
				take: "10",
			});
			return response;
		},
		getNextPageParam: (lastPage) => lastPage.nextId || null,
		initialPageParam: "",
	});

	useEffect(() => {
		if (data) {
			const newNotifications = data.pages.flatMap((page) => page.results);
			setNotifications(newNotifications);
		}
	}, [data]);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastElementRef = useCallback(
		(node: HTMLElement | null) => {
			if (node && hasNextPage && !isFetchingNextPage) {
				observer.current?.disconnect();
				observer.current = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting) {
						fetchNextPage();
					}
				});
				observer.current.observe(node);
			}
		},
		[hasNextPage, isFetchingNextPage],
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Drawer anchor="right" open={open} onClose={handleClose}>
			<Box sx={{ maxWidth: { xs: "100%", lg: "400px" } }} role="presentation" padding={2}>
				<Grid container justifyContent={"space-between"} mb={2}>
					<Typography variant="h4">Notification</Typography>

					<IconButton
						sx={{
							color: "secondary.dark",
						}}
						onClick={() => setOpenNotificationForm(false)}
					>
						<CloseIcon />
					</IconButton>
				</Grid>

				<Paper
					elevation={2}
					sx={{
						padding: 1,
						width: "95%",
					}}
				>
					<Box sx={{ mb: 2, mt: 2 }}>
						{notifications?.length ? (
							notifications?.map((item, index) =>
								notifications?.length === index + 1 ? (
									<Box ref={lastElementRef} key={item?.id}>
										<NotificationListItem title={item?.title} body={item?.body} />
									</Box>
								) : (
									<Box key={item.id}>
										<NotificationListItem title={item?.title} body={item?.body} />
									</Box>
								),
							)
						) : (
							<NoDataFound message="No Notifications..." />
						)}
						{isFetchingNextPage && <Loader />}
					</Box>
				</Paper>
			</Box>
		</Drawer>
	);
};

export default NotificationDrawer;
