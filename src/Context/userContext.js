import React from "react";

const UserContext = React.createContext({userInfo: {}});
UserContext.displayName = "UserContext";

export default UserContext;