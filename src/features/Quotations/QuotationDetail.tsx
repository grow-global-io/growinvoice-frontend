import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
	MoreVertOutlined,
	FileDownloadOutlined,
	EmailOutlined,
	CreateOutlined,
	ShareOutlined,
	DeleteOutline,
	SendOutlined,
	SwipeRightOutlined,
	SwipeLeftOutlined,
} from "@mui/icons-material";

import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import Loader from "@shared/components/Loader";
import NoDataFound from "@shared/components/NoDataFound";
import { useNavigate } from "react-router-dom";
import { usePdfExport } from "@shared/hooks/usePdfExport";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
	getQuotationControllerFindAllQueryKey,
	getQuotationControllerQuotationPublicFindOneQueryKey,
	getQuotationControllerTestQueryKey,
	useQuotationControllerConvertToInvoice,
	useQuotationControllerInvoiceSentToMail,
	useQuotationControllerMarkedAsAccepted,
	useQuotationControllerMarkedAsMailed,
	useQuotationControllerMarkedAsRejected,
	useQuotationControllerQuotationPublicFindOne,
	useQuotationControllerRemove,
	useQuotationControllerTest,
} from "@api/services/quotation";
import { useQueryClient } from "@tanstack/react-query";
import { useConfirmDialogStore } from "@store/confirmDialog";
import InvoiceTemplateCard from "@features/Invoices/InvoiceTemplateCard";
import {
	getInvoiceControllerFindAllQueryKey,
	getInvoiceControllerFindDueInvoicesQueryKey,
	getInvoiceControllerFindPaidInvoicesQueryKey,
} from "@api/services/invoice";

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

const QuotationDetail = ({
	quotationId,
	IsPublic,
}: {
	quotationId: string;
	IsPublic?: boolean;
}) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
	const [menuIconAnchorEl, setMenuIconAnchorEl] = useState<null | HTMLElement>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const { generatePdfFromRef, generatePdfFromHtml } = usePdfExport();
	const isMobile = useMediaQuery("(max-width:800px)");
	const { handleOpen, cleanUp } = useConfirmDialogStore();
	const params = {
		id: quotationId,
	};
	const refetchQuery = async () => {
		await queryClient.refetchQueries({
			queryKey: getQuotationControllerQuotationPublicFindOneQueryKey(quotationId),
		});
		await queryClient.refetchQueries({
			queryKey: getQuotationControllerFindAllQueryKey(),
		});
		handleMenuIconClose();
		handleMoreClose();
	};

	const getHtmlText = useQuotationControllerTest(quotationId ?? "", {
		query: {
			enabled: quotationId !== undefined,
			gcTime: 0,
			staleTime: 0,
		},
	});

	const getQuotationData = useQuotationControllerQuotationPublicFindOne(quotationId ?? "", {
		query: {
			enabled: quotationId !== undefined,
		},
	});
	console.log(getQuotationData, "data");

	useEffect(() => {
		if (iframeRef.current && !getHtmlText.isLoading && getHtmlText.isSuccess) {
			const iframe = iframeRef.current;
			iframe.srcdoc = getHtmlText?.data;
		}
	}, [getHtmlText.isSuccess]);

	const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
		setMoreAnchorEl(event.currentTarget);
	};

	const handleMoreClose = () => {
		setMoreAnchorEl(null);
	};

	const handleMenuIconClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenuIconAnchorEl(event.currentTarget);
	};

	const handleMenuIconClose = () => {
		setMenuIconAnchorEl(null);
	};

	const invoiceLink = `${window.location.origin}/quotation/quotationtemplate/${quotationId}`;
	const sendQuotationMail = useQuotationControllerInvoiceSentToMail();
	const handleSendMail = async () => {
		const sendMailDto = {
			email: getQuotationData?.data?.customer?.email ?? "",
			subject: "Quotation Details",
			body: `
                <p>Please find the attached quotation. You can also view the quotation online by clicking the button below:</p>
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
                        View Quotation
                    </button>
                </a>
            `,
		};

		await sendQuotationMail.mutateAsync({
			data: sendMailDto,
			params,
		});
		refetchQuery();
	};
	const convertToInvoice = useQuotationControllerConvertToInvoice();
	const handleConvertToInvoice = async () => {
		await convertToInvoice.mutateAsync({ params });

		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueInvoicesQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindAllQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindPaidInvoicesQueryKey(),
		});
		refetchQuery();
		navigate("/invoice/invoicelist");
	};
	const markedAccepted = useQuotationControllerMarkedAsAccepted();
	const handleMarkedAccepted = async () => {
		await markedAccepted.mutateAsync({ params });
		refetchQuery();
	};

	const markedRejected = useQuotationControllerMarkedAsRejected();
	const handleMarkedRejected = async () => {
		await markedRejected.mutateAsync({ params });
		refetchQuery();
	};

	const markedMailedSent = useQuotationControllerMarkedAsMailed();
	const handleMarkedSendMail = async () => {
		await markedMailedSent.mutateAsync({ params });
		refetchQuery();
	};
	const removeQuotation = useQuotationControllerRemove();
	const handleQuotationDelete = async () => {
		handleOpen({
			title: "Delete Quotation",
			message: "Are you sure you want to delete this quotation?",
			onConfirm: async () => {
				await removeQuotation.mutateAsync({ id: quotationId });
				refetchQuery();
				await queryClient.refetchQueries({
					queryKey: getQuotationControllerTestQueryKey(quotationId),
				});
			},
			onCancel: () => {
				cleanUp();
			},
			confirmButtonText: "Delete",
		});
	};

	const menuLists = [
		{
			name: "Share",
			func: () => {
				navigate(`/quotation/quotationtemplate/${quotationId}`);
			},
		},
		{ name: "Mark Accepted", func: handleMarkedAccepted },
		{ name: "Mark Rejected", func: handleMarkedRejected },
		{ name: "Mark Sent", func: handleMarkedSendMail },
		{ name: "Delete", func: handleQuotationDelete },
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
			name: "Convert to invoice",
			icon: "WhatsApp",
			func: handleConvertToInvoice,
		},
		{
			name: "Edit",
			icon: CreateOutlined,
			func: () => {
				navigate(`/quotation/createquotation/${quotationId}`);
			},
		},

		{
			name: "",
			icon: MoreVertOutlined,
			func: handleMoreClick,
		},
	];

	const buttonListForSmallSrn = [
		...buttonList,
		{
			name: "Share",
			icon: ShareOutlined,
			func: () => {
				navigate(`/invoice/invoicetemplate/${quotationId}`);
			},
		},

		{
			name: "Mark Accepted",
			icon: SwipeRightOutlined,
			func: handleMarkedAccepted,
		},

		{
			name: "Mark Rejected",
			icon: SwipeLeftOutlined,
			func: handleMarkedRejected,
		},
		{
			name: "Mark Sent",
			icon: SendOutlined,
			func: handleMarkedSendMail,
		},

		{
			name: "Delete",
			icon: DeleteOutline,
			func: handleQuotationDelete,
		},
	];

	if (
		getHtmlText.isLoading ||
		getQuotationData?.isLoading ||
		getQuotationData?.isRefetching ||
		getQuotationData?.isFetching ||
		getHtmlText?.isRefetching ||
		getHtmlText?.isFetching
	) {
		return <Loader />;
	}
	if (!getHtmlText?.data) return <NoDataFound message="No Data Found" />;

	const openMore = Boolean(moreAnchorEl);
	const openMenuIcon = Boolean(menuIconAnchorEl);

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
				<Box display={"flex"} gap={2}>
					<Typography variant="h3" color={"secondary.dark"}>
						#INV-{getQuotationData?.data?.quatation_number}
					</Typography>
					<Chip
						label={getQuotationData?.data?.status}
						sx={{ bgcolor: "secondary.dark", color: "secondary.contrastText" }}
					/>
				</Box>

				{!IsPublic && (
					<Box display={{ xs: "block", lg: "none" }}>
						<IconButton
							aria-label="more"
							id="menu-icon-button"
							aria-controls={openMenuIcon ? "menu-icon-menu" : undefined}
							aria-expanded={openMenuIcon ? "true" : undefined}
							aria-haspopup="true"
							onClick={handleMenuIconClick}
						>
							<MenuIcon />
						</IconButton>
					</Box>
				)}
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
						display: { xs: "none", lg: "flex" },
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
			)}
			<Menu anchorEl={moreAnchorEl} open={openMore} onClose={handleMoreClose}>
				{menuLists.map((item, index) => (
					<MenuItem
						onClick={() => {
							item.func();
							handleMoreClose;
						}}
						sx={{ pr: 6 }}
						key={index}
					>
						{item.name}
					</MenuItem>
				))}
			</Menu>

			<Menu
				id="menu-icon-menu"
				MenuListProps={{
					"aria-labelledby": "menu-icon-button",
				}}
				anchorEl={menuIconAnchorEl}
				open={openMenuIcon}
				onClose={handleMenuIconClose}
				PaperProps={{
					style: {
						maxHeight: "100%",
						width: "20ch",
					},
				}}
			>
				{buttonListForSmallSrn
					.filter((item) => item.name !== "")
					.map((item, index) => {
						return (
							<MenuItem onClick={item.func} key={index}>
								<item.icon sx={{ mr: 1 }} />
								{item.name}
							</MenuItem>
						);
					})}
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
					id={quotationId}
					templateName="Quotation"
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

export default QuotationDetail;
