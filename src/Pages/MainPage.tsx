import React, {useContext, useEffect, useState} from "react";
import UserContext from "../Context/userContext.js";
import ChatContext from "../Context/chatContext.js";

import SidePanel from "../Layout/SidePanel.js";
import Root from "../Layout/Root.js";
import SideBar from "../Layout/sideBar.js";
import {getChats} from "../services/chat";
import NotFound from "../Layout/notFound.js";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import ChatSection from "../Layout/chatSection.js";
import {RenderedChat} from "../types/context/chat";

function MainPage() {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);
    const navigate = useNavigate();

    const [chats, setChats] = useState<RenderedChat[]>([]);
    const [currentChat, setCurrentChat] = useState<RenderedChat>(({} as RenderedChat));

    const [drawer, setDrawer] = useState(false);

    const isPhone = useMediaQuery('(max-width: 768px)');

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setDrawer(open);
    };

    const disconnectLastRoom = async () => {
        if (currentChat)
            await socketRef.current.emit('leaveRoom', currentChat._id);
    }

    const setChatID = (id: string) => navigate(`../chat/${id}`);

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);
    }, []);

    const detectKeyDown = (e: any) => {
        if (e.key === "Escape")
            navigate('/');
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) navigate('/login');
        getChats(user).then((res: any) => setChats(res));
    }, [user]);

    useEffect(() => {
        if (socketRef.current && currentChat) {
            socketRef.current.on('message', (data: any) => {
                if (data.chatID === currentChat._id) {
                    const messages = [...currentChat.messages];
                    messages.push(data._doc);
                    handleUpdateChat('messages', messages);
                }
            });

            socketRef.current.on('removeMessage', (data: any) => {
                if (currentChat._id === data.chatID) {
                    let messages = [...currentChat.messages];
                    const filteredMessages = messages.filter(message => message._id !== data.messageID);
                    handleUpdateChat('messages', filteredMessages);
                }
            });
        }
        if (socketRef.current) {
            socketRef.current.on('notify', (data: any) => {
                if (currentChat && currentChat._id !== data.chatID) {
                    let Chats = [...chats];
                    const target = Chats.findIndex(chat => chat.id === data.chatID);
                    Chats[target].triggered = true;
                    setChats(Chats);
                }
            })

            socketRef.current.on('removeChat', (data: any) => {
                if (currentChat?._id === data.chatID)
                    navigate('../../');

                // @ts-ignore
                let chats = [...user.chats];
                chats = chats.filter(chat => chat.id !== data.chatID);
                handleUpdateUser('chats', chats);
            });
        }
    }, [user, currentChat, socketRef.current])

    const handleUpdateChat = (key: string, value: any) => setCurrentChat({...currentChat, [key]: value});

    const confirmRead = (id: string) => {
        let Chats = [...chats];
        const target = Chats.findIndex(chat => chat.id === id);
        Chats[target].triggered = false;
        setChats(Chats);
    }

    return (
        <>
            <ChatContext.Provider
                value={{currentChat, setCurrentChat, handleUpdateChat, setChatID, confirmRead, disconnectLastRoom}}
            >
                <Root>
                    {((isPhone && !currentChat) || (!isPhone)) &&
                        <SidePanel chats={chats} onToggleDrawer={toggleDrawer}/>}
                    <Routes>
                        <Route path="" element={<NotFound/>}/>
                        <Route path="chat/:chatID" element={<ChatSection/>}/>
                    </Routes>
                </Root>
                <SideBar open={drawer} onToggle={toggleDrawer}/>
            </ChatContext.Provider>
        </>
    );
}

export default MainPage;