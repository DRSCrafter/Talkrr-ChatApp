import '../Styles/Pages/form.css';
import React, {Component} from "react";
import Joi from 'joi';

import httpConnection from "../utils/httpConnection";

import {IconButton, TextField, Button} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LottieLoader from "../utils/lottieLoader";

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
        errors: {}
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
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({name: key, value}) => {
        const obj = {[key]: value};
        const schema = Joi.object({[key]: this.schema.extract(key)});
        const {error} = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleFileChange = event => this.setState({profileImage: event.target.files[0]});

    handleSubmit = async (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const {data, profileImage} = this.state;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('profileImage', profileImage);

        const response = await httpConnection.post('/users/', formData);
        localStorage.setItem('token', response.headers['x-auth-token']);
        window.location = '../';
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;

        this.setState({data, errors});
    };


    render() {
        const handleNavigate = () => window.location = '/login';
        const {data, errors} = this.state;

        return (
            <>
                <div className="form-root">
                    <form className="form-container">
                        <div className="form-logo-container">
                            <img src={require('../Assets/logo.png')} className="form-logo-image"/>
                            <span>Talkrr</span>
                        </div>
                            <div className="form-grid">
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
                                <Button style={{...styles.button, ...styles.containedButton}} variant="contained"
                                        onClick={this.handleSubmit}>Submit</Button>
                                <Button style={{...styles.button, ...styles.textButton}} variant="text"
                                        onClick={handleNavigate}>Cancel</Button>
                            </span>
                    </form>
                    <div className="lottie-container">
                        <LottieLoader animationData={require('../Assets/chat-icon-circle.json')}/>
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
    containedButton: {
        backgroundColor: '#8b00ff'
    },
    textButton: {
        color: '#8b00ff'
    }
}

export default SignUp;