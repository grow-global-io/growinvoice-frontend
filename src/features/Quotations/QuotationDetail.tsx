import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
	MoreVertOutlined,
	FileDownloadOutlined,
	EmailOutlined,
	CreateOutlined,
} from "@mui/icons-material";
const styles = {
	py: 1,
	px: 3,
	color: "secondary.dark",
	fontWeight: 500,
	textTransform: "capitalize",
	my: { xs: 1 },
};

const QuotationDetail = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const [htmlContent, setHtmlContent] = useState<string>("");

	useEffect(() => {
		fetch("./../../../public/quotationtemplate/Template_1.html")
			.then((response) => response.text())
			.then((data) => setHtmlContent(data));

		const loadCSS = (href: string) => {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = href;
			document.head.appendChild(link);
		};

		loadCSS("./../../../public/quotationtemplate/style/style.css");
	}, []);
	const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const menuLists = [
		{ name: "Share", func: () => console.log("Share") },
		{ name: "Marked Paid", func: () => console.log("Marked Paid") },
		{ name: "Mark Send", func: () => console.log("Mark Send") },
		{ name: "Delete", func: () => console.log("Delete") },
	];
	const buttonList = [
		{
			name: "Download",
			icon: FileDownloadOutlined,
			func: () => console.log("Download"),
		},
		{
			name: "Send Mail",
			icon: EmailOutlined,
			func: () => console.log("Send Mail"),
		},
		{
			name: "Convert to invoice",
			icon: "WhatsApp",
			func: () => console.log("Send Whatsapp"),
		},
		{
			name: "Edit",
			icon: CreateOutlined,
			func: () => console.log("Edit"),
		},

		{
			name: "",
			icon: MoreVertOutlined,
			func: handleMoreClick,
		},
	];
	return (
		<>
			<Typography variant="h3" color={"secondary.dark"} mb={3}>
				#INV-000001
			</Typography>
			<ButtonGroup
				sx={{
					width: "100%",
					bgcolor: "custom.transparentWhite",
					display: "flex",
					// flexDirection: { xs: "column", sm: "row" },
					flexWrap: { xs: "wrap" },
					my: 2,
				}}
				variant="text"
				aria-label="Basic button group"
			>
				{buttonList.map((item, index) => (
					<Button sx={styles} onClick={item.func} key={index}>
						<item.icon sx={{ mr: 1 }} />
						{item.name}
					</Button>
				))}
			</ButtonGroup>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{menuLists.map((item, index) => (
					<MenuItem
						onClick={() => {
							item.func();
							handleClose();
						}}
						sx={{ pr: 6 }}
						key={index}
					>
						{item.name}
					</MenuItem>
				))}
			</Menu>
			<Box display={"flex"} justifyContent={"center"} mt={4}>
				<Box sx={{ width: { xs: "85vw", sm: "70vw" }, overflowX: { xs: "scroll", sm: "visible" } }}>
					<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
				</Box>
			</Box>
		</>
	);
};

export default QuotationDetail;
