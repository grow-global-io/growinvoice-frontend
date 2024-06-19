import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useInvoiceControllerFindOne } from "@api/services/invoice";

const InvoiceTemplate = ({ invoiceId }: { invoiceId?: string }) => {
	const invoiceFindOne = useInvoiceControllerFindOne(invoiceId ?? "", {
		query: {
			enabled: invoiceId !== undefined,
		},
	});
	console.log(invoiceFindOne, "tara");
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
		const cWidth = ref?.clientWidth || 0;
		const cHeight = ref?.clientHeight || 0;
		const topLeftMargin = 0;
		const pdfWidth = 210; // A4 width in mm
		const pdfHeight = 297; // A4 height in mm
		const aspectRatio = cWidth / cHeight;
		const dpi = 300; // high resolution
		const totalPDFPages = Math.ceil(cHeight / (pdfHeight * (dpi / 96)));
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
			doc.addImage(imgData, "PNG", topLeftMargin, topLeftMargin, pdfWidth, pdfWidth / aspectRatio);

			for (let i = 1; i <= totalPDFPages; i++) {
				doc.addPage();
				doc.addImage(
					imgData,
					"PNG",
					topLeftMargin,
					-(pdfHeight * i) + topLeftMargin * 0,
					pdfWidth,
					pdfWidth / aspectRatio,
				);
			}
			doc.save("download.pdf");
			return doc;
		}
	};
	//   if(invoiceFindOne.isLoading){return <Loader/>}
	return (
		<>
			<Box display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={"20px"}>
				<Box>
					<Typography variant="h2">#INV-{invoiceFindOne?.data?.invoice_number}</Typography>
					<Box display={"flex"} my={5} ml={5}>
						<Typography variant="h4" fontWeight={"bold"} mr={1}>
							Status:
						</Typography>
						<Button
							variant="contained"
							sx={{
								backgroundColor:
									invoiceFindOne?.data?.paid_status == "Unpaid"
										? "custom.apiBtnBgColor"
										: "custom.GreenBtnColor",
							}}
						>
							{invoiceFindOne?.data?.paid_status == "Unpaid" ? "Unpaid" : "Paid"}
						</Button>
					</Box>
				</Box>
				<Button
					variant="outlined"
					onClick={() => {
						generatePdfFromRef();
					}}
				>
					{" "}
					download
				</Button>
			</Box>
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

export default InvoiceTemplate;
