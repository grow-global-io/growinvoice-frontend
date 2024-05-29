import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import MainHomeCard from "../../shared/components/MainHomeCards";
import mainHomeData from "./../../data/MainHomeData.json";
import SalesMan from "./../../assets/img/salesman.png";
import Coin from "./../../assets/img/dollercoin.png";
import File from "./../../assets/img/file.png";
import Folder from "./../../assets/img/folder.png";
import Document from "./../../assets/img/Document.png";
import Dawn from "./../../assets/img/Dawn.png";
import Asterisk from "./../../assets/img/Asterisk.png";
import "./mainhome.css";
import MainNavbar from "../../layout/navbar/Mainpage/MainNavbar";

export default function MainHome() {
	return (
		<Box component={"div"} className="mainpage">
			<MainNavbar />
			<Box>
				<Box sx={{ display: "flex" }} padding={"100px 100px 0 41px"}>
					<Box sx={{ width: "30%" }}>
						<Box textAlign={"end"} paddingRight={"20%"}>
							<img src={Dawn} alt="Dawn-img" />
						</Box>
						<img src={SalesMan} alt="salesman-img" width={"381px"} />
					</Box>
					<Box component={"div"} className="main-heading-div">
						<Typography variant="h1" className="main-heading-text">
							Build the Future with
						</Typography>
						<Typography
							variant="h1"
							className="main-heading-heading"
							sx={{
								color: "secondary.main",
							}}
						>
							Grow Invoice
						</Typography>
						<Typography variant="h6" className="main-heading-para">
							we are team of talented engineers <br /> making apllication at Grow-Global
						</Typography>
						<Box textAlign={"start"} width={"100%"} paddingLeft={"50%"}>
							<img src={Asterisk} alt="asterisk-img" width={"45px"} />
						</Box>
						<Button variant="contained" sx={{ marginTop: "-10px" }}>
							Create your first invoice
						</Button>
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
					{mainHomeData.map((item) => (
						<MainHomeCard
							heading={item.heading}
							text={item.text}
							buttonText={item.buttonText}
							float={item.float}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
}
