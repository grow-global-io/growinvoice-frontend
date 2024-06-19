import * as React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	Button,
	Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const menuItems = ["Home", "About", "Features", "Services", "Pricing", "Contact"];

const NavButton = ({ text, variant, path }: { text: string; variant: any; path: string }) => {
	const navigate = useNavigate();
	return (
		<Button
			variant={variant}
			onClick={() => {
				navigate(path);
			}}
			sx={{ my: { xs: 1, lg: 0 }, mx: { xs: 0, lg: 1 } }}
		>
			{text}
		</Button>
	);
};

const DrawerList = () => (
	<Box sx={{ width: { sm: "200px" } }} role="presentation" p={2}>
		<Toolbar sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
			<Typography variant="h6">Grow Invoice</Typography>
			<Box component={"div"}>
				<List component="nav" sx={{ display: "flex", flexDirection: "column" }}>
					{menuItems.map((item) => (
						<ListItem key={item}>
							<ListItemText primary={item} />
						</ListItem>
					))}
				</List>
			</Box>
			<Box display={"flex"} flexDirection={"column"}>
				<NavButton text="Login" variant="outlined" path="/login" />
				<NavButton text="Signup" variant="contained" path="/register" />
			</Box>
		</Toolbar>
	</Box>
);

const MainNavbar = () => {
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const toggleDrawer = (open: any) => () => {
		setDrawerOpen(open);
	};

	return (
		<>
			<AppBar position="static">
				<Box py={0.5} ml={1} sx={{ display: { xs: "block", lg: "none" } }}>
					<MenuIcon htmlColor="#000" onClick={toggleDrawer(true)} />
				</Box>
				<Toolbar sx={{ display: { xs: "none", lg: "flex" } }}>
					<Typography variant="h3">Grow Invoice</Typography>
					<Box component={"div"} className="menu-items" sx={{ flexGrow: 1, display: "flex" }}>
						<List component="nav" sx={{ display: "flex" }}>
							{menuItems.map((item) => (
								<ListItem key={item}>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</List>
					</Box>
					<Box>
						<NavButton text="Login" variant="outlined" path="/login" />
						<NavButton text="Signup" variant="contained" path="/register" />
					</Box>
				</Toolbar>
			</AppBar>

			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				<DrawerList />
			</Drawer>
		</>
	);
};

export default MainNavbar;
