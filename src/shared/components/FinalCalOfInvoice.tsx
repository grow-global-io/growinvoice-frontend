import { useState } from "react";
import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Field } from "formik";
import AddIcon from "@mui/icons-material/Add";
import { TextFormField } from "./FormFields/TextFormField";
import { AutocompleteField } from "./FormFields/AutoComplete";
import CreateTaxes from "@features/ProductTaxes/CreateTaxes";

interface TaxCode {
	id: string;
	percentage: number;
}

interface TaxCodes {
	isLoading: boolean;
	isFetching: boolean;
	data?: TaxCode[];
}

interface FinalCalOfInvoiceProps {
	taxCodes: TaxCodes;
}

const FinalCalOfInvoice: React.FC<FinalCalOfInvoiceProps> = ({ taxCodes }) => {
	const [taxesCreateOpen, setTaxesCreateOpen] = useState(false);
	return (
		<Card>
			<CardContent>
				<Grid
					container
					display={"flex"}
					alignItems={"center"}
					px={2}
					py={3}
					borderRadius={1}
					sx={{ background: "custom.transparentWhite" }}
				>
					<Grid item xs={12} sm={6}>
						<Typography variant="h5">Subtotal</Typography>
					</Grid>
					<Grid item xs={12} sm={6} textAlign={"right"}>
						<Field
							name="sub_total"
							component={TextFormField}
							type="number"
							disabled
							isRequired={true}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="h5">Taxes</Typography>
					</Grid>
					<Grid item xs={12} sm={6} textAlign={"right"}>
						<Field
							name="tax_id"
							component={AutocompleteField}
							loading={taxCodes.isLoading || taxCodes.isFetching}
							options={taxCodes.data?.map((item) => ({
								label: item.percentage + "%",
								value: item.id,
							}))}
						/>
						<Button variant="text" startIcon={<AddIcon />} onClick={() => setTaxesCreateOpen(true)}>
							Add Taxes
						</Button>
					</Grid>
					{taxesCreateOpen && (
						<Grid item xs={12}>
							<CreateTaxes handleClose={() => setTaxesCreateOpen(false)} />
						</Grid>
					)}
					<Grid item xs={12} sm={6}>
						<Typography variant="h5">Discount</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Field name="discountPercentage" component={TextFormField} type="number" />
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="h5">Total</Typography>
					</Grid>
					<Grid item xs={12} sm={6} textAlign={"right"}>
						<Field name="total" component={TextFormField} type="number" isRequired={true} />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default FinalCalOfInvoice;
