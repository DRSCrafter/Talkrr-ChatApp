import '../../Styles/Components/Sections/ContactPanel.css';
import React, {useContext, useEffect, useState} from "react";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';

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
                    <img
                        src={talkInfo?.talkImage ? `${apiEndpoint}/${talkInfo?.talkImage}` : talkInfo?.defaultImage}
                        className="profile-image"
                    />
                    <span className="profile-name">{talkInfo?.name}</span>
                </div>

                <div className="details-container">
                    {talkInfo?.isPrivate &&
                        <>
                            <div className="profile-details">
                                <AlternateEmailIcon fontSize="medium"/>
                                <span style={{marginLeft: 10,}}>{talkInfo?.email}</span>
                            </div>
                            {talkInfo?.phoneNumber &&
                                <div className="profile-details">
                                    <PhoneIcon fontSize="medium"/>
                                    <span style={{marginLeft: 10,}}>{talkInfo?.phoneNumber}</span>
                                </div>
                            }
                        </>
                    }
                    <div className="profile-details">
                        <InfoIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>{talkInfo?.about}</span>
                    </div>
                </div>

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