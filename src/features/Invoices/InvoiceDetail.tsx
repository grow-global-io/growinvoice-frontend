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
import { Box, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useQuery } from "@tanstack/react-query";
import Loader from "@shared/components/Loader";
import NoDataFound from "@shared/components/NoDataFound";

const styles = {
	py: 1,
	px: 3,
	color: "secondary.dark",
	fontWeight: 500,
	textTransform: "capitalize",
	my: { xs: 1 },
};

const InvoiceDetail = ({ invoiceId }: { invoiceId: string }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);

	const getHtmlText = useQuery({
		enabled: !!invoiceId,
		queryKey: ["invoice", invoiceId],
		queryFn: async () => {
			const response = await fetch(
				"https://growinvoice-94ee0dd2031b.herokuapp.com/api/invoice/test/" + invoiceId,
			);
			const data = await response.text();
			return data;
		},
	});

	useEffect(() => {
		if (iframeRef.current && !getHtmlText.isLoading && getHtmlText.isSuccess) {
			const iframe = iframeRef.current;
			iframe.srcdoc = getHtmlText.data;
		}
	}, [getHtmlText.isSuccess]);

	const generatePdfFromRef = async () => {
		const iframe = iframeRef.current;
		const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
		const ref = iframeDoc?.getElementById("tm_download_section");
		const doc = new jsPDF("portrait", "mm", "a4");
		var cWidth = ref?.clientWidth || 0;
		var cHeight = ref?.clientHeight || 0;
		var topLeftMargin = 0;
		const pdfWidth = 210; // A4 width in mm
		const pdfHeight = 297; // A4 height in mm
		const aspectRatio = cWidth / cHeight;
		const dpi = 300; // high resolution
		const totalPDFPages = Math.ceil(cHeight / (pdfHeight * (dpi / 96)));
		console.log(totalPDFPages);
		if (ref) {
			const canvas = await html2canvas(ref, {
				allowTaint: true,
				scale: dpi / 96,
				width: cWidth,
				height: cHeight,
				useCORS: true,
			});
			canvas.getContext("2d");
			const imgData = canvas.toDataURL("image/png", 1.0);
			// var pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
			// pdf.addImage(imgData, "PNG", topLeftMargin, topLeftMargin, canvasWidth, canvasHeight);
			// for (var i = 1; i <= totalPDFPages; i++) {
			// 	pdf.addPage([pdfWidth, pdfHeight], "p");
			// 	pdf.addImage(
			// 		imgData,
			// 		"PNG",
			// 		topLeftMargin,
			// 		-(pdfHeight * i) + topLeftMargin * 0,
			// 		cWidth,
			// 		cHeight,
			// 	);
			// }
			doc.addImage(imgData, "PNG", topLeftMargin, topLeftMargin, pdfWidth, pdfWidth / aspectRatio);
			doc.save("download.pdf");
			return doc;
		}
	};

	const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const menuLists = [
		{ name: "Share", func: () => console.log("Share") },
		{ name: "Marked Paid", func: () => console.log("Marked Paid") },
		{ name: "Mark Send", func: () => console.log("Mark Send") },
		{ name: "Delete", func: () => console.log("Delete") },
	];
	const buttonList = [
		{
			name: "Download",
			icon: FileDownloadOutlined,
			func: () => {
				generatePdfFromRef();
			},
		},
		{
			name: "Send Mail",
			icon: EmailOutlined,
			func: () => console.log("Send Mail"),
		},
		{
			name: "Send Whatsapp",
			icon: WhatsApp,
			func: () => console.log("Send Whatsapp"),
		},
		{
			name: "Edit",
			icon: CreateOutlined,
			func: () => console.log("Edit"),
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

	if (getHtmlText.isLoading) return <Loader />;

	if (!getHtmlText.data) return <NoDataFound message="No Data Found" />;

	return (
		<>
			<Typography variant="h3" color={"secondary.dark"} mb={3}>
				#INV-000001
			</Typography>
			<ButtonGroup
				sx={{
					width: "100%",
					bgcolor: "custom.transparentWhite",
					display: "flex",
					// flexDirection: { xs: "column", sm: "row" },
					flexWrap: { xs: "wrap" },
					my: 2,
				}}
				variant="text"
				aria-label="Basic button group"
			>
				{buttonList.map((item, index) => (
					<Button sx={styles} onClick={item.func} key={index}>
						<item.icon sx={{ mr: 1 }} />
						{item.name}
					</Button>
				))}
			</ButtonGroup>
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
		</>
	);
};

export default InvoiceDetail;
