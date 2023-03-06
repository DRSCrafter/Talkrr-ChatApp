export default interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    bio: string,
    contacts: string[],
    chats: {id: string},
    profileImage: string,
    pins?: string[]
}