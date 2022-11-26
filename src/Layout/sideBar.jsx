import '../Styles/Layout/sideBar.css';
import React, {useContext, useState} from 'react';
import UserContext from "../Context/userContext";
import PrivateDialog from "../Components/Dialogs/privateDialog";

import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from '@mui/icons-material/Logout';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';

import GroupDialog from "../Components/Dialogs/groupDialog";
import ContactsDialog from "../Components/Dialogs/contactsDialog";
import AboutDialog from "../Components/Dialogs/aboutDialog";

function SideBar({open, onToggle}) {
    const {user} = useContext(UserContext);
    const [privateDialog, setPrivateDialog] = useState(false);
    const [groupDialog, setGroupDialog] = useState(false);
    const [contactDialog, setContactDialog] = useState(false);
    const [aboutDialog, setAboutDialog] = useState(false);

    const handleTogglePrivateDialog = () => setPrivateDialog(!privateDialog);
    const handleToggleGroupDialog = () => setGroupDialog(!groupDialog);
    const handleToggleContactDialog = () => setContactDialog(!contactDialog);
    const handleToggleAboutDialog = () => setAboutDialog(!aboutDialog);

    const chatList = [
        {
            text: 'New Private Chat',
            icon: <PersonIcon/>,
            onClick: handleTogglePrivateDialog
        },
        {
            text: 'New Group Chat',
            icon: <PeopleIcon/>,
            onClick: handleToggleGroupDialog
        }
    ];

    const logout = () => localStorage.removeItem('token');

    const contact = {
        text: 'Contacts',
        icon: <ContactsIcon/>,
        onClick: handleToggleContactDialog
    }

    const aboutButton = {
        text: 'About US',
        icon: <InfoIcon/>,
        onClick: handleToggleAboutDialog
    }

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
                                src={user?.profileImage}
                                style={{width: 180, height: 180, borderRadius: '50%'}}
                                alt="تصویر کاربر"
                            />
                            <div className="user-info-name">{user && user.name}</div>
                            <div className="user-info-email">{user && user.email}</div>
                        </div>
                    </div>
                    <Divider style={{marginBlock: 10}}/>
                    <List>
                        {chatList.map((chat, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={chat.onClick}>
                                    <ListItemIcon>
                                        {chat.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={chat.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider style={{marginBlock: 10}}/>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={contact.onClick}>
                                <ListItemIcon>
                                    {contact.icon}
                                </ListItemIcon>
                                <ListItemText primary={contact.text}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={aboutButton.onClick}>
                                <ListItemIcon>
                                    {aboutButton.icon}
                                </ListItemIcon>
                                <ListItemText primary={aboutButton.text}/>
                            </ListItemButton>
                        </ListItem>
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
            <ContactsDialog open={contactDialog} onClose={handleToggleContactDialog}/>
            <AboutDialog open={aboutDialog} onClose={handleToggleAboutDialog}/>
        </>
    );
}

export default SideBar;