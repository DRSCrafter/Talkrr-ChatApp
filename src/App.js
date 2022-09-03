import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Routes} from 'react-router-dom';
import jwtDecode from "jwt-decode";

import MainPage from "./Pages/MainPage";
import WindowBar from "./Components/WindowBar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import httpConnection from "./utils/httpConnection";
import UserContext from "./Context/userContext";

function App() {
    const [user, setUser] = useState();

    const loginUser = async () => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) return console.log('not connected!');
        const userID = jwtDecode(jwtToken)._id;
        const user = await httpConnection.get('http://localhost:3001/api/users/' + userID);
        setUser(user.data);
    }

    useEffect(() => {
        loginUser();
    }, []);

    const handleUpdateUser = (key, value) => setUser({...user, [key]: value});

    return (
        <>
            <UserContext.Provider value={{user, handleUpdateUser}}>
                <WindowBar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
