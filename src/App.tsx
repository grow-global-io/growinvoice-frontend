import { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { protectedRoutes, unProtectedRoutes } from "./routes";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthStore } from "@store/auth";
import { useLoaderStore } from "@store/loader";
import Loader from "@shared/components/Loader";
import NotFoundPage from "@pages/NotFoundPage";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { useEffectOnce } from "@shared/hooks/useEffectOnce";
import Navbar from "@layout/navbar/Home/Navbar";
import GetStartedDialog from "@features/Dashboard/GetStartedDialog";
import { useCreateProductStore } from "@store/createProductStore";
import { ProductDrawer } from "@features/Products/CreateProduct";
import { useCreateCustomerStore } from "@store/createCustomerStore";
import { CustomerDrawer } from "@features/Customer/CreateCustomer";
import ParentofSidebar from "@layout/navbar/Settings/Sidebar";
import { useCreatePaymentStore } from "@store/createPaymentStore";
import { PaymentDrawer } from "@features/Payments/CreatePayments";
import { useCreateVendorsStore } from "@store/createVendorsStore";
import { VendorsDrawer } from "@features/Vendor/CreateVendors";
import { toast, ToastContainer } from "react-toastify";
import { GateWayDialog } from "@features/GatewayDetails/GateWayDetailsIndex";
import "react-toastify/dist/ReactToastify.css";
import useSocket from "@shared/hooks/useNotificationSocket";

function AppContainer() {
	const { isLoggedIn, logout, validateToken, user } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation(); // Get the current path

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
	const userId = user?.id ?? "";
	const socket = useSocket(userId);

	useEffect(() => {
		if (socket) {
			socket.on("newMessage", (notification) => {
				toast(() => {
					return (
						<div>
							<h3>{notification?.title}</h3>
							<p>{notification?.body}</p>
						</div>
					);
				});
			});

			// Clean up the listener on component unmount
			return () => {
				socket.off("newMessage");
			};
		}
	}, [socket]);

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

	const includeParentofSidebar = location.pathname.includes("setting");

	return (
		<Navbar>
			{includeParentofSidebar ? (
				<ParentofSidebar>
					<GetStartedDialog
						open={
							user?.company?.length === 0 ||
							user?.company?.[0]?.country_id === "" ||
							user?.company?.[0]?.address === null ||
							user?.company?.[0]?.address === ""
						}
					/>
					<Routes>
						<Route path="*" element={<NotFoundPage />} />
						{protectedRoutes.map(({ path, Component }) => (
							<Route key={path} path={path} element={<Component />} />
						))}
						<Route path="/login" element={<Navigate to="/" replace />} />
					</Routes>
				</ParentofSidebar>
			) : (
				<>
					<GetStartedDialog
						open={
							user?.company?.length === 0 ||
							user?.company?.[0]?.country_id === "" ||
							user?.company?.[0]?.address === null ||
							user?.company?.[0]?.address === ""
						}
					/>
					<Routes>
						<Route path="*" element={<NotFoundPage />} />
						{protectedRoutes.map(({ path, Component }) => (
							<Route key={path} path={path} element={<Component />} />
						))}
						<Route path="/login" element={<Navigate to="/" replace />} />
					</Routes>
				</>
			)}
		</Navbar>
	);
}

function App() {
	const [backdropOpen, setBackdropOpen] = useState(false);
	const [openProductForm, setOpenProductForm] = useState(false);
	const [openCustomerForm, setOpenCustomerForm] = useState(false);
	const [openPaymentForm, setOpenPaymentForm] = useState(false);
	const [openVendorsForm, setOpenVendorsForm] = useState(false);
	const [openGateWayForm, setOpenGateWayForm] = useState(false);

	const handleCloseProductForm = () => {
		setOpenProductForm(false);
	};

	const handleCloseCustomerForm = () => {
		setOpenCustomerForm(false);
	};

	const handleClosePaymentForm = () => {
		setOpenPaymentForm(false);
	};

	const handleCloseVendorsForm = () => {
		setOpenVendorsForm(false);
	};
	const handleCloseGateWayForm = () => {
		setOpenGateWayForm(false);
	};

	const loaderRef = useRef(useLoaderStore.getState());
	const createProduct = useRef(useCreateProductStore.getState());
	const createCustomer = useRef(useCreateCustomerStore.getState());
	const createPayment = useRef(useCreatePaymentStore.getState());
	const createVendors = useRef(useCreateVendorsStore.getState());

	useEffect(() => {
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

		const unsubscribePaymentForm = useCreatePaymentStore.subscribe((state) => {
			createPayment.current = state;
			setOpenPaymentForm(state.open);
		});
		const unsubscribeVendorsForm = useCreateVendorsStore.subscribe((state) => {
			createVendors.current = state;
			setOpenVendorsForm(state.open);
		});

		return () => {
			unsubscribeLoading();
			unsubscribeProductForm();
			unsubscribeCustomerForm();
			unsubscribePaymentForm();
			unsubscribeVendorsForm();
		};
	}, []);

	return (
		<>
			<AppContainer />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				stacked
			/>
			<Backdrop
				sx={{
					color: "custom.white",
					zIndex: (theme) => Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
				}}
				open={backdropOpen}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<ConfirmDialog />
			<ProductDrawer open={openProductForm} handleClose={handleCloseProductForm} />
			<CustomerDrawer open={openCustomerForm} handleClose={handleCloseCustomerForm} />
			<PaymentDrawer open={openPaymentForm} handleClose={handleClosePaymentForm} />
			<VendorsDrawer open={openVendorsForm} handleClose={handleCloseVendorsForm} />
			<GateWayDialog open={openGateWayForm} handleClose={handleCloseGateWayForm} />
		</>
	);
}

export default App;
