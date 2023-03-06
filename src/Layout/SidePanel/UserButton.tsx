import '../../Styles/Layout/SidePanel/UserButton.css';
import React, {useContext, useEffect, useState} from "react";
import ChatContext from "../../Context/chatContext.js";
import ContextMenu from "../../Components/contextMenu.js";

import Button from "@mui/material/Button";
import PushPinIcon from '@mui/icons-material/PushPin';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import {LazyLoadImage} from "react-lazy-load-image-component";
import UserButtonProps from "../../types/layout/sidePanel/userButton";

import undefinedUser from "../../Assets/undefinedUser.jpg";
import undefinedGroup from "../../Assets/undefinedGroup.jpg";

function UserButton({chat, Pin, onPin, onUnpin, onDelete, triggered}: UserButtonProps) {
    const {confirmRead, disconnectLastRoom} = useContext(ChatContext);

    const [contextMenu, setContextMenu] = React.useState(null);
    const [newMessage, setNewMessage] = useState(false);

    const handleContextMenu = (event: React.MouseEvent<any>) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    // @ts-ignore
                    mouseX: event.clientX,
                    mouseY: event.clientY,
                }
                : null
        );
    };
    const handleClose = () => {
        setContextMenu(null);
    };

    const pinContext = {
        text: "Pin",
        icon: <PushPinIcon style={styles.menuItem}/>,
        onClick: () => onPin(chat.id)
    }
    const unpinContext = {
        text: "Unpin",
        icon: <WrongLocationIcon style={styles.menuItem}/>,
        onClick: () => onUnpin(chat.id)
    }

    const deleteChat = {
        text: "Delete Chat",
        icon: <DeleteIcon style={styles.menuItem}/>,
        onClick: () => onDelete(chat.id)
    }
    const leaveGroup = {
        text: "Leave Group",
        icon: <LogoutIcon style={styles.menuItem}/>,
        onClick: () => onDelete(chat.id)
    }

    const contextPin = Pin ? unpinContext : pinContext;
    const contextDelete = chat.isPrivate ? deleteChat : leaveGroup;

    const contextList = [
        contextPin,
        contextDelete
    ]

    const {setChatID} = useContext(ChatContext);

    const handleClick = () => {
        disconnectLastRoom();
        confirmRead(chat.id);
        setChatID(chat.id);
    }

    useEffect(() => {
        setNewMessage(triggered);
    }, [triggered]);

    return (
        <>
            <Button
                className="user-button-container"
                style={(styles.sideUserContainer as React.CSSProperties)}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
            >
                <span className="user-button-profile-image-container">
                    <LazyLoadImage
                        src={chat?.chatImage ? chat?.chatImage : chat?.defaultImage}
                        placeholderSrc={chat?.isPrivate ? undefinedUser : undefinedGroup}
                        className="user-button-profile-image"
                    />
                </span>
                <span className="user-button-profile-text">
                    <div className="user-button-profile-name">{chat.name}</div>
                    <div className="user-button-profile-message">
                        {chat.isPrivate ? 'Private Chat' : `${chat.members.length} members`}
                    </div>
                </span>
                {Pin && <PushPinIcon fontSize={"small"} style={(styles.pin as React.CSSProperties)}/>}
                {newMessage &&
                    <AnnouncementIcon
                        fontSize={"small"}
                        style={({...styles.pin, ...styles.trigger} as React.CSSProperties)}
                    />
                }
            </Button>
            <ContextMenu list={contextList} onClose={handleClose} onContext={contextMenu}/>
        </>
    )
}

const styles = {
    sideUserContainer: {
        backgroundColor: 'rgba(256, 256, 256, 0.4)',
        color: '#ffffff',
        margin: '10px auto auto',
        borderRadius: 10,
        paddingLeft: 15,
        position: 'relative'
    },
    pin: {
        position: "absolute",
        bottom: 10,
        right: 10,
        color: 'rgba(255,255,255,0.4)'
    },
    trigger: {
        top: 10,
    },
    menuItem: {marginRight: 15, padding: 5}
};

export default UserButton;