import { Box, Button, Typography } from "@mui/material";
const HeroSecton = () => {
	return (
		<Box padding={"50px 100px 0px 41px"}>
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

				<Button variant="contained" sx={{ marginTop: "30px" }}>
					Create your first invoice
				</Button>
			</Box>
		</Box>
	);
};

export default HeroSecton;
