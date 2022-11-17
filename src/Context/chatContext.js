import React from "react";

const ChatContext = React.createContext({chatID: 0, handleUpdateChat: () => {}, setChatID: () => {}});
ChatContext.displayName = "ChatContext";

export default ChatContext;