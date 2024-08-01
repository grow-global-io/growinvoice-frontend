import { Box, Typography } from "@mui/material";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CustomerReportTalbeList from "./CustomerReportTalbeList";
import { useEffect, useMemo, useState } from "react";
import { DayRange } from "react-modern-calendar-datepicker";
import { DateCalander } from "@shared/components/DateCalendar";
import { useReportsControllerGetProfitLossRange } from "@api/services/reports";
import Loader from "@shared/components/Loader";
import { convertUtcToFormat, parseDateStringToFormat } from "@shared/formatter";

const CustomerSales = () => {
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
					flexDirection: { xs: "column", lg: "row" },
				}}
				mb={2}
			>
				<Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"}>
					Customer Report
				</Typography>
				<DateCalander dayRange={dayRange} setDayRange={setDayRange} />
			</Box>
			<Box
				sx={{ width: { xs: "85vw", sm: "auto" }, overflowX: { xs: "scroll", sm: "visible" } }}
				my={2}
			>
				<CustomerReportTalbeList fromDate={fromDate} toDate={toDate} />
			</Box>
		</>
	);
};

export default CustomerSales;
