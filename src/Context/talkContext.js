import React from "react";

const TalkContext = React.createContext({talkID: 0, handleUpdateUser: () => {}, setTalkID: () => {}});
TalkContext.displayName = "UserContext";

export default TalkContext;