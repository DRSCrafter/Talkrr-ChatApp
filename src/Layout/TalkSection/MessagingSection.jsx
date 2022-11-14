import React, {useContext, useEffect, useRef, useState} from "react";
import '../../Styles/Layout/TalkSection/MessagingSection.css';

import TryIcon from '@mui/icons-material/Try';

import Message from "../../Components/Message";
import TypingBox from "./MessagingSection/TypingBox";
import MessagingHeader from "./MessagingSection/MessagingHeader";
import UserContext from "../../Context/userContext";
import TalkContext from "../../Context/talkContext";
import httpConnection from "../../utils/httpConnection";

import moment from 'moment';

const {apiEndpoint} = require('../../config.json');

function MessagingSection() {
    const [members, setMembers] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const {currentTalk, setCurrentTalk, handleUpdateTalk} = useContext(TalkContext);
    const {user, socketRef} = useContext(UserContext);
    const messagesEnd = useRef(null);

    useEffect(() => {
        return () => {
            setCurrentTalk(undefined);
        }
    }, []);

    const scrollEnd = () => messagesEnd.current.scrollIntoView({behavior: 'smooth'});

    const handleChangeMessage = (event) => setCurrentMessage(event.target.value);

    const handleStateMessage = (message) => {
        const messages = [...currentTalk.messages];
        messages.push(message);
        handleUpdateTalk('messages', messages);
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage === '') return;
        const backup = [...currentTalk.messages];

        const request = {
            talkID: currentTalk._id,
            sender: user._id,
            content: currentMessage,
        };
        try {
            handleStateMessage({...request, date: moment().format("MMM Do, h:mm a")});

            await socketRef.current.emit('sendMessage', request);
        } catch (ex) {
            handleUpdateTalk('messages', backup);
        }
        setCurrentMessage('');
    }

    useEffect(() => {
        if (messagesEnd.current)
            scrollEnd();
    }, [currentTalk])

    const addEmoji = (emoji) => setCurrentMessage(currentMessage + emoji.native);

    const handleDeleteMessage = async (id) => {
        const backup = [...currentTalk.messages];
        const messages = [...currentTalk.messages];
        try {
            const filteredMessages = messages.filter(message => message._id !== id);
            handleUpdateTalk('messages', filteredMessages);
            await socketRef.current.emit('deleteMessage', {talkID: currentTalk._id, messageID: id});
        } catch (ex) {
            handleUpdateTalk('messages', backup);
        }
    }

    const handleCopyMessage = (content) => navigator.clipboard.writeText(content);

    const getMembers = async () => {
        if (!currentTalk) return;
        const membersList = [];
        for (let member of currentTalk.members) {
            const user = await httpConnection.get(`${apiEndpoint}/api/users/strict/${member}`);
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
    }, [currentTalk]);

    return (
        <span className="messaging-panel-root">
            <div className="messaging-panel-container">
                <MessagingHeader members={members}/>
                {currentTalk?.messages.length !== 0 ?
                    <div className="messages-container">
                        {currentTalk?.messages && currentTalk?.messages.map((message, index) => (
                            <Message message={message} key={index} isSent={message.sender === user._id}
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
