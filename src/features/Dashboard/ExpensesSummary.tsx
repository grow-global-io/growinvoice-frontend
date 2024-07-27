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
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import { FaFileInvoiceDollar } from "react-icons/fa";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
const style = {
	color: "custom.lightBlue",
	fontSize: "30px",
};

const ExpensesSummary = () => {
	const { user } = useAuthStore();
	const customerCount = useCustomerControllerCustomerCount();
	const invoiceCount = useInvoiceControllerInvoiceCount();
	const invoiceDueAmount = useInvoiceControllerTotalDue();

	const data = [
		{
			value: customerCount?.data ?? "",
			name: "Customers",
			img: <PeopleIcon sx={style} />,
			BgColor: "custom.DashboardBlue",
		},
		{
			value: invoiceCount?.data ?? "",
			name: "Invoices",
			img: <DescriptionIcon sx={style} />,
			BgColor: "custom.DashbaordYellow",
		},
		{
			value: 0,
			name: "Estimates",
			img: <FaFileInvoiceDollar color="#fff" fontSize={"30px"} />,
			BgColor: "custom.DashboadRed",
		},
		{
			value: currencyFormatter(invoiceDueAmount?.data ?? 0, user?.currency?.short_code),
			name: "Due Amount",
			img: <AccountBalanceWalletIcon sx={style} />,
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
