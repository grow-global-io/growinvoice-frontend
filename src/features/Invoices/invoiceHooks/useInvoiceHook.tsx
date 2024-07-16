import {
	getInvoiceControllerFindAllQueryKey,
	getInvoiceControllerFindDueInvoicesQueryKey,
	getInvoiceControllerFindDueMonthQueryKey,
	getInvoiceControllerFindDueTodayQueryKey,
	getInvoiceControllerFindPaidInvoicesQueryKey,
	getInvoiceControllerInvoiceCountQueryKey,
	getInvoiceControllerInvoicePublicFindOneQueryKey,
	getInvoiceControllerOutstandingReceivableQueryKey,
	getInvoiceControllerTestQueryKey,
	getInvoiceControllerTotalDueQueryKey,
	useInvoiceControllerInvoiceSentToMail,
	useInvoiceControllerMarkedAsMailed,
	useInvoiceControllerMarkedAsPaid,
	useInvoiceControllerRemove,
} from "@api/services/invoice";
import { usePaymentsControllerStripePayment } from "@api/services/payments";
import { formatDateToIso } from "@shared/formatter";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const useInvoiceHook = () => {
	const navigate = useNavigate();
	const removeInvoice = useInvoiceControllerRemove();
	const currentDate = moment().format("YYYY-MM-DD");
	const queryClient = useQueryClient();
	const sendInvoiceToMail = useInvoiceControllerInvoiceSentToMail();
	const markedPaid = useInvoiceControllerMarkedAsPaid();
	const markedMailedSent = useInvoiceControllerMarkedAsMailed();
	const createstripPaymentUrl = usePaymentsControllerStripePayment();
	const handleRedirectStripePayment = async (invoiceId: string) => {
		const params = { invoice_id: invoiceId };
		const response = await createstripPaymentUrl.mutateAsync({ params });
		window.open(response);
	};

	const handleEdit = (invoiceId: string) => {
		navigate(`/invoice/createinvoice/${invoiceId}`);
	};

	const handleView = (invoiceId: string) => {
		navigate(`/invoice/invoicedetails/${invoiceId}`);
	};

	const handleDelete = async (invoiceId: string) => {
		await removeInvoice.mutateAsync({ id: invoiceId });
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindAllQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueInvoicesQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindPaidInvoicesQueryKey(),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerInvoiceCountQueryKey(),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerTotalDueQueryKey(),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerOutstandingReceivableQueryKey(),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueTodayQueryKey({
				date: formatDateToIso(currentDate),
			}),
		});
		await queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueMonthQueryKey({
				date: formatDateToIso(currentDate),
			}),
		});
	};

	const handleSendMail = async (invoiceId: string, email: string) => {
		const invoiceLink = `${window.location.origin}/invoice/invoicetemplate/${invoiceId}`;
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

		await sendInvoiceToMail.mutateAsync({
			data: sendMailDto,
			params: {
				id: invoiceId,
			},
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerInvoicePublicFindOneQueryKey(invoiceId ?? ""),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindAllQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueInvoicesQueryKey(),
		});

		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindPaidInvoicesQueryKey(),
		});

		queryClient.refetchQueries({
			queryKey: getInvoiceControllerTestQueryKey(invoiceId),
		});
	};

	const refetchQueries = async (invoiceId: string) => {
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerInvoicePublicFindOneQueryKey(invoiceId ?? ""),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindAllQueryKey(),
		});
		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindDueInvoicesQueryKey(),
		});

		queryClient.refetchQueries({
			queryKey: getInvoiceControllerFindPaidInvoicesQueryKey(),
		});

		queryClient.refetchQueries({
			queryKey: getInvoiceControllerTestQueryKey(invoiceId),
		});
	};

	const handleShare = (invoiceId: string) => {
		navigate(`/invoice/invoicetemplate/${invoiceId}`);
	};

	const handlePaid = async (invoiceId: string) => {
		await markedPaid.mutateAsync({
			params: {
				id: invoiceId,
			},
		});
		refetchQueries(invoiceId);
	};

	const handleMailedSent = async (invoiceId: string) => {
		await markedMailedSent.mutateAsync({
			params: {
				id: invoiceId,
			},
		});
		refetchQueries(invoiceId);
	};

	return {
		handleRedirectStripePayment,
		handleEdit,
		handleView,
		handleDelete,
		handleSendMail,
		handleShare,
		handlePaid,
		handleMailedSent,
	};
};
