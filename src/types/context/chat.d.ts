import Message from './message';

export default interface Chat {
    _id: string,
    name: string,
    about: string,
    members: string[],
    isPrivate: boolean,
    messages: Message[],
    chatImage?: any
}

export interface RenderedChat extends Chat {
    id: string,
    chatImage?: any,
    defaultImage?: any,
    about: string,
    triggered: boolean,
    email?: string,
    phoneNumber?: string
    isPinned?: boolean,
}