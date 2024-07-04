import {
	Button,
	Card,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const style = {
	color: "secondary.dark",

	borderRadius: 1.5,
};

interface MembershipCardProps {
	packValue: string;
	duration: string;
	list: Array<string>;
	packValuePer: string;
	key: number;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
	packValue,
	duration,
	list,
	packValuePer,
	key,
}) => {
	return (
		<Card
			sx={{
				alignItems: "stretch",
				height: "100%",
				border: "1px solid",
				borderColor: "custom.settingSidebarBorder",
			}}
		>
			<Grid container sx={style} key={key}>
				<Typography variant="h6" textAlign={"start"} p={3}>
					Demo
				</Typography>
				<Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
					<Typography variant="h3">{packValue}</Typography> /
					<Typography variant="body2">{packValuePer}</Typography>
				</Grid>
				<Grid item xs={12} textAlign={"center"} mb={2}>
					<Typography variant="h5">{duration}</Typography>
				</Grid>
				<List>
					{list.map((item, index) => (
						<ListItem key={index}>
							<ListItemIcon sx={{ minWidth: "30px" }}>
								<CheckIcon sx={{ color: "custom.greenCheck" }} />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="h5" color={"secondary.dark"} fontWeight={500} ml={0}>
										{item}
									</Typography>
								}
							/>
						</ListItem>
					))}
				</List>
				<Grid item xs={12} sm={12} textAlign={"center"} mt={2} pb={2}>
					<Button variant="outlined">Upgrade</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default MembershipCard;
