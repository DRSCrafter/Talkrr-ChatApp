import './App.css';
import React, {useEffect, useRef, useState} from "react";
import {Route, Routes} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import {io} from "socket.io-client";

import MainPage from "./Pages/MainPage";
import WindowBar from "./Components/WindowBar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import httpConnection from "./utils/httpConnection";
import UserContext from "./Context/userContext";

const {apiEndpoint} = require('./config.json');

function App() {
    const [user, setUser] = useState();

    const socketRef = useRef();

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

    useEffect(() => {
        socketRef.current = io(apiEndpoint);
        socketRef.current.on('log', data => console.log(data));
    }, [user])

    const handleUpdateUser = (key, value) => setUser({...user, [key]: value});

    return (
        <>
            <UserContext.Provider value={{user, handleUpdateUser, socketRef}}>
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
