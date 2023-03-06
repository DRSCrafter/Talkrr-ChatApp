import React, {useContext, useEffect, useState} from "react";
import '../../../Styles/Layout/ChatSection/MessagingSection/MessagingHeader.css';
import ChatContext from "../../../Context/chatContext.js";
import {processChatData} from "../../../services/chat";
import UserContext from "../../../Context/userContext.js";
import ChatDialog from "../../../Components/Dialogs/chatDialog.js";
import {IconButton, useMediaQuery} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import MessagingHeaderProps from "../../../types/layout/chatSection/messagingSection/messagingHeader";
import {RenderedChat} from "../../../types/context/chat";
import undefinedUser from "../../../Assets/undefinedUser.jpg";
import undefinedGroup from "../../../Assets/undefinedGroup.jpg";

function MessagingHeader({members}: MessagingHeaderProps) {
    const {currentChat} = useContext(ChatContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const isPC = useMediaQuery('(min-width: 1024px)');

    const [chatInfo, setChatInfo] = useState<RenderedChat>(({} as RenderedChat));
    const [chatDialog, setChatDialog] = useState(false);

    const handleOpenDialog = () => setChatDialog(true);
    const handleCloseDialog = () => setChatDialog(false);

    useEffect(() => {
        if (currentChat)
            processChatData(user, currentChat).then(res => setChatInfo(res));
    }, [currentChat, user]);

    const closeChat = () => navigate('../../');

    return (
        <>
            <div className="messaging-header-container" onClick={handleOpenDialog}>
                {!isPC &&
                    <div style={{marginLeft: 15, marginRight: '-10px'}}>
                        <IconButton style={{color: 'white'}} onClick={closeChat}>
                            <KeyboardBackspaceIcon fontSize={"medium"}/>
                        </IconButton>
                    </div>
                }
                <LazyLoadImage
                    src={chatInfo?.chatImage ? chatInfo?.chatImage : chatInfo?.defaultImage}
                    placeholderSrc={chatInfo?.isPrivate ? undefinedUser : undefinedGroup}
                    className="messaging-header-profile-image"
                />
                <span className="messaging-header-profile-info">
                <div style={{fontSize: 25}}>{chatInfo?.name}</div>
                <div style={{fontSize: 15}}>
                    {chatInfo.isPrivate ? 'Private Chat' : `${chatInfo.members?.length} members`}
                </div>
            </span>
            </div>
            <ChatDialog open={chatDialog} onClose={handleCloseDialog} chatInfo={chatInfo} members={members}/>
        </>
    );
}

export default MessagingHeader;