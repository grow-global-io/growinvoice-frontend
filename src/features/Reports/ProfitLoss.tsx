import { Box, Grid, Typography } from "@mui/material";
import ProfitLossTableList from "./ProfitLossTableList";
import { FiFileText } from "react-icons/fi";
import { HiOutlineCircleStack } from "react-icons/hi2";
import ProfitLossCard from "@shared/components/ProfitLossCard";
import { useEffect, useMemo, useState } from "react";
import { DayRange } from "react-modern-calendar-datepicker";
import { DateCalander } from "@shared/components/DateCalendar";
import { useReportsControllerGetProfitLossCount, useReportsControllerGetProfitLossRange } from "@api/services/reports";
import Loader from "@shared/components/Loader";
import { convertUtcToFormat, currencyFormatter, parseDateStringToFormat } from "@shared/formatter";
import { useAuthStore } from "@store/auth";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";

const ProfitLoss = () => {
	
    const {user}=useAuthStore()
	const [dayRange, setDayRange] = useState<DayRange>({
		from: null,
		to: null,
	});
	const dateRange = useReportsControllerGetProfitLossRange();
	

	useEffect(() => {
		setDayRange({
			from: {
				day: parseInt(parseDateStringToFormat(dateRange?.data?.start ?? "", "DD")),
				month: parseInt(parseDateStringToFormat(dateRange?.data?.start ?? "", "MM")),
				year: parseInt(parseDateStringToFormat(dateRange?.data?.start ?? "", "YYYY")),
			},
			to: {
				day: parseInt(parseDateStringToFormat(dateRange?.data?.end ?? "", "DD")),
				month: parseInt(parseDateStringToFormat(dateRange?.data?.end ?? "", "MM")),
				year: parseInt(parseDateStringToFormat(dateRange?.data?.end ?? "", "YYYY")),
			},
		});
	}, [dateRange]);

	const fromDate = useMemo(() => {
		if (dayRange.from) {
			return convertUtcToFormat(
				`${dayRange.from.year}-${dayRange.from.month}-${dayRange.from.day}`,
				"iso",
			);
		}
		return "";
	}, [dayRange.from]);

	const toDate = useMemo(() => {
		if (dayRange.to) {
			return convertUtcToFormat(
				`${dayRange.to.year}-${dayRange.to.month}-${dayRange.to.day}`,
				"iso",
			);
		}
		return "";
	}, [dayRange.to]);
	const profitLossData = useReportsControllerGetProfitLossCount({
		end: toDate,
		start: fromDate,
	});
	const data = [
		{
			amount: currencyFormatter(profitLossData?.data?.totalIncome ?? 0, user?.currency?.short_code),
			text: "Total Income",
			icon: <FiFileText style={{ color: "rgba(25, 32, 56, 1)", fontSize: "30px" }} />
		},
		{
			amount:currencyFormatter(profitLossData?.data?.totalExpenses ?? 0, user?.currency?.short_code),
			text: "Total Expenses",
			icon: <FiFileText style={{ color: "rgba(246, 146, 22, 1)", fontSize: "30px" }} />
		},
		{
			amount: "$32.5k",
			text: "Invoiced Amount",
			icon: <HiOutlineCircleStack style={{ color: "rgba(15, 187, 0, 1)", fontSize: "30px" }} />,
		},
		{
			amount: currencyFormatter(profitLossData?.data?.profitOrLoss ?? 0, user?.currency?.short_code),
			text: (profitLossData?.data?.profitOrLoss ?? 0) >0?"Profit":"Loss",
			icon:(profitLossData?.data?.profitOrLoss ?? 0) >0?<FaArrowUpLong style={{ color: "#0FBB00", fontSize: "30px" }} />:<FaArrowDownLong style={{ color: "#BF384B", fontSize: "30px" }}/>,
		}
	]

	if (dateRange?.isLoading || dateRange?.isRefetching || profitLossData?.isLoading || profitLossData?.isFetching) {
		return <Loader />;
	}
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: { xs: "column", lg: "row" },
				}}
				mb={2}
			>
				<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"}>
					Profit And Loss
				</Typography>
				<DateCalander dayRange={dayRange} setDayRange={setDayRange} />
			</Box>
			<Grid container spacing={2}>
				{data.map((item, index) => (
					<Grid item xs={12} md={3} key={index}>
						<ProfitLossCard
							name={item.text}
							icon={item.icon}
							value={item.amount}
						/>
					</Grid>
				))}
			</Grid>
			<Box
				sx={{ width: { xs: "85vw", sm: "auto" }, overflowX: { xs: "scroll", sm: "visible" } }}
				my={2}
			>
				<ProfitLossTableList fromDate={fromDate} toDate={toDate}/>
			</Box>
		</>
	);
};

export default ProfitLoss;
