
import CustomerTableList from "./CustomerTableList";

import ProductTableList from "@features/Products/ProductTableList";

import { Grid, Typography } from "@mui/material";
import CreateCustomer from "./CreateCustomer";

const CustomerList = () => {
	return (

		<Grid container spacing={2} sx={{ width: { xs: "90vw", sm: "100%" } }}>

		<Grid container spacing={2}>

			<Grid item xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
				<Typography variant="h3">Customers</Typography>
				<CreateCustomer />
			</Grid>
			<Grid item xs={12}>

				<CustomerTableList />

				<ProductTableList />

			</Grid>
		</Grid>
	);
};

export default CustomerList;
