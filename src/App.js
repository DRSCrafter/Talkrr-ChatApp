import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import {ToastContainer} from "react-toastify";

const {apiEndpoint} = require('./config.json');

function App() {
    const [user, setUser] = useState(null);

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

    const handleUpdateUser = (key, value) => setUser({...user, [key]: value});

    useEffect(() => {
        if (user) {
            socketRef.current = io.connect(apiEndpoint)
            socketRef.current.on('log', data => console.log(data));
            socketRef.current.on('getRoom', (data) => {
                handleUpdateUser('talks', [...user.talks, {id: data}]);
            });
            socketRef.current.emit('login', user._id);
        }
    }, [user])

    return (
        <>
            <UserContext.Provider value={{user, handleUpdateUser, socketRef}}>
                <WindowBar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Routes>
                <ToastContainer toastClassName="toast-style"/>
            </UserContext.Provider>
        </>
    );
}

export default App;
