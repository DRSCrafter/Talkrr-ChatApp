import '../../Styles/Layout/ChatSection/MessagingSection.scss';
import React, {FormEvent, useContext, useEffect, useRef, useState} from "react";

import TryIcon from '@mui/icons-material/Try';

import Message from "../../Components/Message.js";
import IMessage from '../../types/context/message';
import TypingBox from "./MessagingSection/TypingBox.js";
import MessagingHeader from "./MessagingSection/MessagingHeader.js";
import UserContext from "../../Context/userContext.js";
import ChatContext from "../../Context/chatContext.js";
import httpConnection from "../../utils/http";

import moment from 'moment';
import User from "../../types/context/user";

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

    const scrollEnd = () => (messagesEnd.current! as any).scrollIntoView({behavior: 'smooth'});

    const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(event.target.value);

    const handleStateMessage = (message: IMessage) => {
        const messages = [...currentChat!.messages];
        messages.push(message);
        handleUpdateChat('messages', messages);
    }

    const handleSendMessage = async (e: React.FormEvent<FormEvent>) => {
        e.preventDefault();
        if (currentMessage === '' || !currentChat) return;
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

    const addEmoji = (emoji: any) => setCurrentMessage(currentMessage + emoji.native);

    const handleDeleteMessage = async (id: string) => {
        if (!currentChat) return;

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

    const handleCopyMessage = (content: string) => navigator.clipboard.writeText(content);

    const getMembers = async () => {
        if (!currentChat) return;
        const membersList = [];
        for (let member of currentChat.members) {
            const user = await httpConnection.get(`/users/strict/${member}`);
            membersList.push(user.data);
        }
        return membersList;
    }

    const handleGetMember = (id: string) => {
        if (members?.length === 0) return;
        return members.find((member: User) => member._id === id);
    }

    useEffect(() => {
        getMembers().then((res: User[] | undefined) => setMembers((res as any)));
    }, [currentChat]);

    return (
        <span className="messaging-panel">
            <div className="messaging-panel__container">
                <MessagingHeader members={members}/>
                {currentChat?.messages && currentChat.messages.length !== 0 ?
                    <div className="panel__messages__container">
                        {currentChat?.messages && currentChat?.messages.map((message, index) => (
                            <Message
                                message={message} key={index}
                                isSent={message.sender === user?._id}
                                onGetMember={handleGetMember}
                                onDelete={handleDeleteMessage}
                                onCopy={handleCopyMessage}
                            />
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
            <TypingBox
                value={currentMessage}
                onChange={handleChangeMessage}
                /*@ts-ignore*/
                onSend={handleSendMessage}
                onEmojiAdd={addEmoji}
            />
        </span>
    );
}

export default MessagingSection;
