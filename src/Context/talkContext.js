import React from "react";

const TalkContext = React.createContext({handleUpdateUser: () => {}, setTalkID: () => {}});
TalkContext.displayName = "UserContext";

export default TalkContext;