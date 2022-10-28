import '../../Styles/Components/Sections/ContactPanel.css';
import React, {useContext, useEffect, useState} from "react";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';

import TalkContext from "../../Context/talkContext";
import UserContext from "../../Context/userContext";
import {handleDeletePrivateTalk, handleLeaveGroupTalk, processTalkData}
    from "../../utils/talkHandling";
import ControlSection from "../controlSection";

const {apiEndpoint} = require("../../config.json");

function ContactPanel() {
    const [talkInfo, setTalkInfo] = useState({});
    const {setTalkID, currentTalk} = useContext(TalkContext);
    const {user, handleUpdateUser} = useContext(UserContext);

    useEffect(() => {
        processTalkData(user, currentTalk).then(res => setTalkInfo(res));
    }, [currentTalk]);

    const deletePrivateTalk = async () => {
        await handleDeletePrivateTalk(talkInfo.id, user, handleUpdateUser);
        setTalkID('');
    }
    const leaveGroupTalk = async () => {
        await handleLeaveGroupTalk(talkInfo.id, user, handleUpdateUser);
        setTalkID('');
    }

    return (
        <div className="contact-panel-root">
            <div className="contact-panel-container">
                <div className="identity-container">
                    <img src={`${apiEndpoint}/${talkInfo?.talkImage}`} className="profile-image"/>
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
                    <div className="bio">{talkInfo && talkInfo.about}</div>
                </div> : <div></div>}

                <ControlSection
                    talkInfo={talkInfo}
                    onDeletePrivate={deletePrivateTalk}
                    onLeaveGroup={leaveGroupTalk}
                />
            </div>
        </div>
    );
}

export default ContactPanel;