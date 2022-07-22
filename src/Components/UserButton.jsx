import '../Styles/Components/UserButton.css';
import React from "react";
import Button from "@mui/material/Button";

function UserButton() {
    return (
        <Button className="user-button-container" style={styles.sideUserContainer}>
            <img src={require('../Assets/thumbnail (1).png')} className="user-button-profile-image"/>
            <span className="user-button-profile-text">
                <div className="user-button-profile-name">John Smith</div>
                <div className="user-button-profile-message">Yo man what's up...</div>
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