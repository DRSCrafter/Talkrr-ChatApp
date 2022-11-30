import '../../Styles/Layout/ChatSection/ContactPanel.css';
import React, {useContext, useEffect, useState} from "react";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';

import ChatContext from "../../Context/chatContext";
import UserContext from "../../Context/userContext";
import {handleDeletePrivateChat, handleLeaveGroupChat, processChatData}
    from "../../utils/chatHandling";
import ControlSection from "../../Components/controlSection";

function ContactPanel() {
    const [chatInfo, setChatInfo] = useState({});
    const {setChatID, currentChat} = useContext(ChatContext);
    const {user, handleUpdateUser} = useContext(UserContext);

    useEffect(() => {
        if (currentChat)
            processChatData(user, currentChat).then(res => setChatInfo(res));
    }, [currentChat, user]);

    const deletePrivateChat = async () => {
        await handleDeletePrivateChat(chatInfo.id, user, handleUpdateUser);
        setChatID('');
    }
    const leaveGroupChat = async () => {
        await handleLeaveGroupChat(chatInfo.id, user, handleUpdateUser);
        setChatID('');
    }

    return (
        <div className="contact-panel-root">
            <div className="contact-panel-container">
                <div className="identity-container">
                    <img
                        src={chatInfo?.chatImage ? chatInfo?.chatImage : chatInfo?.defaultImage}
                        className="profile-image"
                    />
                    <span className="profile-name">{chatInfo?.name}</span>
                </div>

                <div className="details-container">
                    {chatInfo?.isPrivate &&
                        <>
                            <div className="profile-details">
                                <AlternateEmailIcon fontSize="medium"/>
                                <span style={{marginLeft: 10,}}>{chatInfo?.email}</span>
                            </div>
                            {chatInfo?.phoneNumber &&
                                <div className="profile-details">
                                    <PhoneIcon fontSize="medium"/>
                                    <span style={{marginLeft: 10,}}>{chatInfo?.phoneNumber}</span>
                                </div>
                            }
                        </>
                    }
                    <div className="profile-details">
                        <InfoIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>{chatInfo?.about}</span>
                    </div>
                </div>

                <ControlSection
                    chatInfo={chatInfo}
                    onDeletePrivate={deletePrivateChat}
                    onLeaveGroup={leaveGroupChat}
                />
            </div>
        </div>
    );
}

export default ContactPanel;