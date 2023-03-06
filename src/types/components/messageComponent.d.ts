import Message from "../context/message";
import User from "../context/user";

export default interface MessageComponent {
    isSent: boolean,
    message: Message,
    onGetMember: (id: string) => User | undefined,
    onDelete: (id: string) => void,
    onCopy: (content: string) => void,
}