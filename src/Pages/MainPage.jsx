import '../App.css';
import React, {useContext, useEffect, useState} from "react";
import SidePanel from "../Components/Sections/SidePanel";
import Root from "../Components/Sections/Root";
import MessagingSection from "../Components/Sections/MessagingSection";
import ContactPanel from "../Components/Sections/ContactPanel";
import httpConnection from "../utils/httpConnection";
import UserContext from "../Context/userContext";
import TalkContext from "../Context/talkContext";

const {apiEndpoint} = require('../config.json');

function MainPage() {
    const {user} = useContext(UserContext);

    const [talkID, setTalkID] = useState('');
    const [currentTalk, setCurrentTalk] = useState(null);

    const [talks, setTalks] = useState([]);

    const getTalkData = async (talk) => {
        const talkInfo = await httpConnection.get(`${apiEndpoint}/api/talks/${talk.id}`);
        const {_id, name, about, isPrivate, members} = talkInfo.data;

        if (isPrivate) {
            let userID = null;
            for (let member of members) {
                if (member.id != user._id) {
                    userID = member.id;
                    break;
                }
            }
            const userInfo = await httpConnection.get(`${apiEndpoint}/api/users/strict/${userID}`);
            return {id: talk.id, ...userInfo.data};
        }

        return {id: _id, name: name, about: about, isPrivate: isPrivate};
    }

    const talksList = [];

    const getTalks = async () => {
        if (!user) return;
        for (let talk of user.talks) {
            const talkData = await getTalkData(talk);
            talksList.push(talkData);
        }
        setTalks(talksList);
    }

    const getCurrentTalk = async (id) => {
        if (!id) return;

        const talkInfo = await httpConnection.get(`${apiEndpoint}/api/talks/${id}`);
        setCurrentTalk(talkInfo.data);
    }

    useEffect(() => {
        getTalks();
    }, [user]);

    useEffect(() => {
        getCurrentTalk(talkID);
    }, [talkID])

    const handleUpdateTalk = (key, value) => setCurrentTalk({...currentTalk, [key]: value});

    return (
        <TalkContext.Provider value={{currentTalk, handleUpdateTalk, setTalkID}}>
            <Root>
                <SidePanel talks={talks}/>
                <MessagingSection/>
                <ContactPanel/>
            </Root>
        </TalkContext.Provider>
    );
}

export default MainPage;