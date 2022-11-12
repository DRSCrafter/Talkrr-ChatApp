import httpConnection from "./httpConnection";

const {apiEndpoint} = require('../config.json');

export const getTalkInfo = async (id) => {
    const {data} = await httpConnection.get(`${apiEndpoint}/api/talks/${id}`)
    return data;
};

export const processTalkData = async (user, talk) => {
    const {_id, name, about, isPrivate, members, talkImage} = talk;

    if (isPrivate) {
        let userID;
        userID = members.find(member => member !== user._id);
        const userInfo = await httpConnection.get(`${apiEndpoint}/api/users/strict/${userID}`);
        return {
            id: talk._id,
            isPrivate: true,
            members: [user._id, userID],
            talkImage: userInfo.data.profileImage,
            about: userInfo.data.bio,
            triggered: false,
            ...userInfo.data
        };
    }

    return {
        id: _id,
        name: name,
        about: about,
        members: members,
        isPrivate: false,
        talkImage: talkImage,
        triggered: false,
    };
}

export const getTalks = async (user, setTalks) => {
    if (!user) return;

    const talksList = [];
    for (let talk of user.talks) {
        const talkData = await getTalkInfo(talk.id);
        const talkInfo = await processTalkData(user, talkData);
        talksList.push(talkInfo);
    }
    setTalks(talksList);
}

export const getCurrentTalk = async (id, setCurrentTalk) => {
    if (!id) return;

    let talkInfo;
    try {
        talkInfo = await httpConnection.get(`${apiEndpoint}/api/talks/${id}`);
        setCurrentTalk(talkInfo.data);
        return true;
    } catch (ex) {
        return false;
    }
}

export const handleDeletePrivateTalk = async (id, user, handleUpdateUser, socketRef) => {
    const backup = [...user.talks];
    let talks = [...user.talks];
    try {
        talks = talks.filter(talk => talk.id !== id);
        handleUpdateUser('talks', talks);
        await socketRef.current.emit('deleteTalk', {talkID: id});
        // await httpConnection.delete(`${apiEndpoint}/api/talks/${id}`);
    } catch (ex) {
        handleUpdateUser('talks', backup);
    }
}

export const handleLeaveGroupTalk = async (id, user, handleUpdateUser) => {
    const backup = [...user.talks];
    let talks = [...user.talks];
    const request = JSON.stringify({id: user._id});
    try {
        talks = talks.filter(talk => talk.id !== id);
        handleUpdateUser('talks', talks);
        await httpConnection.put(`${apiEndpoint}/api/talks/${id}/members`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    } catch (ex) {
        handleUpdateUser('talks', backup);
    }
}

export const handleAddContact = async (id, user, handleUpdateUser) => {
    const backup = [...user.contacts];
    const contacts = [...user.contacts];

    const request = JSON.stringify({id: id})
    try {
        contacts.push(id);
        handleUpdateUser('contacts', contacts);
        await httpConnection.post(`${apiEndpoint}/api/users/${user._id}/contacts`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    } catch (ex) {
        contacts.pop();
        handleUpdateUser('contacts', backup);
    }
}

export const handleRemoveContact = async (id, user, handleUpdateUser) => {
    const backup = [...user.contacts];
    let contacts = [...user.contacts];

    const request = JSON.stringify({id: id})
    try {
        contacts = contacts.filter(contact => contact !== id);
        handleUpdateUser('contacts', contacts);
        await httpConnection.put(`${apiEndpoint}/api/users/${user._id}/contacts`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    } catch (ex) {
        handleUpdateUser('contacts', backup);
    }
}