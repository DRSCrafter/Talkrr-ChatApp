import '../App.css';
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../Context/userContext";
import TalkContext from "../Context/talkContext";

import SidePanel from "../Components/Sections/SidePanel";
import Root from "../Components/Sections/Root";
import SideBar from "../Components/Sections/sideBar";
import {getTalks} from "../utils/talkHandling";
import NotFound from "../Components/Sections/notFound";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import TalkSection from "../Components/Sections/talkSection";

function MainPage() {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);
    const navigate = useNavigate();

    const [talks, setTalks] = useState([]);
    const [currentTalk, setCurrentTalk] = useState(null);

    const [drawer, setDrawer] = useState(false);

    const isPhone = useMediaQuery('(max-width: 768px)');

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setDrawer(open);
    };

    const disconnectLastRoom = async () => {
        if (currentTalk)
            await socketRef.current.emit('leaveRoom', currentTalk._id);
    }

    const setTalkID = (id) => navigate(`../talk/${id}`);

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
    }, []);

    const detectKeyDown = (e) => {
        if (e.key === "Escape")
            navigate('../../');
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) navigate('/login');
        getTalks(user, setTalks);
    }, [user]);

    useEffect(() => {
        if (socketRef.current && currentTalk) {
            socketRef.current.on('message', (data) => {
                if (data.talkID === currentTalk._id) {
                    const messages = [...currentTalk.messages];
                    messages.push(data._doc);
                    handleUpdateTalk('messages', messages);
                }
            });

            socketRef.current.on('removeMessage', (data) => {
                if (currentTalk._id === data.talkID) {
                    let messages = [...currentTalk.messages];
                    const filteredMessages = messages.filter(message => message._id !== data.messageID);
                    handleUpdateTalk('messages', filteredMessages);
                }
            });
        }
        if (socketRef.current) {
            socketRef.current.on('notify', (data) => {
                if (currentTalk && currentTalk._id !== data.talkID) {
                    let Talks = [...talks];
                    const target = Talks.findIndex(talk => talk.id === data.talkID);
                    Talks[target].triggered = true;
                    setTalks(Talks);
                }
            })

            socketRef.current.on('removeTalk', (data) => {
                console.log('reached!');
                if (currentTalk?._id === data.talkID)
                    navigate('../../');

                let talks = [...user.talks];
                talks = talks.filter(talk => talk.id !== data.talkID);
                handleUpdateUser('talks', talks);
            });
        }
    }, [user, currentTalk, socketRef.current])

    const handleUpdateTalk = (key, value) => setCurrentTalk({...currentTalk, [key]: value});

    const confirmRead = (id) => {
        let Talks = [...talks];
        const target = Talks.findIndex(talk => talk.id === id);
        Talks[target].triggered = false;
        setTalks(Talks);
    }

    return (
        <>
            <TalkContext.Provider
                value={{currentTalk, setCurrentTalk, handleUpdateTalk, setTalkID, confirmRead, disconnectLastRoom}}
            >
                <Root>
                    {((isPhone && !currentTalk) || (!isPhone)) &&
                        <SidePanel talks={talks} onToggleDrawer={toggleDrawer}/>}
                    <Routes>
                        <Route path="" element={<NotFound/>}/>
                        <Route path="talk/:talkID" element={<TalkSection/>}/>
                    </Routes>
                </Root>
                <SideBar open={drawer} onToggle={toggleDrawer}/>
            </TalkContext.Provider>
        </>
    );
}

export default MainPage;