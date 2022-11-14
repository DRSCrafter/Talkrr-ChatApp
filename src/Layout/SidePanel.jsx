import '../Styles/Layout/SidePanel.css';
import React, {useContext, useEffect, useState} from "react";

import UserButton from "./SidePanel/UserButton";
import SearchBar from "./SidePanel/SearchBar";
import Banner from "./SidePanel/Banner";
import httpConnection from "../utils/httpConnection";
import UserContext from "../Context/userContext";
import {handleDeletePrivateTalk, handleLeaveGroupTalk} from "../utils/talkHandling";

const {apiEndpoint} = require('../config.json');

function SidePanel({talks, onToggleDrawer}) {
    const {user, handleUpdateUser} = useContext(UserContext);

    const [filteredTalks, setFilteredTalks] = useState([]);
    const [filter, setFilter] = useState("");

    const {socketRef} = useContext(UserContext);

    const talksGet = async () => {
        if (socketRef.current) {
            const talkIDs = talks.map(talk => talk.id);
            await socketRef.current.emit('watchRooms', talkIDs);
        }
    }

    useEffect(() => {
        talksGet();
    }, [talks, user]);

    useEffect(() => {
        const pinned = talks.filter(talk => user.pins.includes(talk.id));
        pinned.forEach(talk => {
            talk.isPinned = true;
        })
        const notPinned = talks.filter(talk => !user.pins.includes(talk.id));
        let sorted = pinned.concat(notPinned);
        if (filter !== "")
            sorted = sorted.filter(talk => talk.name.match(new RegExp(filter)));

        setFilteredTalks(sorted);
    }, [talks, filter, user]);

    const handlePin = async (id) => {
        const pins = [...user.pins];
        const request = JSON.stringify({id: id});
        try {
            pins.push(id);
            handleUpdateUser('pins', pins);
            await httpConnection.post(`${apiEndpoint}/api/users/${user._id}/pin`, request, {
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
            await httpConnection.put(`${apiEndpoint}/api/users/${user._id}/unpin`, request, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            pins.push(id);
            handleUpdateUser('pins', pins);
        }
    }

    const handleFilter = (event) => setFilter(event.target.value);

    const deletePrivateTalk = (id) => handleDeletePrivateTalk(id, user, handleUpdateUser, socketRef);
    const leaveGroupTalk = (id) => handleLeaveGroupTalk(id, user, handleUpdateUser);

    return (
        <>
            <span className="side-panel-container">
                <Banner onToggleDrawer={onToggleDrawer}/>
                <SearchBar value={filter} onChange={handleFilter}/>
                <div className="users-container">
                    {filteredTalks?.map((talk, index) => (
                        <UserButton
                            key={index}
                            talk={talk}
                            onPin={handlePin}
                            onUnpin={handleUnpin}
                            Pin={talk.isPinned}
                            onDelete={talk.isPrivate ? deletePrivateTalk : leaveGroupTalk}
                            triggered={talk.triggered}
                        />))}
                </div>
            </span>
        </>
    );
}

export default SidePanel;
