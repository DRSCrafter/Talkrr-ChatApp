// @ts-nocheck

import './Styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect, useRef, useState} from "react";
import {Route, Routes} from 'react-router-dom';
import jwtDecode from "jwt-decode";
import {io} from "socket.io-client";

import WindowBar from "./Layout/WindowBar";
import MainPage from "./Pages/MainPage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import http from "./utils/http";
import UserContext from "./Context/userContext";
import {ToastContainer} from "react-toastify";
import User from "./types/context/user";
import Loading from "./Layout/loading";

function App() {
    const [user, setUser] = useState(({} as User));

    const socketRef = useRef<any>();

    const isNative = import.meta.env.VITE_APP_DISTRIBUTION_MODE === 'App';

    const loginUser = async () => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) return console.log('not connected!');
        const userID = (jwtDecode(jwtToken) as { _id: string })._id;
        const user = await http.get('/users/' + userID);
        return user.data;
    }

    useEffect(() => {
        loginUser().then(res => setUser(res));
    }, []);

    const handleUpdateUser = (key: string, value: any) => setUser({...user, [key]: value});

    useEffect(() => {
        if (user) {
            socketRef.current = io.connect(import.meta.env.VITE_APP_API_BASE);
            socketRef.current.on('log', (data: string) => console.log(data));
            socketRef.current.on('getRoom', (data: string) => handleUpdateUser('chats', [...user.chats, {id: data}]));
            socketRef.current.emit('login', user._id);
        }
    }, [user])

    return (
        <React.Suspense fallback={<Loading/>}>
            <UserContext.Provider value={{user, handleUpdateUser, socketRef, isNative}}>
                {isNative && <WindowBar/>}
                <Routes>
                    <Route path="/*" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Routes>
                <ToastContainer toastClassName="toast-style"/>
            </UserContext.Provider>
        </React.Suspense>
    );
}

export default App;
