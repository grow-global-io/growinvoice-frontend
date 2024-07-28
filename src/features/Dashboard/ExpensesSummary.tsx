import { useCustomerControllerCustomerCount } from "@api/services/customer";
import {
	useInvoiceControllerInvoiceCount,
	useInvoiceControllerTotalDue,
} from "@api/services/invoice";
import { Grid } from "@mui/material";
import Loader from "@shared/components/Loader";
import { currencyFormatter } from "@shared/formatter";
import { useAuthStore } from "@store/auth";
import DashbaordCard from "@shared/components/DashbaordCard";
import { FaFileInvoiceDollar, FaFileInvoice } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdAccountBalanceWallet } from "react-icons/md";

const ExpensesSummary = () => {
	const { user } = useAuthStore();
	const customerCount = useCustomerControllerCustomerCount();
	const invoiceCount = useInvoiceControllerInvoiceCount();
	const invoiceDueAmount = useInvoiceControllerTotalDue();

	const data = [
		{
			value: customerCount?.data ?? "",
			name: "Customers",
			img: <FaPeopleGroup color="#fff" fontSize={"50px"} />,
			BgColor: "custom.DashboardBlue",

		},
		{
			value: invoiceCount?.data ?? "",
			name: "Invoices",
			img: <FaFileInvoice color="#fff" fontSize={"40px"} />,
			BgColor: "custom.DashbaordYellow",
		},
		{
			value: 0,
			name: "Estimates",
			img: <FaFileInvoiceDollar color="#fff" fontSize={"40px"} />,
			BgColor: "custom.DashboadRed",
		},
		{
			value: currencyFormatter(invoiceDueAmount?.data ?? 0, user?.currency?.short_code),
			name: "Due Amount",
			img: <MdAccountBalanceWallet color="#fff" fontSize={"50px"} />,
			BgColor: "custom.DashboardGreen",
		},
	];

	if (customerCount.isLoading || invoiceCount.isLoading || invoiceDueAmount.isLoading) {
		return <Loader />;
	}
	return (
		<Grid container spacing={2}>
			{data.map((item, index) => (
				<Grid item xs={12} md={3} key={index}>
					<DashbaordCard
						name={item.name}
						icon={item.img}
						value={item.value}
						bgColor={item.BgColor}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default ExpensesSummary;
