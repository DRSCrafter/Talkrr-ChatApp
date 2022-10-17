import '../App.css';
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../Context/userContext";
import TalkContext from "../Context/talkContext";

import SidePanel from "../Components/Sections/SidePanel";
import Root from "../Components/Sections/Root";
import MessagingSection from "../Components/Sections/MessagingSection";
import ContactPanel from "../Components/Sections/ContactPanel";
import SideBar from "../Components/Sections/sideBar";
import {getCurrentTalk, getTalks} from "../utils/talkHandling";
import NotFound from "../Components/Sections/notFound";
import {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function MainPage() {
    const {user, socketRef} = useContext(UserContext);
    const navigate = useNavigate();

    const [talkID, setTalkID] = useState('');
    const [talks, setTalks] = useState([]);
    const [currentTalk, setCurrentTalk] = useState(null);

    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setDrawer(open);
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) navigate('/login');
        getTalks(user, setTalks);
    }, [user]);

    useEffect(() => {
        if (currentTalk && socketRef.current)
            socketRef.current.on('message', (data) => {
                console.log('reached');

                const messages = [...currentTalk.messages];
                messages.push(data._doc);
                handleUpdateTalk('messages', messages);
            })
    }, [user, currentTalk])

    useEffect(() => {
        getCurrentTalk(talkID, setCurrentTalk);
    }, [talkID])

    const handleUpdateTalk = (key, value) => setCurrentTalk({...currentTalk, [key]: value});

    return (
        <TalkContext.Provider value={{currentTalk, handleUpdateTalk, setTalkID}}>
            <Root>
                <SidePanel talks={talks} onToggleDrawer={toggleDrawer}/>
                {currentTalk ?
                    <>
                        <MessagingSection/>
                        <ContactPanel/>
                    </> :
                    <NotFound/>
                }
            </Root>
            <SideBar open={drawer} onToggle={toggleDrawer}/>
            <Toaster position={"bottom-right"} toastOptions={{style: {backgroundColor: 'rgba(255,255,255,0.6)'}}}/>
        </TalkContext.Provider>
    );
}

export default MainPage;