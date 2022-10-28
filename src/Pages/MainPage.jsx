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

    const disconnectLastRoom = async () => {
        await socketRef.current.emit('leaveRoom', currentTalk._id);
    }

    const handleRoomConnection = async (id) => {
        console.log(id);
        await socketRef.current.emit('joinRoom', id);
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) navigate('/login');
        getTalks(user, setTalks);
    }, [user]);

    useEffect(() => {
        if (currentTalk) {
            socketRef.current.on('message', (data) => {
                console.log(currentTalk._id);
                console.log(data.talkID);
                console.log(data.talkID == currentTalk._id);
                if (data.talkID == currentTalk._id) {
                    const messages = [...currentTalk.messages];
                    messages.push(data._doc);
                    handleUpdateTalk('messages', messages);
                }
            });

            socketRef.current.on('removeMessage', (data) => {
                if (currentTalk._id == data.talkID) {
                    let messages = [...currentTalk.messages];
                    const filteredMessages = messages.filter(message => message._id != data.messageID);
                    handleUpdateTalk('messages', filteredMessages);
                }
            });

        }
        if (socketRef.current) {
            socketRef.current.on('notify', (data) => {
                if (talkID == data.talkID) {
                    let Talks = [...talks];
                    const target = Talks.findIndex(talk => talk.id == data.talkID);
                    Talks[target].triggered = false;
                    setTalks(Talks);
                } else {
                    let Talks = [...talks];
                    const target = Talks.findIndex(talk => talk.id == data.talkID);
                    Talks[target].triggered = true;
                    setTalks(Talks);
                }
            })
        }
    }, [user, currentTalk, socketRef.current])

    useEffect(() => {
        handleRoomConnection(talkID);
        getCurrentTalk(talkID, setCurrentTalk);
    }, [talkID])

    const handleUpdateTalk = (key, value) => setCurrentTalk({...currentTalk, [key]: value});

    const confirmRead = (id) => {
        let Talks = [...talks];
        const target = Talks.findIndex(talk => talk.id == id);
        Talks[target].triggered = false;
        setTalks(Talks);
    }

    return (
        <TalkContext.Provider value={{currentTalk, handleUpdateTalk, setTalkID, confirmRead, disconnectLastRoom}}>
            <Root>
                <SidePanel talks={talks} onToggleDrawer={toggleDrawer}/>
                {talkID !== '' ?
                    <>
                        <MessagingSection/>
                        <ContactPanel/>
                    </> :
                    <NotFound/>
                }
            </Root>
            <SideBar open={drawer} onToggle={toggleDrawer}/>
        </TalkContext.Provider>
    );
}

export default MainPage;