import LoginPage from "@pages/LoginPage";
import MainHomePage from "@pages/MainHomePage";
import RegisterPage from "@pages/RegisterPage";
import OveviewPage from "@pages/OveviewPage";
import { Route } from "@shared/models/Route";
import ResetPassword from "@features/Authentication/ResetPassword";
import Test from "@features/Dashboard/Test";
import ProductListPage from "@pages/ProductListPage";
import CreateProductPage from "@pages/CreateProductPage";
import CustomerListPage from "@pages/CustomerListPage";
import CreateCustomerPage from "@pages/CreateCustomerPage";
import InvoiceListPage from "@pages/InvoiceListPage";
import CreateInvoicePage from "@pages/CreateInvoicePage";

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
];

export const protectedRoutes: Route[] = [
	{
		path: "/",
		Component: OveviewPage,
	},
	{
		path: "/test",
		Component: Test,
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
];
