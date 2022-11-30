import React, {useRef} from 'react';
import '../Styles/Pages/Login.css';
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import httpConnection from "../utils/httpConnection";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })

        const response = await httpConnection.put('/users/login', request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });

        localStorage.setItem('token', response.headers['x-auth-token']);
        window.location = '../';
    };

    const handleNavigate = () => navigate('../signup');

    return (
        <>
            <img className="login-background" src={require('../Assets/Background/login.jpg')} alt="Background"/>
            <div className="root-container">
                <form className="login-form-container">
                    <span className="login-title">Talkrr</span>
                    <span style={{display: 'flex', marginInline: 'auto', flexDirection: 'column', width: '100%'}}>
                        <TextField style={{display: 'block', marginBottom: '1.25vh'}}
                                   variant="outlined" size="medium" label="E-mail" inputRef={emailRef}/>
                        <TextField style={{display: 'block', marginBottom: '2vh'}}
                                   variant="outlined" size="medium" type="password" label="Password" inputRef={passwordRef}/>
                        <span className="login-btn-section">
                            <Button className="login-btn" variant="contained" onClick={handleSubmit}>Login</Button>
                            <Button className="login-btn" variant="text" onClick={handleNavigate}>SignUp</Button>
                        </span>
                    </span>
                </form>
            </div>
        </>
    );
}

export default Login;