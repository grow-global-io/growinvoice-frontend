import { Box, Typography } from "@mui/material"

const OverviewCard = ({name,img}:{name:string,img:string}) => {
    return (
        <Box display={"flex"} width={"25%"} border={"1px solid #EEEEEE"} padding={"16px"} borderRadius={"4px"} component={"div"} className="gray">
            <Box width={"70%"}>
                <Typography variant="h3" fontWeight={'500'}>$32.5k</Typography>
                <Typography variant="h6" fontWeight={"500"} sx={{my:"10px"}}>{name}</Typography>
            </Box>
            <Box justifyContent={"end"} width={"30%"} display={"flex"} alignItems={"center"}><img src={img} alt="group-user-img" /></Box>

        </Box>
    )
}

export default OverviewCard
