import '../Styles/Pages/form.scss';
import React, {FormEvent, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

import httpConnection from "../utils/http";
import LottieLoader from "../utils/lottieLoader";

import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import {AxiosResponse} from "axios";

import logo from '../Assets/logo.png';
import animationData from '../Assets/chat-icon-circle.json';

function Login() {
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<FormEvent>) => {
        e.preventDefault();
        setLoading(true);

        const request = JSON.stringify({
            email: emailRef.current!.value,
            password: passwordRef.current!.value
        })

        let response = ({} as AxiosResponse);
        try {
            response = await httpConnection.put('/users/login', request, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            setLoading(false);
        }

        localStorage.setItem('token', response!.headers['x-auth-token']);
        (window as Window).location = '../';
    };

    const handleNavigate = () => navigate('../signup');

    return (
        <>
            {/*@ts-ignore*/}
            <div className="form__root" onSubmit={handleSubmit}>
                <form className="form__container">
                    <div className="form__logo__container">
                        <img src={logo} className="form__logo__image" alt="Logo"/>
                        <span>Talkrr</span>
                    </div>
                    <span style={{display: 'flex', flexDirection: 'column', padding: 10, width: '100%'}}>
                        <TextField style={{display: 'block', marginBottom: '1.25vh'}}
                                   variant="outlined" size="medium" label="E-mail" inputRef={emailRef}/>
                        <TextField style={{display: 'block', marginBottom: '2vh'}}
                                   variant="outlined" size="medium" type="password" label="Password"
                                   inputRef={passwordRef}/>
                        <span className="form-btn-section">
                            <LoadingButton loading={loading}
                                           style={{...styles.button, ...styles.containedButton(loading)}}
                                           variant="contained" type="submit">Login</LoadingButton>
                            <Button style={{...styles.button, ...styles.textButton}} variant="text"
                                    onClick={handleNavigate}>SignUp</Button>
                        </span>
                    </span>
                </form>
                <div className="lottie__container">
                    <LottieLoader animationData={animationData}/>
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
    },
    containedButton: (loading: boolean) => ({
        backgroundColor: loading ? 'rgba(0,0,0,0)' : '#8b00ff'
    }),
    textButton: {
        color: '#8b00ff'
    }
}

export default Login;