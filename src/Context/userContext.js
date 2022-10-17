import React from "react";

const UserContext = React.createContext({user: {}, handleUpdateTalk: () => {}, socketRef: {}});
UserContext.displayName = "UserContext";

export default UserContext;