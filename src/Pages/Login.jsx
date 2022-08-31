import React from 'react';
import '../Styles/Pages/Login.css';
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';

function Login() {
    return (
        <>
            <img className="login-background" src={require('../Assets/Background/login.jpg')} alt="Background"/>
            <div className="root-container">
                <form className="login-form-container">
                    <span className="login-title">Talkrr</span>
                    <span style={{display: 'flex', marginInline: 'auto', flexDirection: 'column', width: '100%'}}>
                        <TextField style={{display: 'block', marginBottom: '1.25vh'}} id="outlined-basic"
                                   variant="outlined" size="medium" label="E-mail"/>
                        <TextField style={{display: 'block', marginBottom: '2vh'}} id="outlined-basic"
                                   variant="outlined" size="medium" label="Password"/>
                        <span className="login-btn-section">
                            <Button className="login-btn" variant="contained">Login</Button>
                            <Button className="login-btn" variant="text">SignUp</Button>
                        </span>
                    </span>
                </form>
            </div>
        </>
    );
}

export default Login;