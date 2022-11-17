import React from "react";

const UserContext = React.createContext({user: {}, handleUpdateUser: () => {}, socketRef: {}});
UserContext.displayName = "UserContext";

export default UserContext;