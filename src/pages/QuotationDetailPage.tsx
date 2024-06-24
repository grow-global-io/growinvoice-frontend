import QuotationDetail from "@features/Quotations/QuotationDetail";
import NoDataFound from "@shared/components/NoDataFound";
import { useParams } from "react-router-dom";
const QuotationDetailPage = () => {
	const { id } = useParams<{ id: string }>();

	if (id === undefined) return <NoDataFound message="No Invoice Found" />;
	return <QuotationDetail QuotationId={id} />;
};

export default QuotationDetailPage;
