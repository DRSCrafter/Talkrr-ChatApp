import React from "react";
import '../../Styles/Components/Sections/ContactPanel.css';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from "@mui/material/Button";

function ContactPanel({info}) {
    return (
        <div className="contact-panel-root">
            <div className="contact-panel-container">
                <div className="identity-container">
                    <img src={require('../../Assets/thumbnail (1).png')} className="profile-image"/>
                    <span className="profile-name">{info.name}</span>
                </div>

                {info.email ? <div className="details-container">
                    <div className="profile-details">
                        <AlternateEmailIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>{info.email}</span>
                    </div>
                    {info.phoneNumber &&
                        <div className="profile-details">
                            <PhoneIcon fontSize="medium"/>
                            <span style={{marginLeft: 10,}}>{info.phoneNumber}</span>
                        </div>
                    }
                    <div className="bio">{info.bio}</div>
                </div> : <div></div>}

                <div className="controls-container">
                    <Button className="control-btn" style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <DeleteIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>Delete Talk</span>
                    </Button>
                    {info.isPrivate &&
                        <Button className="control-btn"
                                style={{display: 'flex', justifyContent: 'flex-start', color: 'red'}}>
                            <HighlightOffIcon fontSize="medium"/>
                            <span style={{marginLeft: 10,}}>Remove Contact</span>
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ContactPanel;