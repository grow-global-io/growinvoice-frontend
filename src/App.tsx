import { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { protectedRoutes, unProtectedRoutes } from "./routes";
// import Navbar from "./layout/navbar";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useAuthStore } from "@store/auth";
import { useAlertStore } from "@store/alert";
import { useLoaderStore } from "@store/loader";
import Loader from "@shared/components/Loader";
import NotFoundPage from "@pages/NotFoundPage";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { useEffectOnce } from "@shared/hooks/useEffectOnce";
import { AlertTitle } from "@mui/material";
import Navbar from "@layout/navbar/Home/Navbar";
import GetStartedDialog from "@features/Dashboard/GetStartedDialog";
import { useCreateProductStore } from "@store/createProductStore";
import { ProductDrawer } from "@features/Products/CreateProduct";
import { useCreateCustomerStore } from "@store/createCustomerStore";
import { CustomerDrawer } from "@features/Customer/CreateCustomer";

function AppContainer() {
	const { isLoggedIn, logout, validateToken, user } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffectOnce(() => {
		setIsLoading(true);
		validateToken()
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => {
				logout();
				setIsLoading(false);
			});
	});

	if (isLoading) {
		return <Loader />;
	}

	if (!isLoggedIn) {
		return (
			<Routes>
				{unProtectedRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		);
	}

	return (
		<Navbar>
			<GetStartedDialog
				open={user?.company?.[0]?.address === null || user?.company?.[0]?.address === ""}
			/>
			<Routes>
				<Route path="*" element={<NotFoundPage />} />
				{protectedRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path="/login" element={<Navigate to="/" replace />} />
			</Routes>
		</Navbar>
	);
}

function App() {
	const [open, setOpen] = useState(false);
	const [backdropOpen, setBackdropOpen] = useState(false);
	const [openProductForm, setOpenProductForm] = useState(false);
	const [openCustomerForm, setOpenCustomerForm] = useState(false);

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		console.log("handleClose", event);
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const handleCloseProductForm = () => {
		setOpenProductForm(false);
	};

	const handleCloseCustomerForm = () => {
		setOpenCustomerForm(false);
	};

	const alertRef = useRef(useAlertStore.getState());
	const loaderRef = useRef(useLoaderStore.getState());
	const createProduct = useRef(useCreateProductStore.getState());
	const createCustomer = useRef(useCreateCustomerStore.getState());

	useEffect(() => {
		const unsubscribeAlert = useAlertStore.subscribe((state) => {
			alertRef.current = state;
			setOpen(state.open);
		});
		const unsubscribeLoading = useLoaderStore.subscribe((state) => {
			loaderRef.current = state;
			setBackdropOpen(state.open);
		});

		const unsubscribeProductForm = useCreateProductStore.subscribe((state) => {
			createProduct.current = state;
			setOpenProductForm(state.open);
		});

		const unsubscribeCustomerForm = useCreateCustomerStore.subscribe((state) => {
			createCustomer.current = state;
			setOpenCustomerForm(state.open);
		});

		return () => {
			unsubscribeAlert();
			unsubscribeLoading();
			unsubscribeProductForm();
			unsubscribeCustomerForm();
		};
	}, []);

	return (
		<>
			<AppContainer />
			<Snackbar
				open={open}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				onClose={handleClose}
			>
				<Alert severity={alertRef.current.severity} sx={{ width: "100%" }} onClose={handleClose}>
					<AlertTitle sx={{ textTransform: "capitalize" }}>{alertRef.current.severity}</AlertTitle>
					<Typography>{alertRef.current.message}</Typography>
				</Alert>
			</Snackbar>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
				}}
				open={backdropOpen}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<ConfirmDialog />
			<ProductDrawer open={openProductForm} handleClose={handleCloseProductForm} />
			<CustomerDrawer open={openCustomerForm} handleClose={handleCloseCustomerForm} />
		</>
	);
}

export default App;
