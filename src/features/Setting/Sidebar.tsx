import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const MenuLists = [
		{
			menuName: "My profile",
			path: "/setting/myprofile",
		},
		{
			menuName: "Membership",
			path: "/setting/membership",
		},
		{
			menuName: "Company",
			path: "/setting/company",
		},
		{
			menuName: "Preferences",
			path: "/setting/preferences",
		},
		{
			menuName: "Invoices",
			path: "/setting/invoices",
		},
		{
			menuName: "Products",
			path: "/setting/productunit",
		},
		{
			menuName: "HSN Code",
			path: "/setting/hsncode",
		},
		{
			menuName: "Tax Types",
			path: "/setting/taxtype",
		},
		{
			menuName: "API Credentials",
			path: "/setting/apicredentials",
		},
	];

	return (
		<Box
			width={{ xs: "100%", lg: "230px" }}
			height={"100%"}
			display={"flex"}
			flexDirection={"column"}
		>
			<List
				sx={{ borderRight: "2px solid", borderColor: "custom.settingSidebarBorder", flexGrow: 1 }}
			>
				{MenuLists.map((item, index) => (
					<ListItem
						key={index}
						onClick={() => {
							navigate(item.path);
						}}
						sx={{ my: 0 }}
					>
						<ListItemText
							primary={
								<Typography
									variant="h6"
									color={pathname == item.path ? "custom.primary" : "secondary.dark"}
									fontWeight={500}
									sx={{
										bgcolor: pathname == item.path ? "custom.lightBlue" : "",
										py: 1,
										px: 2,
										borderRadius: 1.5,
										width: "70%",
										cursor: "pointer",
									}}
								>
									{item.menuName}
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Sidebar;
