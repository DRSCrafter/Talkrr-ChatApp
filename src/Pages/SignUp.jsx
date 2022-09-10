import '../Styles/Pages/SignUp.css';
import React, {Component} from "react";
import Button from "@mui/material/Button";
import Joi from 'joi';
import {TextField} from "@mui/material";
import http from '../utils/httpConnection';
import {Toaster} from "react-hot-toast";
import httpConnection from "../utils/httpConnection";
import {useNavigate} from "react-router-dom";

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
        console.log('reached');
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const {data} = this.state;
        const request = JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            bio: data.bio
        });

        const response = await httpConnection.post('http://localhost:3001/api/users/', {
            name: data.name,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            bio: data.bio
        })

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
                <img className="signup-background" src={require('../Assets/Background/login.jpg')} alt="background"/>
                <div className="signup-root-container">
                    <form className="signup-form-container">
                        <span className="signup-header">Welcome to Talkrr</span>
                        <div className="signUp-Window">
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="name" value={data.name} onChange={this.handleChange}
                                       label={errors.name ? "error" : "First Name"}
                                       error={errors.name} helperText={errors.name} className="double-span"/>
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="email" value={data.email} onChange={this.handleChange}
                                       label={errors.email ? "error" : "E-mail"}
                                       error={errors.email} helperText={errors.email}/>
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="phoneNumber" value={data.phoneNumber} onChange={this.handleChange}
                                       label={errors.phoneNumber ? "error" : "Phone Number(Optional)"}
                                       error={errors.phoneNumber} helperText={errors.phoneNumber}/>
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="password" value={data.password} onChange={this.handleChange}
                                       label={errors.password ? "error" : "Password"}
                                       error={errors.password} helperText={errors.password}/>
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="passwordConfirm" value={data.passwordConfirm} onChange={this.handleChange}
                                       label={errors.passwordConfirm ? "error" : "Repeat Password"}
                                       error={errors.passwordConfirm} helperText={errors.passwordConfirm}/>
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="bio" value={data.bio} onChange={this.handleChange}
                                       label={errors.bio ? "error" : "Bio(100 Max characters)"}
                                       error={errors.bio} helperText={errors.bio} className="double-span"/>
                            <span className="btn-section">
                            <Button sx={{width: 100, height: 40, marginRight: 1}} variant="contained"
                                    onClick={this.handleSubmit}>Submit</Button>
                            <Button sx={{width: 100, height: 40}} variant="text"
                                    onClick={handleNavigate}>Cancel</Button>
                        </span>
                        </div>
                    </form>
                    <Toaster position={"bottom-right"}
                             toastOptions={{style: {backgroundColor: 'rgba(255,255,255,0.6)'}}}/>
                </div>
            </>
        );
    }
}

export default SignUp;