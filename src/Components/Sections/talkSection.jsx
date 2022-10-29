import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";

import MessagingSection from "./MessagingSection";
import ContactPanel from "./ContactPanel";
import {getCurrentTalk} from "../../utils/talkHandling";
import UserContext from "../../Context/userContext";
import TalkContext from "../../Context/talkContext";
import {useMediaQuery} from "@mui/material";

function TalkSection() {
    const {talkID} = useParams();
    const {socketRef} = useContext(UserContext);
    const {setCurrentTalk} = useContext(TalkContext);

    const isPhone = useMediaQuery('(max-width: 768px)');

    const handleRoomConnection = async (id) => {
        console.log(id);
        await socketRef.current.emit('joinRoom', id);
    }

    useEffect(() => {
        if (talkID) {
            handleRoomConnection(talkID);
            getCurrentTalk(talkID, setCurrentTalk);
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