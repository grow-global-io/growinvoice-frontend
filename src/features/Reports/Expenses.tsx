import { Box, Typography } from "@mui/material";
import ExpensesReportTable from "./ExpensesReportTable";
import { useEffect, useMemo, useState } from "react";
import { DayRange } from "react-modern-calendar-datepicker";
import { DateCalander } from "@shared/components/DateCalendar";
import { useReportsControllerGetExpenseRange } from "@api/services/reports";
import Loader from "@shared/components/Loader";
import { convertUtcToFormat, parseDateStringToFormat } from "@shared/formatter";

const Expenses = () => {
	const [dayRange, setDayRange] = useState<DayRange>({
		from: null,
		to: null,
	});
	const dateRange = useReportsControllerGetExpenseRange();

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
	}, [dateRange?.data]);

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

	if (dateRange?.isLoading || dateRange?.isRefetching) {
		return <Loader />;
	}
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: { xs: "column", sm: "row", lg: "row" },
				}}
				mb={2}
			>
				<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"}>
					Expenses Report
				</Typography>
				<Box>
					<Typography variant="h6" fontWeight={"500"} textTransform={"capitalize"}>
						Select Date Range
					</Typography>
					<DateCalander dayRange={dayRange} setDayRange={setDayRange} />
				</Box>
			</Box>
			<Box
				sx={{ width: { xs: "85vw", sm: "auto" }, overflowX: { xs: "scroll", sm: "visible" } }}
				my={2}
			>
				<ExpensesReportTable fromDate={fromDate} toDate={toDate} />
			</Box>
		</>
	);
};

export default Expenses;
