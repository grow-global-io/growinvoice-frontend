import { Box, Button, Typography } from "@mui/material";

const MainHomeCard = ({
	heading,
	text,
	buttonText,
	float,
}: {
	heading: string;
	text: string;
	buttonText: string;
	float: string;
}) => {
	return (
		<Box sx={{ display: "flex", justifyContent: float, margin: "100px 0" }}>
			<Box sx={{ width: "719px" }}>
				<Typography
					variant="h2"
					sx={{ fontSize: "36px", fontWeight: "600", lineHeight: "54px", color: "secondary.dark" }}
				>
					{heading}
				</Typography>
				<Typography
					sx={{
						width: "333px",
						borderBottomStyle: "solid",
						borderBottomWidth: "4px",
						borderImage:
							"linear-gradient( to right,rgba(13, 202, 240, 1),rgba(13, 110, 253, 1)) 1 stretch",
						marginBottom: "15px",
					}}
				></Typography>
				<Typography
					variant="h6"
					sx={{ fontSize: "24px", fontWeight: "400", lineHeight: "40px", color: "secondary.dark" }}
				>
					{text}
				</Typography>
				<Button variant="contained" sx={{ marginTop: "20px", width: "30%" }}>
					{buttonText}
				</Button>
			</Box>
		</Box>
	);
};
export default MainHomeCard;
