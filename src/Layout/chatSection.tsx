import React, {useContext, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import MessagingSection from "./ChatSection/MessagingSection";
import ContactPanel from "./ChatSection/ContactPanel";
import {getCurrentChat} from "../services/chat";
import UserContext from "../Context/userContext.js";
import ChatContext from "../Context/chatContext.js";
import {useMediaQuery} from "@mui/material";

function ChatSection() {
    const {chatID} = useParams();
    const {socketRef} = useContext(UserContext);
    const {setCurrentChat} = useContext(ChatContext);
    const navigate = useNavigate();

    const isPhone = useMediaQuery('(max-width: 768px)');

    const handleRoomConnection = async (id: string) => {
        if (socketRef.current)
            await socketRef.current.emit('joinRoom', id);
    }

    useEffect(() => {
        if (chatID) {
            getCurrentChat(chatID, setCurrentChat).then(async (res) => {
                if (!res) {
                    navigate('../../');
                    return;
                }
                await handleRoomConnection(chatID);
            });
        }
    }, [chatID, socketRef.current])

    return (
        <>
            <MessagingSection/>
            {!isPhone && <ContactPanel/>}
        </>
    );
}

export default ChatSection;