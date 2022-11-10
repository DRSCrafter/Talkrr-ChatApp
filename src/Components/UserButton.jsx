import '../Styles/Components/UserButton.css';
import React, {useContext, useEffect, useState} from "react";
import TalkContext from "../Context/talkContext";
import ContextMenu from "./contextMenu";

import Button from "@mui/material/Button";
import PushPinIcon from '@mui/icons-material/PushPin';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const {apiEndpoint} = require("../config.json");

function UserButton({talk, Pin, onPin, onUnpin, onDelete, triggered}) {
    const {confirmRead, disconnectLastRoom} = useContext(TalkContext);

    const [contextMenu, setContextMenu] = React.useState(null);
    const [newMessage, setNewMessage] = useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
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
        onClick: () => onPin(talk.id)
    }
    const unpinContext = {
        text: "Unpin",
        icon: <WrongLocationIcon style={styles.menuItem}/>,
        onClick: () => onUnpin(talk.id)
    }

    const deleteTalk = {
        text: "Delete Talk",
        icon: <DeleteIcon style={styles.menuItem}/>,
        onClick: () => onDelete(talk.id)
    }
    const leaveGroup = {
        text: "Leave Group",
        icon: <LogoutIcon style={styles.menuItem}/>,
        onClick: () => onDelete(talk.id)
    }

    const contextPin = Pin ? unpinContext : pinContext;
    const contextDelete = talk.isPrivate ? deleteTalk : leaveGroup;

    const contextList = [
        contextPin,
        contextDelete
    ]

    const {setTalkID} = useContext(TalkContext);

    const handleClick = () => {
        disconnectLastRoom();
        confirmRead(talk.id);
        setTalkID(talk.id);
    }

    useEffect(() => {
        setNewMessage(triggered);
    }, [triggered]);

    return (
        <>
            <Button className="user-button-container" style={styles.sideUserContainer} onClick={handleClick}
                    onContextMenu={handleContextMenu}>
                <span className="user-button-profile-image-container">
                    <img src={`${apiEndpoint}/${talk?.talkImage}`} className="user-button-profile-image"
                         alt="user profile"/>
                </span>
                <span className="user-button-profile-text">
                    <div className="user-button-profile-name">{talk.name}</div>
                    <div className="user-button-profile-message">
                        {talk.isPrivate ? 'Private Talk' : `${talk.members.length} members`}
                    </div>
                </span>
                {Pin && <PushPinIcon fontSize={"small"} style={styles.pin}/>}
                {newMessage && <AnnouncementIcon fontSize={"small"} style={{...styles.pin, ...styles.trigger}}/>}
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