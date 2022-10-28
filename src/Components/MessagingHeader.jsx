import React, {useContext, useEffect, useState} from "react";
import '../Styles/Components/MessagingHeader.css';
import TalkContext from "../Context/talkContext";
import {processTalkData} from "../utils/talkHandling";
import UserContext from "../Context/userContext";
import TalkDialog from "./talkDialog";

const {apiEndpoint} = require("../config.json");

function MessagingHeader({members}) {
    const {currentTalk} = useContext(TalkContext);
    const {user} = useContext(UserContext);

    const [talkInfo, setTalkInfo] = useState({});
    const [talkDialog, setTalkDialog] = useState(false);

    const handleOpenDialog = () => setTalkDialog(true);
    const handleCloseDialog = () => setTalkDialog(false);

    useEffect(() => {
        processTalkData(user, currentTalk).then(res => setTalkInfo(res));
    }, [currentTalk]);

    return (
        <>
            <div className="messaging-header-container" onClick={handleOpenDialog}>
                <img src={`${apiEndpoint}/${talkInfo?.talkImage}`} className="messaging-header-profile-image"/>
                <span className="messaging-header-profile-info">
                <div style={{fontSize: 25}}>{talkInfo?.name}</div>
                <div style={{fontSize: 15}}>{talkInfo.members?.length} members</div>
            </span>
            </div>
            <TalkDialog open={talkDialog} onClose={handleCloseDialog} talkInfo={talkInfo} members={members}/>
        </>
    );
}

export default MessagingHeader;