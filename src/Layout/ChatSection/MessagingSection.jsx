import React, {useContext, useEffect, useRef, useState} from "react";
import '../../Styles/Layout/ChatSection/MessagingSection.css';

import TryIcon from '@mui/icons-material/Try';

import Message from "../../Components/Message";
import TypingBox from "./MessagingSection/TypingBox";
import MessagingHeader from "./MessagingSection/MessagingHeader";
import UserContext from "../../Context/userContext";
import ChatContext from "../../Context/chatContext";
import httpConnection from "../../utils/httpConnection";

import moment from 'moment';

function MessagingSection() {
    const [members, setMembers] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const {currentChat, setCurrentChat, handleUpdateChat} = useContext(ChatContext);
    const {user, socketRef} = useContext(UserContext);
    const messagesEnd = useRef(null);

    useEffect(() => {
        return () => {
            setCurrentChat(undefined);
        }
    }, []);

    const scrollEnd = () => messagesEnd.current.scrollIntoView({behavior: 'smooth'});

    const handleChangeMessage = (event) => setCurrentMessage(event.target.value);

    const handleStateMessage = (message) => {
        const messages = [...currentChat.messages];
        messages.push(message);
        handleUpdateChat('messages', messages);
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage === '') return;
        const backup = [...currentChat.messages];

        const request = {
            chatID: currentChat._id,
            sender: user._id,
            content: currentMessage,
        };
        try {
            handleStateMessage({...request, date: moment().format("MMM Do, h:mm a")});

            await socketRef.current.emit('sendMessage', request);
        } catch (ex) {
            handleUpdateChat('messages', backup);
        }
        setCurrentMessage('');
    }

    useEffect(() => {
        if (messagesEnd.current)
            scrollEnd();
    }, [currentChat])

    const addEmoji = (emoji) => setCurrentMessage(currentMessage + emoji.native);

    const handleDeleteMessage = async (id) => {
        const backup = [...currentChat.messages];
        const messages = [...currentChat.messages];
        try {
            const filteredMessages = messages.filter(message => message._id !== id);
            handleUpdateChat('messages', filteredMessages);
            await socketRef.current.emit('deleteMessage', {chatID: currentChat._id, messageID: id});
        } catch (ex) {
            handleUpdateChat('messages', backup);
        }
    }

    const handleCopyMessage = (content) => navigator.clipboard.writeText(content);

    const getMembers = async () => {
        if (!currentChat) return;
        const membersList = [];
        for (let member of currentChat.members) {
            const user = await httpConnection.get(`/users/strict/${member}`);
            membersList.push(user.data);
        }
        setMembers(membersList);
    }

    const handleGetMember = (id) => {
        if (members.length === 0) return;
        return members.find(member => member._id === id);
    }

    useEffect(() => {
        getMembers();
    }, [currentChat]);

    return (
        <span className="messaging-panel-root">
            <div className="messaging-panel-container">
                <MessagingHeader members={members}/>
                {currentChat?.messages.length !== 0 ?
                    <div className="messages-container">
                        {currentChat?.messages && currentChat?.messages.map((message, index) => (
                            <Message message={message} key={index} isSent={message.sender === user?._id}
                                     onGetMember={handleGetMember} onDelete={handleDeleteMessage}
                                     onCopy={handleCopyMessage}/>
                        ))}
                        <div ref={messagesEnd}/>
                    </div> :
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '87%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#ffffff'
                    }}>
                        <TryIcon style={{fontSize: '120px'}}/>
                        <div>
                            Be the first to message!
                        </div>
                    </div>
                }
            </div>
            <TypingBox value={currentMessage} onChange={handleChangeMessage} onSend={handleSendMessage} onEmojiAdd={addEmoji}/>
        </span>
    );
}

export default MessagingSection;
