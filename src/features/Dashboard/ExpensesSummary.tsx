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

	if (customerCount.isLoading || invoiceCount.isLoading || invoiceDueAmount.isLoading) {
		return <Loader />;
	}

	const customerCountValue = customerCount?.data ?? "";
	const invoiceCountValue = invoiceCount?.data ?? "";
	const invoiceDueAmountValue =
		invoiceDueAmount?.data !== undefined
			? currencyFormatter(invoiceDueAmount.data, user?.currency?.short_code)
			: "";

	const data = [
		{
			value: customerCountValue,
			name: "Customers",
			img: Constants.customImages.GroupUser,
		},
		{
			value: invoiceCountValue,
			name: "Invoices",
			img: Constants.customImages.InvoiceFile,
		},
		{
			value: 12, // Placeholder value for Estimates
			name: "Estimates",
			img: Constants.customImages.Estimate,
		},
		{
			value: invoiceDueAmountValue,
			name: "Due Amount",
			img: Constants.customImages.Amount,
		},
	];

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
