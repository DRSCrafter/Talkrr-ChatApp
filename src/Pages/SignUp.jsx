import '../Styles/Pages/SignUp.css';
import React, {Component} from "react";
import Button from "@mui/material/Button";
import Joi from 'joi';
import {TextField} from "@mui/material";
import http from '../utils/httpConnection';

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
        errors: {}
    }

    schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
        password: Joi.string().min(5).max(100).required(),
        passwordConfirm: Joi.string().required(),
        phoneNumber: Joi.string().min(7).max(24),
        bio: Joi.string().min(3).max(100),
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
        console.log(obj);
        const schema = Joi.object({[key]: this.schema.extract(key)});
        const {error} = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleSubmit = async (e) => {
        console.log('reached');
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const {data} = this.state;
        const request = await http.post('http://localhost:3001/api/users/', {
            name: data.name,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            bio: data.bio
        })

        localStorage.setItem('token', request.headers['x-auth-token']);
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
                                    onClick={e => this.handleSubmit(e)}>Submit</Button>
                            <Button sx={{width: 100, height: 40}} variant="text">Cancel</Button>
                        </span>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default SignUp;