import React, {useRef} from 'react';
import '../Styles/Pages/form.css';
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import httpConnection from "../utils/httpConnection";
import LottieLoader from "../utils/lottieLoader";

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
            <div className="form-root">
                <form className="form-container">
                    <div className="form-logo-container">
                        <img src={require('../Assets/logo.png')} className="form-logo-image"/>
                        <span>Talkrr</span>
                    </div>
                    <span style={{display: 'flex', flexDirection: 'column', padding: 10, width: '100%'}}>
                        <TextField style={{display: 'block', marginBottom: '1.25vh'}}
                                   variant="outlined" size="medium" label="E-mail" inputRef={emailRef}/>
                        <TextField style={{display: 'block', marginBottom: '2vh'}}
                                   variant="outlined" size="medium" type="password" label="Password"
                                   inputRef={passwordRef}/>
                        <span className="form-btn-section">
                            <Button style={{...styles.button, ...styles.containedButton}} variant="contained" onClick={handleSubmit}>Login</Button>
                            <Button style={{...styles.button, ...styles.textButton}} variant="text" onClick={handleNavigate}>SignUp</Button>
                        </span>
                    </span>
                </form>
                <div className="lottie-container">
                    <LottieLoader animationData={require('../Assets/chat-icon-circle.json')}/>
                </div>
            </div>
        </>
    );
}

const styles = {
    button: {
        display: 'block',
        width: '100%',
        padding: '10px 20px',
        marginRight: '3px',
    },
    containedButton: {
        backgroundColor: '#8b00ff'
    },
    textButton: {
        color: '#8b00ff'
    }
}

export default Login;