import { Box, Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

function Sidebar() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{ width: 264, flexShrink: 0, }} // Set the width of the sidebar
        >
            <Box sx={{ width: 264, height: "100%" }} component={"div"} className='sidebar-bg' >
                <List sx={{ px: "7%" }}>
                    <ListItem sx={{}} component={"div"} className='list-item-style'>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="h6" fontWeight={"400"}>
                                    Home
                                </Typography>
                            }
                        />
                    </ListItem >
                    <ListItem
                        onClick={handleClick}
                        sx={{
                            background: open ? "rgba(13, 110, 253, 0.1)" : "inherit",
                        }}
                        component={"div"}
                        className='list-item-style'>
                        <ListItemIcon>
                            <ReceiptIcon htmlColor={open ? "rgba(13, 110, 253, 1)" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="h6" color={open ? "rgba(13, 110, 253, 1)" : "inherit"} fontWeight={"400"}>
                                    Invoices
                                </Typography>
                            }
                        />
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ pl: "15%" }}>
                            <ListItem sx={{}} component={"div"} className='list-item-style'>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" fontWeight={"400"}>
                                            Invoice
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem sx={{ bgcolor: "secondary.main" }} component={"div"} className='list-item-style'>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" color={"#fff"} fontWeight={"400"}>
                                            Create Invoice
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Collapse>

                </List>
            </Box>
        </Drawer>


    );
}


export default Sidebar;
