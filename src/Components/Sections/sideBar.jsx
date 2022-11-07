import '../../Styles/Components/Sections/sideBar.css';
import React, {useContext, useState} from 'react';
import UserContext from "../../Context/userContext";
import PrivateDialog from "../privateDialog";

import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from '@mui/icons-material/Logout';
import ContactsIcon from '@mui/icons-material/Contacts';

import GroupDialog from "../groupDialog";

const {apiEndpoint} = require('../../config.json');

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

    const logout = () => localStorage.removeItem('token');

    const drawerList2 = [
        {
            text: 'Contacts',
            icon: <ContactsIcon/>,
            onClick: logout
        },
    ]

    const logoutButton = {
        text: 'Logout',
        icon: <LogoutIcon htmlColor="red"/>,
        onClick: logout
    }

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
                            <img
                                src={`${apiEndpoint}/${user?.profileImage}`}
                                style={{width: 180, height: 180, borderRadius: '50%'}}
                                alt="تصویر کاربر"
                            />
                            <div className="user-info-name">{user && user.name}</div>
                            <div className="user-info-email">{user && user.email}</div>
                        </div>
                    </div>
                    <Divider style={{marginBlock: 10}}/>
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
                    <Divider style={{marginBlock: 10}}/>
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
                    <ListItem disablePadding style={{position: 'absolute', bottom: 10, color: 'red'}}>
                        <ListItemButton onClick={logoutButton.onClick}>
                            <ListItemIcon>
                                {logoutButton.icon}
                            </ListItemIcon>
                            <ListItemText primary={logoutButton.text}/>
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Drawer>
            <PrivateDialog open={privateDialog} onClose={handleTogglePrivateDialog}/>
            <GroupDialog open={groupDialog} onClose={handleToggleGroupDialog}/>
        </>
    );
}

export default SideBar;