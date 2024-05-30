import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainHomePage from "./pages/MainHomePage";
import RegisterPage from "./pages/RegisterPage";
import OveviewPage from "./pages/OveviewPage";
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
		Component: RegisterPage,
	},
];

export const protectedRoutes: Route[] = [
	{
		path: "/",
		Component: HomePage,
	},
	{
		path: "/overview",
		Component: OveviewPage,
	},
];
