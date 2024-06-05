import {
	AppBar,
	Avatar,
	Box,
	Collapse,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import "./Home.css";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/logo.svg";
import { useAuthStore } from "../../../store/auth";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
function Sidebar({ children }: { children: React.ReactNode }) {
	const navigation = useNavigate();
	const { logout } = useAuthStore();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const settingsWithFunc = [
		{
			name: "Profile",
			func: () => console.log("Profile"),
		},
		{
			name: "Account",
			func: () => console.log("Account"),
		},
		{
			name: "Dashboard",
			func: () => console.log("Dashboard"),
		},
		{
			name: "Logout",
			func: () => {
				logout();
			},
		},
	];
	const [openState, setOpenState] = useState({ showProduct: false, showCustomer: false, showInvoice: false });
	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// const [open, setOpen] = useState(false);

	// const handleClick = () => {
	// 	setOpen(!open);
	// 	setOpen1(false)
	// 	setOpen2(false);
	// };
	// const [open1, setOpen1] = useState(false);

	// const handleClick1 = () => {
	// 	setOpen(false)
	// 	setOpen1(!open1);
	// 	setOpen2(false);
	// };
	// const [open2, setOpen2] = useState(false);

	// const handleClick2 = () => {
	// 	setOpen(false);
	// 	setOpen1(false);
	// 	setOpen2(!open2);

	// };
	// const path = window.location.pathname
	// useEffect(()=>{
	// 	if(path=="/createproduct" || path=="/productlist" ){
	// 		setOpen(true)
	// 	}
	// 	if(path=="/createcustomer" || path=="/customerlist" ){
	// 		setOpen1(true)
	// 	}
	// 	if(path=="/createinvoice" || path=="/invoicelist" ){
	// 		setOpen2(true)
	// 	}

	// },[])
	const handleToggle = (key:any) => {
		setOpenState((prevState) => ({
			showProduct: false,
			showCustomer: false,
		    showInvoice: false,
			[key]: !prevState[key],
		}));
	};

	const path = window.location.pathname;

	useEffect(() => {
		if (path === '/createproduct' || path === '/productlist') {
			setOpenState({ showProduct: true, showCustomer: false, showInvoice: false });
		} else if (path === '/createcustomer' || path === '/customerlist') {
			setOpenState({ showProduct: false, showCustomer: true, showInvoice: false });
		}else if (path === '/createinvoice' || path === '/invoicelist') {
			setOpenState({ showProduct: false, showCustomer: false, showInvoice: true });
		}
		
	}, []);

	const renderListItems = (key:string, name:string, items:any, icon:any,) => (
	
		<>
			<ListItem
				onClick={() => handleToggle(key)}
				sx={{ background: openState[key] ? 'rgba(13, 110, 253, 0.1)' : 'inherit' }}
				component="div"
				className="list-item-style"
			>
				<ListItemIcon>
					{React.cloneElement(icon, { sx: { color: openState[key] ? 'secondary.main' : 'inherit' } })}
				</ListItemIcon>
				<ListItemText
					primary={
						<Typography variant="h6" color={openState[key] ? 'secondary.main' : 'inherit'} fontWeight="500">
							{name.charAt(0).toUpperCase() + name.slice(1)}
							
						</Typography>
					}
				/>
				{openState[key] ? <ExpandLessIcon sx={{ color: 'secondary.main' }} /> : <ExpandMoreIcon />}
			</ListItem>
			<Collapse in={openState[key]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding sx={{ pl: '15%' }}>
					{items.map((item:any) => (
						<ListItem
							key={item.path}
							sx={{ bgcolor: path === item.path ? 'secondary.main' : 'inherit' }}
							component="div"
							className={`list-item-style ${path!=item.path?"hover":""}`}
							onClick={() => navigation(item.path)}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path === item.path ? '#fff' : '#000'} fontWeight="500">
										{item.label}
									</Typography>
								}
							/>
						</ListItem>
					))}
				</List>
			</Collapse>
		</>
	);

	const drawer = (
		<div>
			<Box
				sx={{
					backgroundColor: "#000",
				}}
			>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							height: 64,
						}}
					>
						<img src={logo} alt="logo" style={{ height: 64, width: 64 }} />
						<Typography variant="h6" color={"#fff"}>
							GROW INVOICE
						</Typography>
					</Box>
				</Toolbar>
			</Box>
			<Divider />
			{/* <List>
				{["Home", "Invoice"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
			{/* <List sx={{ px: "7%" }}>
				<ListItem sx={{ bgcolor: "secondary.main" }} component={"div"} className="list-item-style">
					<ListItemIcon>
						<HomeIcon htmlColor="white" />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6" fontWeight={"500"} color={"#fff"}>
								Home
							</Typography>
						}
					/>
				</ListItem>
				<ListItem
					onClick={handleClick}
					sx={{
						background: open ? "rgba(13, 110, 253, 0.1)" : "inherit",
					}}
					component={"div"}
					className="list-item-style"
				>
					<ListItemIcon>
						<ReceiptIcon sx={{ color: open ? "secondary.main" : "inherit" }} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography
								variant="h6"
								color={open ? "secondary.main" : "inherit"}
								fontWeight={"500"}
							>
								Product
							</Typography>
						}
					/>
					{open ? <ExpandLessIcon sx={{ color: "secondary.main" }} /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: "15%" }}>
						<ListItem
							sx={{ bgcolor: path == "/productlist" ? "secondary.main" : "inherit" }}
							component={"div"}
							className="list-item-style"
							onClick={() => { navigation("/productlist"); }}>
							<ListItemText
								primary={
									<Typography variant="h6" color={path == "/productlist" ? "#fff" : "#000"} fontWeight={"500"}>
										Product List
									</Typography>
								}
							/>
						</ListItem>
						<ListItem
							sx={{ bgcolor: path == "/createproduct" ? "secondary.main" : "inherit" }}
							component={"div"}
							className="list-item-style"
							onClick={() => { navigation("/createproduct"); }}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path == "/createproduct" ? "#fff" : "#000"} fontWeight={"500"}>
										Create Product
									</Typography>
								}
							/>
						</ListItem>
					</List>
				</Collapse>
				<ListItem
					onClick={handleClick1}
					sx={{
						background: open1 ? "rgba(13, 110, 253, 0.1)" : "inherit",
					}}
					component={"div"}
					className="list-item-style"
				>
					<ListItemIcon>
						<ReceiptIcon sx={{ color: open1 ? "secondary.main" : "inherit" }} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography
								variant="h6"
								color={open1 ? "secondary.main" : "inherit"}
								fontWeight={"500"}
							>
								Customer
							</Typography>
						}
					/>
					{open1 ? <ExpandLessIcon sx={{ color: "secondary.main" }} /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={open1} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: "15%" }}>
						<ListItem
							sx={{ bgcolor: path == "/customerlist" ? "secondary.main" : "inherit" }}
							component={"div"}
							className="list-item-style"
							onClick={() => { navigation("/customerlist"); }}>
							<ListItemText
								primary={
									<Typography variant="h6" color={path == "/customerlist" ? "#fff" : "#000"} fontWeight={"500"}>
										Customer List
									</Typography>
								}
							/>
						</ListItem>
						<ListItem
							sx={{ bgcolor: path == "/createcustomer" ? "secondary.main" : "inherit" }}
							component={"div"}
							className="list-item-style"
							onClick={() => { navigation("/createcustomer"); }}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path == "/createcustomer" ? "#fff" : "#000"} fontWeight={"500"}>
										Create Customer
									</Typography>
								}
							/>
						</ListItem>
					</List>
				</Collapse>
				<ListItem
					onClick={handleClick2}
					sx={{
						background: open2 ? "rgba(13, 110, 253, 0.1)" : "inherit",
					}}
					component={"div"}
					className="list-item-style"
				>
					<ListItemIcon>
						<ReceiptIcon sx={{ color: open2 ? "secondary.main" : "inherit" }} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography
								variant="h6"
								color={open2 ? "secondary.main" : "inherit"}
								fontWeight={"500"}
							>
								Invoices
							</Typography>
						}
					/>
					{open2 ? <ExpandLessIcon sx={{ color: "secondary.main" }} /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={open2} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: "15%" }}>
						<ListItem
							sx={{ bgcolor: path == "/invoicelist" ? "secondary.main" : "inherit", color:"#fff" }}
							component={"div"}
							className="list-item-style"
							onClick={() => { navigation("/invoicelist"); }}>
							<ListItemText
								primary={
									<Typography variant="h6" color={path == "/invoicelist" ? "#fff" : "#000"} fontWeight={"500"}>
										Invoice
									</Typography>
								}
							/>
						</ListItem>
						<ListItem
							sx={{ bgcolor: path == "/createinvoice" ? "secondary.main" : "inherit" }}
							component={"div"}
							className="list-item-style"
							onClick={() => { navigation("/createinvoice"); }}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path == "/createinvoice" ? "#fff" : "#000"} fontWeight={"500"}>
										Create Invoice
									</Typography>
								}
							/>
						</ListItem>
					</List>
				</Collapse>
			</List> */}
			{/* <List sx={{ px: '7%' }}>
				<ListItem sx={{ bgcolor: 'secondary.main' }} component="div" className="list-item-style">
					<ListItemIcon>
						<HomeIcon htmlColor="white" />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6" fontWeight="500" color="#fff">
								Home
							</Typography>
						}
					/>
				</ListItem>
				<ListItem
					onClick={() => handleToggle('open')}
					sx={{ background: openState.open ? 'rgba(13, 110, 253, 0.1)' : 'inherit' }}
					component="div"
					className="list-item-style"
				>
					<ListItemIcon>
						<StoreIcon sx={{ color: openState.open ? 'secondary.main' : 'inherit' }} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6" color={openState.open ? 'secondary.main' : 'inherit'} fontWeight="500">
								Product
							</Typography>
						}
					/>
					{openState.open ? <ExpandLessIcon sx={{ color: 'secondary.main' }} /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={openState.open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: '15%' }}>
						<ListItem
							sx={{ bgcolor: path === '/productlist' ? 'secondary.main' : 'inherit' }}
							component="div"
							className="list-item-style"
							onClick={() => navigation('/productlist')}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path === '/productlist' ? '#fff' : '#000'} fontWeight="500">
										Product List
									</Typography>
								}
							/>
						</ListItem>
						<ListItem
							sx={{ bgcolor: path === '/createproduct' ? 'secondary.main' : 'inherit' }}
							component="div"
							className="list-item-style"
							onClick={() => navigation('/createproduct')}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path === '/createproduct' ? '#fff' : '#000'} fontWeight="500">
										Create Product
									</Typography>
								}
							/>
						</ListItem>
					</List>
				</Collapse>
				<ListItem
					onClick={() => handleToggle('open1')}
					sx={{ background: openState.open1 ? 'rgba(13, 110, 253, 0.1)' : 'inherit' }}
					component="div"
					className="list-item-style"
				>
					<ListItemIcon>
						<PeopleIcon sx={{ color: openState.open1 ? 'secondary.main' : 'inherit' }} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6" color={openState.open1 ? 'secondary.main' : 'inherit'} fontWeight="500">
								Customer
							</Typography>
						}
					/>
					{openState.open1 ? <ExpandLessIcon sx={{ color: 'secondary.main' }} /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={openState.open1} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: '15%' }}>
						<ListItem
							sx={{ bgcolor: path === '/customerlist' ? 'secondary.main' : 'inherit' }}
							component="div"
							className="list-item-style"
							onClick={() => navigation('/customerlist')}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path === '/customerlist' ? '#fff' : '#000'} fontWeight="500">
										Customer List
									</Typography>
								}
							/>
						</ListItem>
						<ListItem
							sx={{ bgcolor: path === '/createcustomer' ? 'secondary.main' : 'inherit' }}
							component="div"
							className="list-item-style"
							onClick={() => navigation('/createcustomer')}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path === '/createcustomer' ? '#fff' : '#000'} fontWeight="500">
										Create Customer
									</Typography>
								}
							/>
						</ListItem>
					</List>
				</Collapse>
				<ListItem
					onClick={() => handleToggle('open2')}
					sx={{ background: openState.open2 ? 'rgba(13, 110, 253, 0.1)' : 'inherit' }}
					component="div"
					className="list-item-style"
				>
					<ListItemIcon>
						<ReceiptIcon sx={{ color: openState.open2 ? 'secondary.main' : 'inherit' }} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6" color={openState.open2 ? 'secondary.main' : 'inherit'} fontWeight="500">
								Invoices
							</Typography>
						}
					/>
					{openState.open2 ? <ExpandLessIcon sx={{ color: 'secondary.main' }} /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={openState.open2} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: '15%' }}>
						<ListItem
							sx={{ bgcolor: path === '/invoicelist' ? 'secondary.main' : 'inherit', color: '#fff' }}
							component="div"
							className="list-item-style"
							onClick={() => navigation('/invoicelist')}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path === '/invoicelist' ? '#fff' : '#000'} fontWeight="500">
										Invoice
									</Typography>
								}
							/>
						</ListItem>
						<ListItem
							sx={{ bgcolor: path === '/createinvoice' ? 'secondary.main' : 'inherit' }}
							component="div"
							className="list-item-style"
							onClick={() => navigation('/createinvoice')}
						>
							<ListItemText
								primary={
									<Typography variant="h6" color={path === '/createinvoice' ? '#fff' : '#000'} fontWeight="500">
										Create Invoice
									</Typography>
								}
							/>
						</ListItem>
					</List>
				</Collapse>
			</List> */}
			<List sx={{ px: '7%' }}>
				<ListItem sx={{ bgcolor: path=="/"?"secondary.main":"inherit" }} component="div" className={`list-item-style ${path!="/"?"hover":""}`} onClick={() => {navigation('/'); setOpenState(false)}} >
					<ListItemIcon>
						<HomeIcon htmlColor={path=="/"?"#fff":"inherit"} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6" fontWeight="500" color={path=="/"?"#fff":"#000"}>
								Home
							</Typography>
						}
					/>
				</ListItem>
				{renderListItems( 'showProduct', 'product', [
					{ path: '/productlist', label: 'Product List' },
					{ path: '/createproduct', label: 'Create Product' },
				], <StoreIcon />)}
				{renderListItems( 'showCustomer',  'customer', [
					{ path: '/customerlist', label: 'Customer List' },
					{ path: '/createcustomer', label: 'Create Customer' },
				], <PeopleIcon />)}
				{renderListItems(  'showInvoice', 'invoices', [
					{ path: '/invoicelist', label: 'Invoice' },
					{ path: '/createinvoice', label: 'Create Invoice' },
				], <ReceiptIcon />)}
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: "#000",
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: {
							xs: "space-between",
							md: "flex-end",
						},
						flex: 1,
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settingsWithFunc.map((setting) => (
								<MenuItem
									key={setting?.name}
									onClick={() => {
										setting.func();
										handleCloseUserMenu();
									}}
								>
									<Typography textAlign="center">{setting?.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							backgroundColor: "rgba(246, 250, 255, 1)",
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar></Toolbar>
				{children}
			</Box>
		</Box>
	);
}

export default Sidebar;
