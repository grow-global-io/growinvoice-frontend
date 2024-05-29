import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainNavbar = () => {
	const navigation = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div">
					Grow Invoice
				</Typography>
				<Box component={"div"} className="menu-items">
					<List component="nav" sx={{ display: "flex" }}>
						<ListItem>
							<ListItemText primary="Home" />
						</ListItem>

						<ListItem>
							<ListItemText primary="About" />
						</ListItem>

						<ListItem>
							<ListItemText primary="Features" />
						</ListItem>

						<ListItem>
							<ListItemText primary="Services" />
						</ListItem>

						<ListItem>
							<ListItemText primary="Pricing" />
						</ListItem>
						<ListItem>
							<ListItemText primary="Contact" />
						</ListItem>
					</List>
				</Box>
				<Box>
					<Button
						variant="outlined"
						onClick={() => {
							navigation("/login");
						}}
					>
						Login
					</Button>
					<Button variant="contained">Signup</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default MainNavbar;
