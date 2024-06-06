import { Grid } from "@mui/material";
import OverviewCard from "@shared/components/OverviewCard";
import { Constants } from "@shared/constants";

const InvoiceExpenses = () => {
	const data = [
		{
			text: "Total Outstanding Receivables",
			img: Constants.customImages.LeftDownArr,
		},
		{
			text: "Due Today",
			img: Constants.customImages.DueDateRed,
		},
		{
			text: "Due Within 30 Days",
			img: Constants.customImages.DueDateBlue,
		},
		{
			text: "Overdue Invoice",
			img: Constants.customImages.Stack,
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
	);
};

export default InvoiceExpenses;
