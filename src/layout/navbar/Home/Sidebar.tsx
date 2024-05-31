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
import './Home.css'
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/logo.svg";
import { useAuthStore } from "../../../store/auth";
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;
function Sidebar({ children }: { children: React.ReactNode }) {
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

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

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
			<List sx={{ px: "7%"}} >
				<ListItem sx={{ bgcolor: "secondary.main" }} component={"div"} className='list-item-style'>
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
				</ListItem >
				<ListItem
					onClick={handleClick}
					sx={{
						background: open ? "rgba(13, 110, 253, 0.1)" : "inherit",
					}}
					component={"div"}
					className='list-item-style'>
					<ListItemIcon>
						<ReceiptIcon  sx={{ color:open ?  "secondary.main"  : "inherit"}} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6" color={open ?  "secondary.main"  : "inherit"} fontWeight={"500"}>
								Invoices
							</Typography>
						}
					/>
					{open ? <ExpandLessIcon sx={{ color: "secondary.main" }} /> : <ExpandMoreIcon />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ pl: "15%" }}>
						<ListItem sx={{}} component={"div"} className='list-item-style'>
							<ListItemText
								primary={
									<Typography variant="h6" fontWeight={"500"}>
										Invoice
									</Typography>
								}
							/>
						</ListItem>
						<ListItem sx={{ bgcolor: "secondary.main" }} component={"div"} className='list-item-style'>
							<ListItemText
								primary={
									<Typography variant="h6" color={"#fff"} fontWeight={"500"}>
										Create Invoice
									</Typography>
								}
							/>
						</ListItem>
					</List>
				</Collapse>

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
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth ,backgroundColor:"rgba(246, 250, 255, 1)"},
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
