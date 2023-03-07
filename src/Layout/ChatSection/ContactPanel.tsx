import '../../Styles/Layout/ChatSection/ContactPanel.scss';
import React, {useContext, useEffect, useState} from "react";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';

import ChatContext from "../../Context/chatContext.js";
import UserContext from "../../Context/userContext.js";
import {handleDeletePrivateChat, handleLeaveGroupChat, processChatData} from "../../services/chat";
import ControlSection from "../../Components/controlSection.js";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {RenderedChat} from "../../types/context/chat";

import undefinedUser from '../../Assets/undefinedUser.jpg'
import undefinedGroup from '../../Assets/undefinedGroup.jpg'

function ContactPanel() {
    const [chatInfo, setChatInfo] = useState<RenderedChat>(({} as RenderedChat));
    const {setChatID, currentChat} = useContext(ChatContext);
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);

    useEffect(() => {
        if (currentChat)
            processChatData(user, currentChat).then(res => setChatInfo(res));
    }, [currentChat, user]);

    const deletePrivateChat = async () => {
        await handleDeletePrivateChat(chatInfo.id, user, handleUpdateUser, socketRef);
        setChatID('');
    }
    const leaveGroupChat = async () => {
        await handleLeaveGroupChat(chatInfo.id, user, handleUpdateUser);
        setChatID('');
    }

    return (
        <div className="contact-panel">
            <div className="contact-panel__container">
                <div className="panel__identity__container">
                    <LazyLoadImage
                        src={chatInfo?.chatImage ? chatInfo?.chatImage : chatInfo?.defaultImage}
                        placeholderSrc={chatInfo?.isPrivate ? undefinedUser : undefinedGroup}
                        className="panel__profile__image"
                    />
                    <span className="panel__profile__title">{chatInfo?.name}</span>
                </div>

                <div className="panel__details__container">
                    {chatInfo?.isPrivate &&
                        <>
                            <div className="panel__profile__details">
                                <AlternateEmailIcon fontSize="medium"/>
                                <span style={{marginLeft: 10,}}>{chatInfo?.email}</span>
                            </div>
                            {chatInfo?.phoneNumber &&
                                <div className="panel__profile__details">
                                    <PhoneIcon fontSize="medium"/>
                                    <span style={{marginLeft: 10,}}>{chatInfo?.phoneNumber}</span>
                                </div>
                            }
                        </>
                    }
                    <div className="panel__profile__details">
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