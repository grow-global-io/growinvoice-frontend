import LoginPage from "./pages/LoginPage";
import MainHomePage from "./pages/MainHomePage";
import { Route } from "./shared/models/Route";

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
		Component: LoginPage,
	},
];

export const protectedRoutes: Route[] = [];
