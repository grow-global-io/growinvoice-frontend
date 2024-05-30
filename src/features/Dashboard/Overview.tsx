import { Box, Typography } from "@mui/material"
import Sidebar from "./Sidebar"
import ExpensesSummary from "./ExpensesSummary";
import './Dashbaod.css'
const Overview = () => {
    return (
        <Box sx={{ display: 'flex' }}> 
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} padding={"20px 50px"}>
                <Typography variant="h3" fontWeight={"500"} textTransform={"capitalize"} mb={"10px"}>Overview</Typography>
                <ExpensesSummary />
            </Box>
        </Box>
    );
}

export default Overview
