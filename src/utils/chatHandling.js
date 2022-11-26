import httpConnection from "./httpConnection";

export const getChatInfo = async (id) => {
    const {data} = await httpConnection.get(`/chats/${id}`)
    return data;
};

export const processChatData = async (user, chat) => {
    const {_id, name, about, isPrivate, members, chatImage} = chat;

    if (isPrivate) {
        let userID;
        userID = members.find(member => member !== user._id);
        const userInfo = await httpConnection.get(`/users/strict/${userID}`);
        const result =  {
            id: chat._id,
            isPrivate: true,
            members: [user._id, userID],
            chatImage: userInfo.data.profileImage,
            about: userInfo.data.bio,
            triggered: false,
            ...userInfo.data
        };

        if (!result.chatImage)
            result.defaultImage = require('../Assets/undefinedUser.jpg');

        return result;
    }

    const result = {
        id: _id,
        name: name,
        about: about,
        members: members,
        isPrivate: false,
        chatImage: chatImage,
        triggered: false,
    };

    if (result.chatImage === undefined)
        result.defaultImage = require('../Assets/undefinedGroup.jpg');

    return result;
}

export const getChats = async (user, setChats) => {
    if (!user) return;

    const chatsList = [];
    for (let chat of user.chats) {
        const chatData = await getChatInfo(chat.id);
        const chatInfo = await processChatData(user, chatData);
        chatsList.push(chatInfo);
    }
    setChats(chatsList);
}

export const getCurrentChat = async (id, setCurrentChat) => {
    if (!id) return;

    let chatInfo;
    try {
        chatInfo = await httpConnection.get(`/chats/${id}`);
        setCurrentChat(chatInfo.data);
        return true;
    } catch (ex) {
        return false;
    }
}

export const handleDeletePrivateChat = async (id, user, handleUpdateUser, socketRef) => {
    const backup = [...user.chats];
    let chats = [...user.chats];
    try {
        chats = chats.filter(chat => chat.id !== id);
        handleUpdateUser('chats', chats);
        await socketRef.current.emit('deleteChat', {chatID: id});
    } catch (ex) {
        handleUpdateUser('chats', backup);
    }
}

export const handleLeaveGroupChat = async (id, user, handleUpdateUser) => {
    const backup = [...user.chats];
    let chats = [...user.chats];
    const request = JSON.stringify({id: user._id});
    try {
        chats = chats.filter(chat => chat.id !== id);
        handleUpdateUser('chats', chats);
        await httpConnection.put(`/chats/${id}/members`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    } catch (ex) {
        handleUpdateUser('chats', backup);
    }
}

export const handleAddContact = async (id, user, handleUpdateUser) => {
    const backup = [...user.contacts];
    const contacts = [...user.contacts];

    const request = JSON.stringify({id: id})
    try {
        contacts.push(id);
        handleUpdateUser('contacts', contacts);
        await httpConnection.post(`/users/${user._id}/contacts`, request, {
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
        await httpConnection.put(`/users/${user._id}/contacts`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    } catch (ex) {
        handleUpdateUser('contacts', backup);
    }
}