import InvoiceTemplate from "../features/Invoices/InvoiceTemplate";
import { useParams } from "react-router-dom";
const InvoiceTemplatePage = () => {
	const { id } = useParams<{ id?: string }>();
	return <InvoiceTemplate invoiceId={id} />;
};

export default InvoiceTemplatePage;
