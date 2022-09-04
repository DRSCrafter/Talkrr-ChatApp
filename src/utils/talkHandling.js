import httpConnection from "./httpConnection";
const {apiEndpoint} = require('../config.json');

export const getTalkInfo = async (id) => {
    const {data} = await httpConnection.get(`${apiEndpoint}/api/talks/${id}`)
    return data;
};

export const processTalkData = async (user, talk) => {
    const {_id, name, about, isPrivate, members} = talk;

    if (isPrivate) {
        let userID = null;
        for (let member of members) {
            if (member.id != user._id) {
                userID = member.id;
                break;
            }
        }
        const userInfo = await httpConnection.get(`${apiEndpoint}/api/users/strict/${userID}`);
        return {id: talk._id, isPrivate: isPrivate, ...userInfo.data};
    }

    return {id: _id, name: name, about: about, isPrivate: isPrivate};
}

export const getTalks = async (user, setTalks) => {
    if (!user) return;

    const talksList = [];
    for (let talk of user.talks) {
        const talkData = await getTalkInfo(talk.id);
        const talkInfo = await processTalkData(user, talkData);
        talksList.push(talkInfo);
        console.log(talksList);
    }
    setTalks(talksList);
}

export const getCurrentTalk = async (id, setCurrentTalk) => {
    if (!id) return;

    const talkInfo = await httpConnection.get(`${apiEndpoint}/api/talks/${id}`);
    setCurrentTalk(talkInfo.data);
}