import { Grid } from "@mui/material";
import OverviewCard from "../../shared/components/OverviewCard";
import GroupUser from "./../../assets/img/group-user.png";
import InvoiceFile from "./../../assets/img/invoice-file.png";
import Estimate from "./../../assets/img/estimate.png";
import Amount from "./../../assets/img/due-amount.png";

const ExpensesSummary = () => {
	const data = [
		{
			name: "Customers",
			img: GroupUser,
		},
		{
			name: "Invoices",
			img: InvoiceFile,
		},
		{
			name: "Estimates",
			img: Estimate,
		},
		{
			name: "Due Amount",
			img: Amount,
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
