import React, {Dispatch} from "react";
import Chat from "../types/context/chat";

interface ChatContext {
    currentChat: Chat | null,
    setCurrentChat: Dispatch<any>
    handleUpdateChat: (key: string, value: any) => void,
    setChatID: (id: string) => void,
    confirmRead: any,
    disconnectLastRoom: () => void
}

const ChatContext = React.createContext<ChatContext>({
    confirmRead: undefined,
    currentChat: ({} as Chat),
    disconnectLastRoom(): void {},
    setCurrentChat(chat: Chat): void {},
    handleUpdateChat: () => {},
    setChatID: () => {}
});
ChatContext.displayName = "ChatContext";

export default ChatContext;