import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainHomePage from "./pages/MainHomePage";
import RegisterPage from "./pages/RegisterPage";
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
];
