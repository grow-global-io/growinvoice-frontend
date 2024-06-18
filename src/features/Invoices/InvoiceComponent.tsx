import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "@shared/components/Loader";
import { Box } from "@mui/material";
import NoDataFound from "@shared/components/NoDataFound";

const InvoiceComponent = (ref: React.Ref<HTMLDivElement>) => {
	const fetchContent = useQuery({
		queryKey: ["invoice"],
		queryFn: async () => {
			const response = await fetch(
				"https://growinvoice-94ee0dd2031b.herokuapp.com/api/invoice/test/clxks3ic3000iee9o70z725kj",
			);
			const data = await response.text();
			return data;
		},
	});

	if (fetchContent.isLoading) return <Loader />;

	if (!fetchContent.data) return <NoDataFound message="No Data Found" />;

	return (
		<Box
			src="https://growinvoice-94ee0dd2031b.herokuapp.com/api/invoice/test/clxks3ic3000iee9o70z725kj"
			ref={ref}
			component={"iframe"}
			sx={{ width: { xs: "85vw", sm: "auto" }, overflowX: { xs: "scroll", sm: "visible" } }}
		>
			{/* <div ref={ref} dangerouslySetInnerHTML={{ __html: fetchContent?.data }} /> */}
		</Box>
	);
};

export default InvoiceComponent;
