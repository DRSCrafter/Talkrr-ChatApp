import '../../Styles/Components/Sections/ContactPanel.css';
import React, {useContext, useEffect, useState} from "react";

import Button from "@mui/material/Button";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';

import httpConnection from "../../utils/httpConnection";
import TalkContext from "../../Context/talkContext";
import UserContext from "../../Context/userContext";

const {apiEndpoint} = require('../../config.json');

function ContactPanel() {
    const [talkInfo, setTalkInfo] = useState({});
    const {currentTalk} = useContext(TalkContext);
    const {user} = useContext(UserContext);

    const getTalkData = async () => {
        const {_id, name, about, isPrivate, members} = currentTalk;

        if (isPrivate) {
            let userID = null;
            for (let member of members) {
                if (member.id != user._id) {
                    userID = member.id;
                    break;
                }
            }
            const userInfo = await httpConnection.get(`${apiEndpoint}/api/users/strict/${userID}`);
            return setTalkInfo({id: currentTalk._id, isPrivate: isPrivate, ...userInfo.data});
        }

        return setTalkInfo({id: _id, name: name, about: about, isPrivate: isPrivate});
    }

    useEffect(() => {
        getTalkData();
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