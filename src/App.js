import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import WindowBar from "./Components/WindowBar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {

    return (
        <>
            <WindowBar/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </>
    );
}

export default App;
