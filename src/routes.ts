import LoginPage from "./pages/LoginPage";
import MainHomePage from "./pages/MainHomePage";
import RegisterPage from "./pages/RegisterPage";
import OveviewPage from "./pages/OveviewPage";
import { Route } from "./shared/models/Route";
import ResetPassword from "./features/Authentication/ResetPassword";

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
];
