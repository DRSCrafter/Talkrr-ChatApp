import Chat from "../context/chat";

export default interface ControlSection {
    chatInfo: Chat,
    onDeletePrivate: () => void,
    onLeaveGroup: () => void,
    callback?: () => void,
}