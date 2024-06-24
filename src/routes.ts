import LoginPage from "@pages/LoginPage";
import MainHomePage from "@pages/MainHomePage";
import RegisterPage from "@pages/RegisterPage";
import OveviewPage from "@pages/OveviewPage";
import { Route } from "@shared/models/Route";
import ResetPassword from "@features/Authentication/ResetPassword";
import ProductListPage from "@pages/ProductListPage";
import CreateProductPage from "@pages/CreateProductPage";
import CustomerListPage from "@pages/CustomerListPage";
import CreateCustomerPage from "@pages/CreateCustomerPage";
import InvoiceListPage from "@pages/InvoiceListPage";
import CreateInvoicePage from "@pages/CreateInvoicePage";
import CreateQuotationPage from "@pages/CreateQuotationPage";
import QuotationListPage from "@pages/QuotationListPage";
import MyProfilePage from "@pages/MyProfilePage";
import MemberShipPage from "@pages/MemberShipPage";
import PreferencesPage from "@pages/PreferencesPage";
import CompanyPage from "@pages/CompanyPage";
import InvoicesPage from "@pages/InvoicesPage";
import ProductUnitPage from "@pages/ProductUnitPage";
import HsnCodePage from "@pages/HsnCodePage";
import TaxTypePage from "@pages/TaxTypePage";
import ApiCredentialsPage from "@pages/ApiCredentialsPage";
import InvoiceDetailPage from "@pages/InvoiceDetailPage";
import QuotationDetailPage from "@pages/QuotationDetailPage";
import InvoiceTemplatePage from "@pages/InvoiceTemplatePage";
export const unProtectedRoutes: Route[] = [
	{
		path: "/",
		Component: MainHomePage,
	},
	{
		path: "/login",
		Component: LoginPage,
	},
	{
		path: "/register",
		Component: RegisterPage,
	},
	{
		path: "/reset-password",
		Component: ResetPassword,
	},
	{
		path: "/invoice/invoicetemplate/:id",
		Component: InvoiceTemplatePage,
	},
];

export const protectedRoutes: Route[] = [
	{
		path: "/",
		Component: OveviewPage,
	},
	{
		path: "/product/productlist",
		Component: ProductListPage,
	},
	{
		path: "/product/createproduct",
		Component: CreateProductPage,
	},
	{
		path: "/customer/customerlist",
		Component: CustomerListPage,
	},
	{
		path: "/customer/createcustomer",
		Component: CreateCustomerPage,
	},
	{
		path: "/invoice/invoicelist",
		Component: InvoiceListPage,
	},
	{
		path: "/invoice/createinvoice",
		Component: CreateInvoicePage,
	},
	{
		path: "/invoice/invoicedetails/:id",
		Component: InvoiceDetailPage,
	},
	{
		path: "/invoice/createinvoice/:id",
		Component: CreateInvoicePage,
	},
	{
		path: "/quotation/createquotation",
		Component: CreateQuotationPage,
	},
	{
		path: "/quotation/createquotation/:id",
		Component: CreateQuotationPage,
	},
	{
		path: "/quotation/quotationlist",
		Component: QuotationListPage,
	},
	{
		path: "/quotation/quotationdetail/:id",
		Component: QuotationDetailPage,
	},
	{
		path: "/setting/myprofile",
		Component: MyProfilePage,
	},
	{
		path: "/setting/membership",
		Component: MemberShipPage,
	},
	{
		path: "/setting/company",
		Component: CompanyPage,
	},
	{
		path: "/setting/preferences",
		Component: PreferencesPage,
	},
	{
		path: "/setting/invoices",
		Component: InvoicesPage,
	},
	{
		path: "/setting/productunit",
		Component: ProductUnitPage,
	},
	{
		path: "/setting/hsncode",
		Component: HsnCodePage,
	},
	{
		path: "/setting/taxtype",
		Component: TaxTypePage,
	},
	{
		path: "/setting/apicredentials",
		Component: ApiCredentialsPage,
	},
	{
		path: "/setting/productunit",
		Component: ProductUnitPage,
	},
	{
		path: "/setting/hsncode",
		Component: HsnCodePage,
	},
	{
		path: "/setting/taxtype",
		Component: TaxTypePage,
	},
	{
		path: "/setting/apicredentials",
		Component: ApiCredentialsPage,
	},
	{
		path: "/invoice/invoicetemplate/:id",
		Component: InvoiceTemplatePage,
	},
];
