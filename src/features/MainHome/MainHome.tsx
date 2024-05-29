// import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export default function MainHome() {
	const navigation = useNavigate();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div">
						Grow Invoice
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
							flexGrow: 1,
						}}
					>
						<List component="nav" aria-label="mailbox folders" sx={{ display: "flex" }}>
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

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: "30px 0",
				}}
			>
				<Typography
					variant="h1"
					sx={{
						color: "#000",
						textAlign: "center",
						fontSize: "48px",
						fontWeight: "500",
						lineHeight: "20px",
					}}
				>
					Build the Future with
				</Typography>
				<Typography
					variant="h1"
					sx={{
						color: "secondary.main",
						fontSize: "98px",
						fontWeight: "800",
						textAlign: "center",
						lineHeight: "130px",
					}}
				>
					Grow Invoice
				</Typography>
				<Typography
					variant="h6"
					sx={{
						color: "#000",
						textAlign: "center",
						fontSize: "24px",
						fontWeight: "400",
						lineHeight: "36px",
					}}
				>
					we are team of talented engineers <br /> making apllication at Grow-Global
				</Typography>
				<Button variant="contained">Create your first invoice</Button>
			</Box>
		</Box>
	);
}
