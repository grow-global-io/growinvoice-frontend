import { Grid } from "@mui/material";
import OverviewCard from "@shared/components/OverviewCard";
import { Constants } from "@shared/constants";

const ExpensesSummary = () => {
	const data = [
		{
			name: "Customers",
			img: Constants.customImages.GroupUser,
		},
		{
			name: "Invoices",
			img: Constants.customImages.InvoiceFile,
		},
		{
			name: "Estimates",
			img: Constants.customImages.Estimate,
		},
		{
			name: "Due Amount",
			img: Constants.customImages.Amount,
		},
	];

	return (
		<Grid container spacing={2}>
			{data.map((item, index) => (
				<Grid item xs={12} md={3} key={index}>
					<OverviewCard name={item.name} img={item.img} />
				</Grid>
			))}
		</Grid>
	);
};

export default ExpensesSummary;
