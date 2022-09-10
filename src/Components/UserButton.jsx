import '../Styles/Components/UserButton.css';
import React, {useContext} from "react";
import TalkContext from "../Context/talkContext";
import ContextMenu from "./contextMenu";

import Button from "@mui/material/Button";
import PushPinIcon from '@mui/icons-material/PushPin';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';

function UserButton({talk, Pin, onPin, onUnpin, onDelete}) {
    const [contextMenu, setContextMenu] = React.useState(null);

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
        setTalkID(talk.id);
    }

    return (
        <>
            <Button className="user-button-container" style={styles.sideUserContainer} onClick={handleClick}
                    onContextMenu={handleContextMenu}>
                <span className="user-button-profile-image-container">
                    <img src={require('../Assets/thumbnail (1).png')} className="user-button-profile-image"
                         alt="user profile"/>
                </span>
                <span className="user-button-profile-text">
                    <div className="user-button-profile-name">{talk.name}</div>
                    <div className="user-button-profile-message">last message here</div>
                </span>
                {Pin && <PushPinIcon fontSize={"small"} style={styles.pin}/>}
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
        top: 10,
        right: 10,
        color: 'rgba(255,255,255,0.4)'
    },
    menuItem: {marginRight: 15, padding: 5}
};

export default UserButton;