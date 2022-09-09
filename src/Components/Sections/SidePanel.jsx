import '../../Styles/Components/Sections/SidePanel.css';
import React, {useContext, useEffect, useState} from "react";

import UserButton from "../UserButton";
import SearchBar from "../SearchBar";
import Banner from "../Banner";
import httpConnection from "../../utils/httpConnection";
import UserContext from "../../Context/userContext";

const {apiEndpoint} = require('../../config.json');

function SidePanel({talks, onToggleDrawer}) {
    const {user, handleUpdateUser} = useContext(UserContext);

    const [sortedTalks, setSortedTalks] = useState([]);

    useEffect(() => {
        const pinned = talks.filter(talk => user.pins.includes(talk.id));
        pinned.forEach(talk => {
            talk.isPinned = true;
        })
        const notPinned = talks.filter(talk => !user.pins.includes(talk.id));
        setSortedTalks(pinned.concat(notPinned));
    }, [talks, user]);

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
            console.log(ex.response.message);
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
            console.log(ex.response.message);
        }
    }

    const handleDeletePrivateTalk = async (id) => {
        const backup = [...user.talks];
        let talks = [...user.talks];
        try {
            talks = talks.filter(talk => talk.id != id);
            handleUpdateUser('talks', talks);
            await httpConnection.delete(`${apiEndpoint}/api/talks/${id}`);
        } catch (ex) {
            handleUpdateUser('talks', backup);
            console.log(ex.response.message);
        }
    }

    const handleLeaveGroupTalk = async (id) => {
        const backup = [...user.talks];
        let talks = [...user.talks];
        const request = JSON.stringify({id: user._id});
        try {
            talks = talks.filter(talk => talk.id != id);
            handleUpdateUser('talks', talks);
            await httpConnection.put(`${apiEndpoint}/api/talks/${id}/members`, request, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            handleUpdateUser('talks', backup);
            console.log(ex.response.message);
        }
    }

    return (
        <>
            <span className="side-panel-container">
                <Banner onToggleDrawer={onToggleDrawer}/>
                <SearchBar/>
                <div className="users-container">
                    {sortedTalks && sortedTalks.map((talk, index) => (
                        <UserButton key={index} talk={talk} onPin={handlePin} onUnpin={handleUnpin} Pin={talk.isPinned}
                                    onDelete={talk.isPrivate ? handleDeletePrivateTalk : handleLeaveGroupTalk}/>))}
                </div>
            </span>
        </>
    );
}

export default SidePanel;
