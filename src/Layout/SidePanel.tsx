import '../Styles/Layout/SidePanel.scss';
import React, {useContext, useEffect, useState} from "react";

import UserButton from "./SidePanel/UserButton";
import SearchBar from "./SidePanel/SearchBar";
import Banner from "./SidePanel/Banner";
import httpConnection from "../utils/http";
import UserContext from "../Context/userContext.js";
import {handleDeletePrivateChat, handleLeaveGroupChat} from "../services/chat";
import SidePanelProps from "../types/layout/sidePanel";
import Chat, {RenderedChat} from "../types/context/chat";

function SidePanel({chats, onToggleDrawer}: SidePanelProps) {
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
        const pinned = chats.filter(chat => user.pins!.includes(chat.id));
        pinned.forEach(chat => {
            chat.isPinned = true;
        })
        const notPinned = chats.filter(chat => !user.pins!.includes(chat.id));
        let sorted: any = pinned.concat(notPinned);
        if (filter !== "")
            sorted = sorted.filter((chat: Chat) => chat.name.match(new RegExp(filter)));

        setFilteredChats(sorted);
    }, [chats, filter, user]);

    const handlePin = async (id: string) => {
        // @ts-ignore
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

    const handleUnpin = async (id: string) => {
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

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);

    const deletePrivateChat = (id: string) => handleDeletePrivateChat(id, user, handleUpdateUser, socketRef);
    const leaveGroupChat = (id: string) => handleLeaveGroupChat(id, user, handleUpdateUser);

    return (
        <>
            <span className="side__panel">
                <Banner onToggleDrawer={onToggleDrawer}/>
                <SearchBar value={filter} onChange={handleFilter}/>
                <div className="side__users">
                    {filteredChats?.map((chat: RenderedChat, index) => (
                        <UserButton
                            key={index}
                            chat={chat}
                            onPin={handlePin}
                            onUnpin={handleUnpin}
                            Pin={chat.isPinned!}
                            onDelete={chat.isPrivate ? deletePrivateChat : leaveGroupChat}
                            triggered={chat.triggered}
                        />))}
                </div>
            </span>
        </>
    );
}

export default SidePanel;
