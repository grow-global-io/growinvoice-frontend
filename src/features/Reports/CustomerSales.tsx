import { Box, Typography } from "@mui/material";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CustomerReportTalbeList from "./CustomerReportTalbeList";
// import { Calendar, DayRange } from 'react-modern-calendar-datepicker';

const CustomerSales = () => {
	// const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
	//   from: null,
	//   to: null,
	// });
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
					Customer Report
				</Typography>
				<Box>
					{/* <Calendar
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            shouldHighlightWeekends
          /> */}
				</Box>
			</Box>
			<Box
				sx={{ width: { xs: "85vw", sm: "auto" }, overflowX: { xs: "scroll", sm: "visible" } }}
				my={2}
			>
				<CustomerReportTalbeList />
			</Box>
		</>
	);
};

export default CustomerSales;
