import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import WindowBar from './Components/WindowBar';

function App() {
    return (
        <>
            <WindowBar/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
            </Routes>
        </>
    );
}

export default App;
