import { Grid } from "@mui/material";
import OverviewCard from "../../shared/components/OverviewCard";

import LeftDownArr from "./../../assets/img/left-down-arrow.png";
import DueDateRed from "./../../assets/img/due-date-red.png"
import DueDateBlue from "./../../assets/img/due-date-blue.png"
import Stack from "./../../assets/img/stack.png"

const InvoiceExpenses = () => {
    const data = [
		{
			text: "Total Outstanding Receivables",
			img:LeftDownArr,
		},
		{
			text: "Due Today",
			img: DueDateRed,
		},
		{
			text: "Due Within 30 Days",
			img:DueDateBlue,
		},
		{
			text: "Overdue Invoice",
			img: Stack,
		},
	];
  return (
    <Grid container spacing={2}>
    {data.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
            <OverviewCard name={item.text} img={item.img} />
        </Grid>
    ))}
</Grid>
  )
}

export default InvoiceExpenses
