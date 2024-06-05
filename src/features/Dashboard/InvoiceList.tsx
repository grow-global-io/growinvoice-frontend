import {  Typography } from "@mui/material";
import InvoiceExpenses from "./InvoiceExpenses";
import InvoiceTableList from "./InvoiceTableList";

const InvoiceList = () => {
  return (
    <>
      <Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>
       Invoices
      </Typography>
      <InvoiceExpenses />
      <InvoiceTableList/>

    </>
  )
}

export default InvoiceList
