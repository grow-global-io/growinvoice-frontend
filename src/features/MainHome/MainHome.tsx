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
import MainHomeCard from "../../shared/components/MainHomeCards";
import mainHomeData from './../../data/MainHomeData.json'
import SalesMan from './../../assets/img/salesman.png'
import Coin from './../../assets/img/dollercoin.png'
import File from './../../assets/img/file.png'
import Folder from './../../assets/img/folder.png'
import Document from './../../assets/img/Document.png'
import Dawn from './../../assets/img/Dawn.png'
import Asterisk from './../../assets/img/Asterisk.png'

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
			<Box>
				<Box
					sx={{ display: "flex" }} padding={"100px 100px 0 41px"}
				>
					<Box
						sx={{ width: "30%" }}
					>
						<Box textAlign={"end"} paddingRight={"20%"}>
							<img src={Dawn} alt="Dawn-img" />
						</Box>
						<img src={SalesMan} alt="salesman-img" width={"381px"} />
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							padding: "30px 0",
							width: "50%"
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
						<Box textAlign={"start"} width={"100%"} paddingLeft={'50%'}><img src={Asterisk} alt="asterisk-img" width={"45px"} /></Box>
						<Button variant="contained" sx={{ marginTop: "-10px" }}>Create your first invoice</Button>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", width: "20%" }}>
						<Box textAlign={"end"} width={"100%"}>
							<img src={File} alt="file-img" width={"169px"} />
						</Box>
						<Box>
							<img src={Coin} alt="coin-img" width={"138px"} />
						</Box>
						<Box textAlign={"end"} position={"relative"}>
							<img src={Folder} alt="Folder-img" width={"138px"} />
							<img src={Document} alt="document-img" className="abosolute" />
						</Box>

					</Box>

				</Box>

				<Box sx={{ padding: "50px 100px" }}>
					{
						mainHomeData.map(item => <MainHomeCard heading={item.heading} text={item.text} buttonText={item.buttonText} float={item.float} />)

					}
				</Box>

			</Box>


		</Box>

	);
}
