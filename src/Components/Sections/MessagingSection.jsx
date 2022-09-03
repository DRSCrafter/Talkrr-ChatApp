import React, {useContext, useEffect, useState} from "react";
import '../../Styles/Components/Sections/MessagingSection.css';

import Message from "../Message";
import TypingBox from "../TypingBox";
import MessagingHeader from "../MessagingHeader";
import UserContext from "../../Context/userContext";
import TalkContext from "../../Context/talkContext";
import httpConnection from "../../utils/httpConnection";

const {apiEndpoint} = require('../../config.json');

function MessagingSection({currentTalk}) {
    const {user} = useContext(UserContext);
    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        if (!currentTalk) return;
        console.log('reached!');
        const membersList = [];
        for (let member of currentTalk.members) {
            const user = await httpConnection.get(`${apiEndpoint}/api/users/strict/${member.id}`);
            membersList.push(user.data);
        }
        console.log(membersList);
        setMembers(membersList);
    }

    const handleGetMember = (id) => {
        if (members.length === 0) return;
        const member = members.find(member => member._id == id);
        return member;
    }

    useEffect(() => {
        getMembers();
    }, [currentTalk]);

    return (
        <span className="messaging-panel-root">
            <div className="messaging-panel-container">
                <MessagingHeader/>
                <div className="messages-container">
                    {currentTalk && currentTalk.messages && currentTalk.messages.map(message => (
                        <Message message={message} isSent={message.sender == user._id} onGetMember={handleGetMember}/>
                    ))}
                </div>
            </div>
            <TypingBox/>
        </span>
    );
}

export default MessagingSection;
