import React, {useContext, useEffect, useState} from "react";
import '../../../Styles/Layout/TalkSection/MessagingSection/MessagingHeader.css';
import TalkContext from "../../../Context/talkContext";
import {processTalkData} from "../../../utils/talkHandling";
import UserContext from "../../../Context/userContext";
import TalkDialog from "../../../Components/Dialogs/talkDialog";
import {IconButton, useMediaQuery} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";

const {apiEndpoint} = require("../../../config.json");

function MessagingHeader({members}) {
    const {currentTalk} = useContext(TalkContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const isPC = useMediaQuery('(min-width: 1024px)');

    const [talkInfo, setTalkInfo] = useState({});
    const [talkDialog, setTalkDialog] = useState(false);

    const handleOpenDialog = () => setTalkDialog(true);
    const handleCloseDialog = () => setTalkDialog(false);

    useEffect(() => {
        processTalkData(user, currentTalk).then(res => setTalkInfo(res));
    }, [currentTalk]);

    const closeTalk = () => navigate('../../');

    return (
        <>
            <div className="messaging-header-container" onClick={handleOpenDialog}>
                {!isPC &&
                    <div style={{marginLeft: 15, marginRight: '-10px'}}>
                        <IconButton style={{color: 'white'}} onClick={closeTalk}>
                            <KeyboardBackspaceIcon fontSize={"medium"}/>
                        </IconButton>
                    </div>
                }
                <img
                    src={talkInfo?.talkImage ? `${apiEndpoint}/${talkInfo?.talkImage}` : talkInfo?.defaultImage}
                    className="messaging-header-profile-image"
                />
                <span className="messaging-header-profile-info">
                <div style={{fontSize: 25}}>{talkInfo?.name}</div>
                <div style={{fontSize: 15}}>
                    {talkInfo.isPrivate ? 'Private Talk' : `${talkInfo.members?.length} members`}
                </div>
            </span>
            </div>
            <TalkDialog open={talkDialog} onClose={handleCloseDialog} talkInfo={talkInfo} members={members}/>
        </>
    );
}

export default MessagingHeader;