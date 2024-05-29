import { Box, Button, Typography } from "@mui/material"


// const MainHomeCardLeft = ({heading,text,buttonText}:{heading:any,text:any,buttonText:any}) => {
//   return (

//     <Box sx={{margin:"60px 0"}}>
//         <Box sx={{width:"719px"}}>
//         <Typography
//         variant="h2"
//         sx={{fontSize:"36px",fontWeight:"600",lineHeight:"54px",color:"#000"}}
//         >{heading}</Typography>
//         <Typography sx={{width:"333px",borderBottom:"4px solid rgba(13, 202, 240, 1)"}}></Typography>
//         <Typography
//          variant="h6"
//          sx={{fontSize:"24px",fontWeight:"400",lineHeight:"40px",width:"719px",color:"#000"}}
//         >{text}</Typography>
//         <Button variant="contained" sx={{marginTop:"20px",width:"30%"}}>{buttonText}</Button>
//         </Box>


//     </Box>


//   )
// }

const MainHomeCard = ({ heading, text, buttonText, float }: { heading: any, text: any, buttonText: any, float: any }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: float, margin: "100px 0" }}>
            <Box sx={{ width: "719px" }}>
                <Typography
                    variant="h2"
                    sx={{ fontSize: "36px", fontWeight: "600", lineHeight: "54px", color: "#000" }}
                >
                    {heading}
                </Typography>
                <Typography sx={{ width: "333px", borderBottomStyle: "solid", borderBottomWidth: "4px", borderImage: "linear-gradient( to right,rgba(13, 202, 240, 1),rgba(13, 110, 253, 1)) 1 stretch", marginBottom: "15px" }}></Typography>
                <Typography
                    variant="h6"
                    sx={{ fontSize: "24px", fontWeight: "400", lineHeight: "40px", color: "#000" }}
                >
                    {text}
                </Typography>
                <Button variant="contained" sx={{ marginTop: "20px", width: "30%" }}>{buttonText}</Button>

            </Box>

        </Box>



    )
}
export default MainHomeCard
