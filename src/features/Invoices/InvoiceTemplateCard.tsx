import Button from "@mui/material/Button";
import { FileDownloadOutlined, ErrorOutline, Check } from "@mui/icons-material";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAuthStore } from "@store/auth";
import { useInvoiceControllerInvoicePublicFindOne } from "@api/services/invoice";
import { useQuotationControllerQuotationPublicFindOne } from "@api/services/quotation";
import Loader from "@shared/components/Loader";

const InvoiceTemplateCard = ({
	id,
	templateName,
	downloadfunc,
}: {
	id: string;
	templateName: string;
	downloadfunc: () => void;
}) => {
	const { user } = useAuthStore();
	const invoiceFindOne = useInvoiceControllerInvoicePublicFindOne(id ?? "", {
		query: {
			enabled: id !== undefined,
		},
	});
	const getQuotationData = useQuotationControllerQuotationPublicFindOne(id ?? "", {
		query: {
			enabled: id !== undefined,
		},
	});

	if (invoiceFindOne.isLoading || getQuotationData.isLoading) return <Loader />;
	return (
		<Card sx={{ display: { xs: "block", md: "none" } }}>
			<CardContent>
				<Typography variant="h4" textAlign={"center"} color={"secondary.dark"}>
					Hi, {user?.name}!
				</Typography>
				<Typography variant="h5" textAlign={"center"} color={"secondary.dark"}>
					{templateName} from {user?.company?.[0]?.name}
				</Typography>
				{templateName == "Invoice" && (
					<Box display={"flex"} justifyContent={"center"} alignItems={"center"} my={1}>
						{invoiceFindOne?.data?.paid_status !== "Unpaid" ? (
							<Check sx={{ fontSize: "15px", mr: 1, color: "custom.GreenBtnColor" }} />
						) : (
							<ErrorOutline sx={{ fontSize: "15px", mr: 1, color: "custom.apiBtnBgColor" }} />
						)}
						<Typography
							color={
								invoiceFindOne?.data?.paid_status !== "Unpaid"
									? "custom.GreenBtnColor"
									: "custom.apiBtnBgColor"
							}
						>
							{invoiceFindOne?.data?.paid_status}
						</Typography>
					</Box>
				)}
				<Typography variant="h6" textAlign={"center"} color={"custom.grayColor"}>
					Total Amount
				</Typography>
				<Typography variant="h1" textAlign={"center"} color={"secondary.dark"}>
					{templateName == "Invoice" ? invoiceFindOne?.data?.total : getQuotationData?.data?.total}
				</Typography>
				<Box my={2}>
					<Box display={"flex"} justifyContent={"space-between"} my={0.5}>
						<Typography variant="h6" fontWeight={500} color={"secondary.dark"}>
							{templateName} #
						</Typography>
						<Typography variant="h6" color={"secondary.dark"}>
							INV-
							{templateName == "Invoice"
								? invoiceFindOne?.data?.invoice_number
								: getQuotationData?.data?.quatation_number}
						</Typography>
					</Box>
					<Box display={"flex"} justifyContent={"space-between"} my={0.5}>
						<Typography variant="h6" fontWeight={500} color={"secondary.dark"}>
							{templateName} Date
						</Typography>
						<Typography variant="h6" color={"secondary.dark"}>
							{templateName == "Invoice"
								? invoiceFindOne?.data?.date
								: getQuotationData?.data?.date}
						</Typography>
					</Box>
				</Box>
				<Box textAlign={"center"} mt={1}>
					<Button
						variant="contained"
						onClick={() => {
							downloadfunc();
						}}
					>
						<FileDownloadOutlined />
						Download
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default InvoiceTemplateCard;
