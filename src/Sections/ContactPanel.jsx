import React from "react";
import '../Styles/Sections/ContactPanel.css';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from "@mui/material/Button";

function ContactPanel() {
    return (
        <div className="contact-panel-root">
            <div className="contact-panel-container">
                <div className="identity-container">
                    <img src={require('../Assets/thumbnail (1).png')} className="profile-image"/>
                    <span className="profile-name">John Smith</span>
                </div>

                <div className="details-container">
                    <div className="profile-details">
                        <AlternateEmailIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>Drsprogramming2020@gmail.com</span>
                    </div>
                    <div className="profile-details">
                        <PhoneIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>+989999999999</span>
                    </div>
                    <div className="bio">
                        I don't know who you are. But I'm gonna find you. And I'm gonna kill you!
                    </div>
                </div>

                <div className="controls-container">
                    <Button className="control-btn" style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <DeleteIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>Delete Chat</span>
                    </Button>
                    <Button className="control-btn" style={{display: 'flex', justifyContent: 'flex-start', color: 'red'}}>
                        <HighlightOffIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>Remove Contact</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ContactPanel;