import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
	MoreVertOutlined,
	FileDownloadOutlined,
	EmailOutlined,
	WhatsApp,
	CreateOutlined,
	PaymentsOutlined,
} from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Loader from "@shared/components/Loader";
import NoDataFound from "@shared/components/NoDataFound";
import { useNavigate } from "react-router-dom";
import { useMailControllerSendMail } from "@api/services/mail";
import InvoiceTemplateCard from "./InvoiceTemplateCard";
import {
	useInvoiceControllerInvoicePublicFindOne,
	useInvoiceControllerTest,
} from "@api/services/invoice";
import { usePdfExport } from "@shared/hooks/usePdfExport";
import DownloadIcon from "@mui/icons-material/Download";

const styles = {
	width: { xs: "100%", sm: "auto" },
	py: 1,
	px: 3,
	color: "secondary.dark",
	fontWeight: 500,
	textTransform: "capitalize",
	my: { xs: 1 },
	borderColor: "custom.invDetailBtnBorder",
	borderStyle: "solid",
	borderWidth: { xs: "1px", lg: "0" },
	display: "flex",
	justifyContent: "flex-start",
	bgcolor: "custom.transparentWhite",
};

const InvoiceDetail = ({ invoiceId, IsPublic }: { invoiceId: string; IsPublic?: boolean }) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const { generatePdfFromRef, generatePdfFromHtml } = usePdfExport();
	const isMobile = useMediaQuery("(max-width:800px)");

	const getHtmlText = useInvoiceControllerTest(invoiceId ?? "", {
		query: {
			enabled: invoiceId !== undefined,
		},
	});

	const getInvoiceData = useInvoiceControllerInvoicePublicFindOne(invoiceId ?? "", {
		query: {
			enabled: invoiceId !== undefined,
		},
	});
	useEffect(() => {
		if (iframeRef.current && !getHtmlText.isLoading && getHtmlText.isSuccess) {
			const iframe = iframeRef.current;
			iframe.srcdoc = getHtmlText?.data;
		}
	}, [getHtmlText.isSuccess]);

	const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const { mutateAsync: sendMail } = useMailControllerSendMail();
	const invoiceLink = `${window.location.origin}/invoice/invoicetemplate/${invoiceId}`;
	const handleSendMail = async () => {
		try {
			const email = getInvoiceData?.data?.customer?.email ?? "";

			const sendMailDto = {
				email: email,
				subject: "Invoice Details",
				body: `
                <p>Please find the attached invoice. You can also view the invoice online by clicking the button below:</p>
                <a href="${invoiceLink}" style="text-decoration: none;">
                    <button style="
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: white;
                        background-color: #007BFF;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">
                        View Invoice
                    </button>
                </a>
            `,
			};

			await sendMail({ data: sendMailDto });
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Failed to generate PDF");
		}
	};

	const menuLists = [
		{
			name: "Share",
			func: () => {
				navigate(`/invoice/invoicetemplate/${invoiceId}`);
			},
		},
		{ name: "Marked Paid", func: () => console.log("Marked Paid") },
		{ name: "Mark Send", func: () => console.log("Mark Send") },
		{ name: "Delete", func: () => console.log("Delete") },
	];
	const buttonList = [
		{
			name: "Download",
			icon: FileDownloadOutlined,
			func: () => {
				if (isMobile) {
					generatePdfFromHtml({
						html: getHtmlText?.data ?? "",
					});
					return;
				}
				generatePdfFromRef({
					iframeRef,
				});
			},
		},
		{
			name: "Send Mail",
			icon: EmailOutlined,
			func: handleSendMail,
		},
		{
			name: "Send Whatsapp",
			icon: WhatsApp,
			func: () => console.log("send whatsapp"),
			href: `https://api.whatsapp.com/send/?phone=${getInvoiceData?.data?.customer?.phone}&text=${window.location.origin}/invoice/invoicetemplate/${invoiceId}&type=url&app_absent=0`,
		},
		{
			name: "Edit",
			icon: CreateOutlined,
			func: () => navigate(`/invoice/createinvoice/${invoiceId}`),
		},
		{
			name: "Enter Payment",
			icon: PaymentsOutlined,
			func: () => console.log("Enter Payment"),
		},
		{
			name: "",
			icon: MoreVertOutlined,
			func: handleMoreClick,
		},
	];
	if (
		getHtmlText.isLoading ||
		getInvoiceData?.isLoading ||
		getInvoiceData?.isRefetching ||
		getInvoiceData?.isFetching ||
		getHtmlText?.isRefetching ||
		getHtmlText?.isFetching
	) {
		return <Loader />;
	}
	if (!getHtmlText?.data) return <NoDataFound message="No Data Found" />;

	return (
		<Box
			sx={{
				p: IsPublic ? 2 : 0,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 2,
				}}
			>
				<Typography variant="h3" color={"secondary.dark"}>
					#INV-{getInvoiceData?.data?.invoice_number}
				</Typography>
				{IsPublic && (
					<Button
						variant="contained"
						startIcon={<DownloadIcon />}
						onClick={() => {
							if (isMobile) {
								generatePdfFromHtml({
									html: getHtmlText?.data ?? "",
								});
								return;
							}
							generatePdfFromRef({
								iframeRef,
							});
						}}
					>
						Download
					</Button>
				)}
			</Box>
			{!IsPublic && (
				<ButtonGroup
					sx={{
						width: "100%",
						bgcolor: { xs: "", md: "custom.transparentWhite" },
						display: "flex",
						flexWrap: { xs: "wrap" },
						my: 2,
					}}
					variant="text"
					aria-label="Basic button group"
				>
					{buttonList.map((item, index) => (
						<Button sx={styles} onClick={item.func} key={index} href={item.href}>
							<item.icon sx={{ mr: 1 }} />
							{item.name}
						</Button>
					))}
				</ButtonGroup>
			)}
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{menuLists.map((item, index) => (
					<MenuItem
						onClick={() => {
							item.func();
							handleClose();
						}}
						sx={{ pr: 6 }}
						key={index}
					>
						{item.name}
					</MenuItem>
				))}
			</Menu>
			{!isMobile ? (
				<Box
					ref={iframeRef}
					component="iframe"
					sx={{
						width: {
							xs: "1100px",
							md: "100%",
						},
						height: "80vh",
						overflowX: { xs: "scroll", sm: "visible" },
					}}
				></Box>
			) : (
				<InvoiceTemplateCard
					invoiceId={invoiceId}
					downloadfunc={() => {
						if (isMobile) {
							generatePdfFromHtml({
								html: getHtmlText?.data ?? "",
							});
						} else {
							generatePdfFromRef({
								iframeRef,
							});
						}
					}}
				/>
			)}
		</Box>
	);
};

export default InvoiceDetail;
