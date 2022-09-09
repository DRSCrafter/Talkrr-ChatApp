import '../../Styles/Components/Sections/sideBar.css';
import React, {useContext, useState} from 'react';
import UserContext from "../../Context/userContext";
import PrivateDialog from "../privateDialog";

import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupDialog from "../groupDialog";

function SideBar({open, onToggle}) {
    const {user} = useContext(UserContext);
    const [privateDialog, setPrivateDialog] = useState(false);
    const [groupDialog, setGroupDialog] = useState(false);

    const handleTogglePrivateDialog = () => setPrivateDialog(!privateDialog);
    const handleToggleGroupDialog = () => setGroupDialog(!groupDialog);

    const drawerList1 = [
        {
            text: 'New Private Talk',
            icon: <PersonIcon/>,
            onClick: handleTogglePrivateDialog
        },
        {
            text: 'New Group Talk',
            icon: <PeopleIcon/>,
            onClick: handleToggleGroupDialog
        }
    ];
    const drawerList2 = [
        {
            text: 'Settings',
            icon: <SettingsIcon/>
        },
        {
            text: 'User Preferences',
            icon: <ManageAccountsIcon/>
        }
    ]

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
                        {drawerList1.map((item, index) => (
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
                        {drawerList2.map((item, index) => (
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
            <PrivateDialog open={privateDialog} onClose={handleTogglePrivateDialog}/>
            <GroupDialog open={groupDialog} onClose={handleToggleGroupDialog}/>
        </>
    );
}

export default SideBar;