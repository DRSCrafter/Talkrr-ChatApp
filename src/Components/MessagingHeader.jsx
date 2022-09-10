import React, {useContext, useEffect, useState} from "react";
import '../Styles/Components/MessagingHeader.css';
import TalkContext from "../Context/talkContext";
import {processTalkData} from "../utils/talkHandling";
import UserContext from "../Context/userContext";

function MessagingHeader() {
    const {currentTalk} = useContext(TalkContext);
    const {user} = useContext(UserContext);
    const [talkInfo, setTalkInfo] = useState({});

    useEffect(() => {
        processTalkData(user, currentTalk).then(res => setTalkInfo(res));
    }, [currentTalk]);

    return (
        <div className="messaging-header-container">
            <img src={require('../Assets/thumbnail (1).png')} className="messaging-header-profile-image"/>
            <span className="messaging-header-profile-info">
                <div style={{fontSize: 22}}>{talkInfo?.name}</div>
                <div style={{fontSize: 13}}>{talkInfo.members?.length} members</div>
            </span>
        </div>
    );
}

export default MessagingHeader;