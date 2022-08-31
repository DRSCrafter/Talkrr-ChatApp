import '../Styles/Components/UserButton.css';
import React from "react";
import Button from "@mui/material/Button";
import {useContext} from "react";
import TalkContext from "../Context/talkContext";

function UserButton({talk}) {

    return (
        <Button className="user-button-container" style={styles.sideUserContainer}>
            <span className="user-button-profile-image-container">
                <img src={require('../Assets/thumbnail (1).png')} className="user-button-profile-image"/>
            </span>
            <span className="user-button-profile-text">
                <div className="user-button-profile-name">{talk.name}</div>
                <div className="user-button-profile-message">{talk.lastMessage}</div>
            </span>
        </Button>)
}

const styles = {
    sideUserContainer: {
        backgroundColor: 'rgba(256, 256, 256, 0.4)',
        color: '#ffffff',
        margin: '10px auto auto',
        borderRadius: 10,
        padding: 0,
    },
};

export default UserButton;