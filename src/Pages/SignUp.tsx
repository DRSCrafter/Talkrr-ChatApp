import '../Styles/Pages/form.scss';
import React, {Component} from "react";
import Joi from 'joi';

import httpConnection from "../utils/http";

import {IconButton, TextField, Button} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LottieLoader from "../utils/lottieLoader";
import LoadingButton from "@mui/lab/LoadingButton";
import {AxiosResponse} from "axios";

import logo from "../Assets/logo.png";
import animation from '../Assets/chat-icon-circle.json';

class SignUp extends Component {
    state = {
        data: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            phoneNumber: "",
            bio: ""
        },
        profileImage: null,
        errors: {},
        loading: false
    }

    schema = Joi.object({
        name: Joi.string().required().min(3).messages({
            "string.empty": "Enter your name!",
            "string.min": "Enter a name at least 3 characters long!",
        }),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).messages({
            "string.empty": "Enter your name!",
            "string.email": "Enter a valid e-mail!",
        }),
        password: Joi.string().min(5).max(100).required().messages({
            "string.empty": "Enter a password",
            "string.min": "Enter a name at least 5 characters long!",
            "string.max": "Enter a name at most 100 characters long!",
        }),
        passwordConfirm: Joi.string().required().messages({
            "string.empty": "Repeat the password",
        }),
        phoneNumber: Joi.string(),
        bio: Joi.string()
    });

    validate = () => {
        const {error} = this.schema.validate(this.state.data, {abortEarly: false})
        if (!error) return null;

        const errors = {};
        for (let item of error.details) (errors as any)[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({name: key, value}: { name: string, value: any }) => {
        const obj = {[key]: value};
        const schema = Joi.object({[key]: this.schema.extract(key)});
        const {error} = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({profileImage: e.target.files![0]});

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({loading: true});

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const {data, profileImage} = this.state;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('profileImage', profileImage!);

        let response = ({} as AxiosResponse);
        try {
            response = await httpConnection.post('/users/', formData);
        } catch (ex) {
            this.setState({loading: false});
        }
        localStorage.setItem('token', response.headers['x-auth-token']);
        (window as Window).location = '../';
    };

    handleChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement>) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) (errors as any)[input.name] = errorMessage;
        else delete (errors as any)[input.name];

        const data = {...this.state.data};
        (data as any)[input.name] = input.value;

        this.setState({data, errors});
    };


    render() {
        const handleNavigate = () => (window as Window).location = '/login';
        const {data, errors, loading}: { data: any, errors: any, loading: boolean } = this.state;

        return (
            <>
                <div className="form__root">
                    <form className="form__container" onSubmit={this.handleSubmit}>
                        <div className="form__logo__container">
                            <img src={logo} className="form__logo__image" alt="Logo"/>
                            <span>Talkrr</span>
                        </div>
                        <div className="form__grid">
                            <div className="double-span">
                                <TextField variant="outlined" size="small"
                                           name="name" value={data.name} onChange={this.handleChange}
                                           label={errors.name ? "error" : "Username"}
                                           error={errors.name} helperText={errors.name} style={{width: '94%'}}/>
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={this.handleFileChange}/>
                                    <PhotoCameraIcon/>
                                </IconButton>
                            </div>
                            <TextField variant="outlined" size="small"
                                       name="email" value={data.email} onChange={this.handleChange}
                                       label={errors.email ? "error" : "E-mail"}
                                       error={errors.email} helperText={errors.email} className="double-span"/>
                            <TextField variant="outlined" size="small"
                                       name="phoneNumber" value={data.phoneNumber} onChange={this.handleChange}
                                       label={errors.phoneNumber ? "error" : "Phone Number(Optional)"}
                                       error={errors.phoneNumber} helperText={errors.phoneNumber}
                                       className="double-span"/>
                            <TextField variant="outlined" size="small"
                                       name="password" value={data.password} onChange={this.handleChange}
                                       label={errors.password ? "error" : "Password"}
                                       type="password"
                                       error={errors.password} helperText={errors.password}/>
                            <TextField variant="outlined" size="small"
                                       name="passwordConfirm" value={data.passwordConfirm}
                                       onChange={this.handleChange}
                                       label={errors.passwordConfirm ? "error" : "Repeat Password"}
                                       type="password"
                                       error={errors.passwordConfirm} helperText={errors.passwordConfirm}/>
                            <TextField variant="outlined" size="small"
                                       name="bio" value={data.bio} onChange={this.handleChange}
                                       label={errors.bio ? "error" : "Bio(100 Max characters)"}
                                       error={errors.bio} helperText={errors.bio} className="double-span"/>
                        </div>
                        <span className="form-btn-section">
                                <LoadingButton
                                    loading={loading}
                                    style={{...styles.button, ...styles.containedButton(loading)}}
                                    variant="contained"
                                    type="submit">
                                    Submit
                                </LoadingButton>
                                <Button style={{...styles.button, ...styles.textButton}} variant="text"
                                        onClick={handleNavigate}>Cancel</Button>
                            </span>
                    </form>
                    <div className="lottie__container">
                        <LottieLoader animationData={animation}/>
                    </div>
                </div>
            </>
        );
    }
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

export default SignUp;