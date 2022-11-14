import React, {useContext, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import MessagingSection from "./TalkSection/MessagingSection";
import ContactPanel from "./TalkSection/ContactPanel";
import {getCurrentTalk} from "../utils/talkHandling";
import UserContext from "../Context/userContext";
import TalkContext from "../Context/talkContext";
import {useMediaQuery} from "@mui/material";

function TalkSection() {
    const {talkID} = useParams();
    const {socketRef} = useContext(UserContext);
    const {setCurrentTalk} = useContext(TalkContext);
    const navigate = useNavigate();

    const isPhone = useMediaQuery('(max-width: 768px)');

    const handleRoomConnection = async (id) => {
        await socketRef.current.emit('joinRoom', id);
    }

    useEffect(() => {
        if (talkID) {
            getCurrentTalk(talkID, setCurrentTalk).then(async (res) => {
                if (!res) {
                    navigate('../../');
                    return;
                }
                await handleRoomConnection(talkID);
            });
        }
    }, [talkID])

    return (
        <>
            <MessagingSection/>
            {!isPhone && <ContactPanel/>}
        </>
    );
}

export default TalkSection;