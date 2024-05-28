// import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

export default function MainHome() {
	const navigation = useNavigate();

	const rows = [
		{
			id: 1,
			name: "John Doe",
		},
		{
			id: 2,
			name: "pramsdfas",
		},
	];

	const columns = [
		{
			field: "id",
			headerName: "student id",
		},
		{
			field: "name",
			headerName: "Name",
		},
	];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "primary.main" }}>
						Grow Invoice
					</Typography>
					<Button
						variant="outlined"
						onClick={() => {
							navigation("/login");
						}}
					>
						Login
					</Button>
					<Button
						variant="contained"
						sx={{
							borderRadius: "20px",
							padding: "7px 20px",
						}}
					>
						Signup
					</Button>
					<Button variant="text">Dashboard</Button>
					<Button variant="contained">About</Button>
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					height: "100vh",
				}}
			>
				<DataGrid rows={rows} columns={columns} />
			</Box>
		</Box>
	);
}
