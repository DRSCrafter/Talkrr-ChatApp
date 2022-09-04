import '../../Styles/Components/Sections/sideBar.css';
import React, {useContext} from 'react';
import UserContext from "../../Context/userContext";
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

function SideBar({list, open, onToggle}) {
    const {user} = useContext(UserContext);

    return (
        <>
            <Drawer
                anchor="left"
                open={open}
                onClose={onToggle(false)}
                sx={{backdropFilter: 'blur(10px)'}}
            >
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={onToggle(false)}
                    onKeyDown={onToggle(false)}
                >
                    <div className="drawer-info-container">
                        <div className="user-personal-info">
                            <img src={require('../../Assets/thumbnail (2).png')}
                                 style={{width: 150, height: 150, borderRadius: '50%'}} alt="تصویر کاربر"/>
                            <div className="user-info-name">{user && user.name}</div>
                            <div className="user-info-email">{user && user.email}</div>
                        </div>
                    </div>
                    <Divider/>
                    <List>
                        {list[0].map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={item.onClick}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {list[1].map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={item.onClick}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default SideBar;