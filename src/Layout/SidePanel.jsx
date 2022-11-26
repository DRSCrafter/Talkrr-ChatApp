import '../Styles/Layout/SidePanel.css';
import React, {useContext, useEffect, useState} from "react";

import UserButton from "./SidePanel/UserButton";
import SearchBar from "./SidePanel/SearchBar";
import Banner from "./SidePanel/Banner";
import httpConnection from "../utils/httpConnection";
import UserContext from "../Context/userContext";
import {handleDeletePrivateChat, handleLeaveGroupChat} from "../utils/chatHandling";

function SidePanel({chats, onToggleDrawer}) {
    const {user, handleUpdateUser} = useContext(UserContext);

    const [filteredChats, setFilteredChats] = useState([]);
    const [filter, setFilter] = useState("");

    const {socketRef} = useContext(UserContext);

    const ChatsGet = async () => {
        if (socketRef.current) {
            const ChatIDs = chats.map(chat => chat.id);
            await socketRef.current.emit('watchRooms', ChatIDs);
        }
    }

    useEffect(() => {
        ChatsGet();
    }, [chats, user]);

    useEffect(() => {
        const pinned = chats.filter(chat => user.pins.includes(chat.id));
        pinned.forEach(chat => {
            chat.isPinned = true;
        })
        const notPinned = chats.filter(chat => !user.pins.includes(chat.id));
        let sorted = pinned.concat(notPinned);
        if (filter !== "")
            sorted = sorted.filter(chat => chat.name.match(new RegExp(filter)));

        setFilteredChats(sorted);
    }, [chats, filter, user]);

    const handlePin = async (id) => {
        const pins = [...user.pins];
        const request = JSON.stringify({id: id});
        try {
            pins.push(id);
            handleUpdateUser('pins', pins);
            await httpConnection.post(`/users/${user._id}/pin`, request, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            pins.pop();
            handleUpdateUser('pins', pins);
        }
    }

    const handleUnpin = async (id) => {
        let pins = [...user.pins];
        const request = JSON.stringify({id: id});
        try {
            pins = pins.filter(pin => pin !== id);
            handleUpdateUser('pins', pins);
            await httpConnection.put(`/users/${user._id}/unpin`, request, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            pins.push(id);
            handleUpdateUser('pins', pins);
        }
    }

    const handleFilter = (event) => setFilter(event.target.value);

    const deletePrivateChat = (id) => handleDeletePrivateChat(id, user, handleUpdateUser, socketRef);
    const leaveGroupChat = (id) => handleLeaveGroupChat(id, user, handleUpdateUser);

    return (
        <>
            <span className="side-panel-container">
                <Banner onToggleDrawer={onToggleDrawer}/>
                <SearchBar value={filter} onChange={handleFilter}/>
                <div className="users-container">
                    {filteredChats?.map((chat, index) => (
                        <UserButton
                            key={index}
                            chat={chat}
                            onPin={handlePin}
                            onUnpin={handleUnpin}
                            Pin={chat.isPinned}
                            onDelete={chat.isPrivate ? deletePrivateChat : leaveGroupChat}
                            triggered={chat.triggered}
                        />))}
                </div>
            </span>
        </>
    );
}

export default SidePanel;
