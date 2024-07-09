import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import ExpensesSummary from "./ExpensesSummary";
import LottieNoDataFound from "@shared/components/LottieNoDataFound";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getDashboardsControllerFindAllQueryKey, useDashboardsControllerFindAll, useDashboardsControllerRemove } from "@api/services/dashboards";
import Loader from "@shared/components/Loader";
import { useOpenaiControllerDashboardDataGet } from "@api/services/openai";
import { useEffect, useState } from "react";
import { snakeToReadableText } from "@shared/formatter";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomIconButton } from "@shared/components/CustomIconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirmDialogStore } from "@store/confirmDialog";
import { useQueryClient } from "@tanstack/react-query";
import { OpenaiControllerCreate200Item } from "@api/services/models";

interface DashboardData {
	rowsData: any[];
	columns: GridColDef[];
}

const Overview = () => {
	const navigate = useNavigate();
	const { handleOpen, cleanUp } = useConfirmDialogStore();
	const queryClient = useQueryClient()
	const dashbaordAll = useDashboardsControllerFindAll();

	const [dashboardData, setDashboardData] = useState<{
		[key: number]: DashboardData;
	}>({});

	const getData = useOpenaiControllerDashboardDataGet();


	const processDashboardData = (
		data: any,
		index: number
	) => {

		const keysData = data as OpenaiControllerCreate200Item;
		const keys = Object.keys(keysData[0]);

		const rowsData = keysData?.map(
			(item: OpenaiControllerCreate200Item, index: number) => {
				return {
					id: item?.id ?? index + 1,
					...item,
				};
			},
		);

		const columns = keys.map((key) => {
			if (
				key === "id" ||
				key === "createdAt" ||
				key === "updatedAt" ||
				key === "deletedAt" ||
				key === "user_id" ||
				key === "isExist" ||
				key.includes("password") ||
				key.includes("id")
			)
				return null;
			return {
				field: key,
				headerName: snakeToReadableText(key),
				minWidth: 150,
				flex: 1,
				show: true,
			};
		}).filter((item) => item !== null) as GridColDef[];

		setDashboardData((prevData) => ({
			...prevData,
			[index]: { rowsData, columns },
		}));
	};

	useEffect(() => {
		dashbaordAll?.data?.slice(0, 2).forEach(async (dashboard, index) => {
			if (dashboard?.id) {
				const data = await getData.mutateAsync({ id: dashboard?.id })
				processDashboardData(data, index);
				console.log(data, "data")
			}
		});

	}, [dashbaordAll?.data])


	const removeDashbaordData = useDashboardsControllerRemove()
	const handleDelete = async (invoiceId: string) => {
		await removeDashbaordData.mutateAsync({ id: invoiceId });
		queryClient.refetchQueries({
			queryKey: getDashboardsControllerFindAllQueryKey(),
		});
	}

	if (dashbaordAll?.isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Typography
				variant="h3"
				fontWeight={"500"}
				textTransform={"capitalize"}
				mb={"10px"}
			>
				Overview
			</Typography>
			<ExpensesSummary />
			<Grid container spacing={2} mt={1}>
				<Grid item xs={12} textAlign={"right"}>
					<Button
						startIcon={<AddIcon />}
						variant="contained"
						color="primary"
						onClick={() => {
							navigate("/dashboard");
						}}
					>
						Add Widget
					</Button>
				</Grid>
				{
					dashbaordAll?.data?.length == 0 && (
						<Grid item xs={12}>
							<LottieNoDataFound message="No Dashboard Widgets Found" />
						</Grid>
					)
				}
			</Grid>

			<Grid container my={2} spacing={2}>
				{dashbaordAll?.data?.slice(0, 2).map((dashboard, index) => (
					<Grid item xs={12} md={6} key={dashboard.id}>
						<Card
							sx={{
								alignItems: "stretch",
								height: "100%",
							}}>
							<CardContent>
								<Box display={"flex"} justifyContent={"space-between"} mb={2}>
									<Typography variant="h4">{dashboard?.title}</Typography>
									<CustomIconButton
										src={DeleteIcon}
										buttonType="delete"
										iconColor="error"
										onClick={async () => {
											handleOpen({
												title: "Delete Data",
												message: "Are you sure you want to delete this data?",
												onConfirm: async () => {
													await handleDelete(dashboard?.id);
												},
												onCancel: () => {
													cleanUp();
												},
												confirmButtonText: "Delete",
											});
										}}
									/>
								</Box>

								{getData?.isPending ? (
									<Loader />
								) : (
									<DataGrid
										rows={dashboardData[index]?.rowsData ?? []}
										columns={dashboardData[index]?.columns?.filter((item) => item?.show) ?? []}
									/>
								)}
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default Overview;
