import httpConnection from "../utils/http";
import User from "../types/context/user";
import Chat from "../types/context/chat";
import undefinedUser from "../Assets/undefinedUser.jpg";
import undefinedGroup from "../Assets/undefinedGroup.jpg";

export const getChatInfo = async (id: string) => {
    const {data} = await httpConnection.get(`/chats/${id}`)
    return data;
};

export const processChatData = async (user: User, chat: Chat) => {
    const {_id, name, about, isPrivate, members, chatImage} = chat;

    if (isPrivate) {
        let userID;
        userID = members.find((member: string) => member !== user._id);
        const userInfo = await httpConnection.get(`/users/strict/${userID}`);
        const result = {
            id: chat._id,
            isPrivate: true,
            members: [user._id, userID],
            chatImage: userInfo.data.profileImage,
            about: userInfo.data.bio,
            triggered: false,
            ...userInfo.data
        };

        if (!result.chatImage)
            result.defaultImage = undefinedUser;

        return result;
    }

    const result = {
        id: _id,
        name: name,
        about: about,
        members: members,
        isPrivate: false,
        chatImage: chatImage,
        defaultImage: '',
        triggered: false,
    };

    if (result.chatImage === undefined)
        result.defaultImage = undefinedGroup;

    return result;
}

export const getChats = async (user: User) => {
    if (!user) return;

    const chatsList = [];
    // @ts-ignore
    for (let chat of user.chats) {
        const chatData = await getChatInfo(chat.id);
        const chatInfo = await processChatData(user, chatData);
        chatsList.push(chatInfo);
    }

    return chatsList;
}

export const getCurrentChat = async (id: string, setCurrentChat: any) => {
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

export const handleDeletePrivateChat =
    async (id: string, user: User, handleUpdateUser: (key: string, value: any) => void, socketRef: any) => {
        // @ts-ignore
        const backup = [...user.chats];
        // @ts-ignore
        let chats = [...user.chats];
        try {
            chats = chats.filter(chat => chat.id !== id);
            handleUpdateUser('chats', chats);
            await socketRef.current.emit('deleteChat', {chatID: id});
        } catch (ex) {
            handleUpdateUser('chats', backup);
        }
    }

export const handleLeaveGroupChat = async (id: string, user: User, handleUpdateUser: any) => {
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

export const handleAddContact = async (id: string, user: User, handleUpdateUser: any) => {
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

export const handleRemoveContact = async (id: string, user: User, handleUpdateUser: any) => {
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