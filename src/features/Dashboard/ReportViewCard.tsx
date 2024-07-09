import { AIDashboardDtoType, OpenaiControllerDashboardDataGet200 } from "@api/services/models";
import { useOpenaiControllerDashboardDataGet } from "@api/services/openai";
import BarChart from "@features/DashboardMenu/DashboardChart";
import { CustomToolbar } from "@features/DashboardMenu/DashboardOpenAi";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loader from "@shared/components/Loader";
import LottieNoDataFound from "@shared/components/LottieNoDataFound";
import { snakeToReadableText } from "@shared/formatter";
import { useMemo } from "react";

const ReportViewCard = ({
	dashboardId,
	type,
}: {
	dashboardId: string;
	type: AIDashboardDtoType;
}) => {
	const dashboard = useOpenaiControllerDashboardDataGet(dashboardId);

	const rows = useMemo(() => {
		if (dashboard.data && type === "Table") {
			const keysData = dashboard.data as OpenaiControllerDashboardDataGet200;

			const rowsData = keysData?.map((item: OpenaiControllerDashboardDataGet200, index: number) => {
				return {
					id: item?.id ?? index + 1,
					...item,
				};
			});
			return rowsData;
		}
	}, [dashboard.data]);

	const columns = useMemo(() => {
		if (dashboard.data && type === "Table") {
			const keysData = dashboard.data as OpenaiControllerDashboardDataGet200;
			const keys = Object.keys(keysData[0]);

			const columns = keys
				.map((key) => {
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
						show: true,
					};
				})
				.filter((item) => item !== null) as GridColDef[];
			return columns;
		}
	}, [dashboard.data]);

	if (dashboard.isLoading || dashboard?.isRefetching) return <Loader />;
	if (dashboard.isError) return <LottieNoDataFound />;
	return (
		<Box>
			{type === "Table" && (
				<div style={{ width: "100%" }}>
					<div style={{ height: 350, width: "100%" }}>
						<DataGrid
							rows={rows ?? []}
							columns={columns ?? []}
							slots={{ toolbar: CustomToolbar }}
						/>
					</div>
				</div>
			)}
			{type === "Chart" && <BarChart graphData={dashboard?.data ?? {}} />}
		</Box>
	);
};

export default ReportViewCard;
