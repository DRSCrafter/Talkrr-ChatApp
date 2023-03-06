import React from "react";
import User from "../types/context/user";

interface UserContext {
    user: User,
    handleUpdateUser: (key: string, value: any) => void,
    socketRef: any,
    isNative: boolean
}

const UserContext = React.createContext<UserContext>({
    user: ({} as User),
    handleUpdateUser: () => {},
    socketRef: {},
    isNative: false
});
UserContext.displayName = "UserContext";

export default UserContext;