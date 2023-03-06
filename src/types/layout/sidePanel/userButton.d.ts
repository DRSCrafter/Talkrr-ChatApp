import {RenderedChat} from "../../context/chat";

export default interface UserButton {
    chat: RenderedChat,
    Pin: boolean,
    onPin: (id: string) => void,
    onUnpin: (id: string) => void,
    onDelete: (id: string) => void,
    triggered: boolean
}