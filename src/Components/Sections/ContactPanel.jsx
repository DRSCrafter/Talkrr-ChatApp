import '../../Styles/Components/Sections/ContactPanel.css';
import React, {useContext, useEffect, useState} from "react";

import Button from "@mui/material/Button";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';

import TalkContext from "../../Context/talkContext";
import UserContext from "../../Context/userContext";
import {processTalkData} from "../../utils/talkHandling";

function ContactPanel() {
    const [talkInfo, setTalkInfo] = useState({});
    const {currentTalk} = useContext(TalkContext);
    const {user} = useContext(UserContext);

    useEffect(() => {
        processTalkData(user, currentTalk).then(res => setTalkInfo(res));
    }, [currentTalk]);

    return (
        <div className="contact-panel-root">
            <div className="contact-panel-container">
                <div className="identity-container">
                    <img src={require('../../Assets/thumbnail (1).png')} className="profile-image"/>
                    <span className="profile-name">{talkInfo && talkInfo.name}</span>
                </div>

                {talkInfo && talkInfo.email ? <div className="details-container">
                    <div className="profile-details">
                        <AlternateEmailIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>{talkInfo && talkInfo.email}</span>
                    </div>
                    {talkInfo && talkInfo.phoneNumber &&
                        <div className="profile-details">
                            <PhoneIcon fontSize="medium"/>
                            <span style={{marginLeft: 10,}}>{talkInfo && talkInfo.phoneNumber}</span>
                        </div>
                    }
                    <div className="bio">{talkInfo && talkInfo.bio}</div>
                </div> : <div></div>}

                <div className="controls-container">
                    <Button className="control-btn" style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <DeleteIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>Delete Talk</span>
                    </Button>
                    {talkInfo && talkInfo.isPrivate ?
                        <Button className="control-btn"
                                style={{display: 'flex', justifyContent: 'flex-start', color: 'red'}}>
                            <HighlightOffIcon fontSize="medium"/>
                            <span style={{marginLeft: 10,}}>Remove Contact</span>
                        </Button> :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default ContactPanel;