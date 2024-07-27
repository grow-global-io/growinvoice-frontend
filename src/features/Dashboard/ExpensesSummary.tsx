import { useCustomerControllerCustomerCount } from "@api/services/customer";
import {
	useInvoiceControllerInvoiceCount,
	useInvoiceControllerTotalDue,
} from "@api/services/invoice";
import { Grid } from "@mui/material";
import Loader from "@shared/components/Loader";
import OverviewCard from "@shared/components/OverviewCard";
import { Constants } from "@shared/constants";
import { currencyFormatter } from "@shared/formatter";
import { useAuthStore } from "@store/auth";

const ExpensesSummary = () => {
	const { user } = useAuthStore();
	const customerCount = useCustomerControllerCustomerCount();
	const invoiceCount = useInvoiceControllerInvoiceCount();
	const invoiceDueAmount = useInvoiceControllerTotalDue();

	const data = [
		{
			value: customerCount?.data ?? "",
			name: "Customer",
			img: Constants.customImages.GroupUser,
		},
		{
			value: invoiceCount?.data ?? "",
			name: "Invoices",
			img: Constants.customImages.InvoiceFile,
		},
		{
			value: 0,
			name: "Estimates",
			img: Constants.customImages.Estimate,
		},
		{
			value: currencyFormatter(invoiceDueAmount?.data ?? 0, user?.currency?.short_code),
			name: "Due Amount",
			img: Constants.customImages.Amount,
		},
	];

	if (customerCount.isLoading || invoiceCount.isLoading || invoiceDueAmount.isLoading) {
		return <Loader />;
	}
	return (
		<Grid container spacing={2}>
			{data.map((item, index) => (
				<Grid item xs={12} md={3} key={index}>
					<OverviewCard name={item.name} img={item.img} value={item.value} />
				</Grid>
			))}
		</Grid>
	);
};

export default ExpensesSummary;
