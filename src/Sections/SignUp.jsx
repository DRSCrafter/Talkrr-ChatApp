import '../Styles/Components/SignUp.css';
import React, {Component} from "react";
import Button from "@mui/material/Button";
import Joi from 'joi';
import {TextField} from "@mui/material";

class SignUp extends Component {
    state = {
        data: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            phoneNumber: "",
            bio: ""
        },
        errors: {}
    }

    schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().min(3).max(35).required(),
        email: Joi.required(),
        password: Joi.string().min(5).max(100).required(),
        passwordConfirm: Joi.string().equal(Joi.ref('password')).messages({'any.only': '{{#label}} does not match'}).required(),
        phoneNumber: Joi.number().integer().min(7).max(24),
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
        // const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        // const errorMessage = "Yo something wrong!";
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;

        this.setState({data, errors});
    };

    doSubmit = () => {
        // Call the POST method of talkrr-backend
    };

    render() {
        const {data, errors} = this.state;
        return (
            <>
                <img className="background" src={require('../Assets/Background/login.jpg')}/>
                <div className="root-container">
                    <div className="form-container">
                        <span className="header">Welcome to Talkrr</span>
                        <div className="signUp-Window">
                            {/*<TextField id="outlined-basic" label="First Name" variant="outlined" size="small"/>*/}
                            {/*<TextField id="outlined-basic" label="Last Name" variant="outlined" size="small"/>*/}
                            {/*<TextField id="outlined-basic" label="E-mail" variant="outlined" size="small"/>*/}
                            {/*<TextField id="outlined-basic" label="Phone Number(Optional)" variant="outlined"*/}
                            {/*           size="small"/>*/}
                            {/*<TextField id="outlined-basic" label="Password" variant="outlined" size="small"/>*/}
                            {/*<TextField id="outlined-basic" label="Repeat Password" variant="outlined" size="small"/>*/}
                            {/*<TextField className="bio-field" id="outlined-basic" label="Bio(100 Max characters)"*/}
                            {/*           variant="outlined" size="small"/>*/}
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="firstName" value={data.firstName} onChange={this.handleChange}
                                       label={errors.firstName ? "error" : "First Name"}
                                       error={errors.firstName} helperText={errors.firstName}/>
                            <TextField id="outlined-basic" variant="outlined" size="small"
                                       name="lastName" value={data.lastName} onChange={this.handleChange}
                                       label={errors.lastName ? "error" : "Last Name"}
                                       error={errors.lastName} helperText={errors.lastName}/>
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
                                       error={errors.bio} helperText={errors.bio} className="bio-field"/>
                            {/*<Input value={data.firstName} onChange={handleChange} label="First Name" error={errorss.firstName} />*/}
                            {/*<Input value={data.lastName} onChange={handleChange} label="Last Name" error={errorss.lastName} />*/}
                            {/*<Input value={data.email} onChange={handleChange} label="E-mail" error={errorss.email} />*/}
                            {/*<Input value={data.phoneNumber} onChange={handleChange} label="Phone Number(Optional)" error={errorss.phoneNumber} />*/}
                            {/*<Input value={data.password} onChange={handleChange} label="Password" error={errorss.password} />*/}
                            {/*<Input value={data.passwordConfirm} onChange={handleChange} label="Repeat Password" error={errorss.passwordConfirm} />*/}
                            {/*<Input className="bio-field" value={data.bio} onChange={handleChange} label="Bio(100 Max characters)" error={errorss.bio} />*/}

                            <span className="btn-section">
                            <Button sx={{width: 100, height: 40, marginRight: 1}} variant="contained">Submit</Button>
                            <Button sx={{width: 100, height: 40}} variant="text">Cancel</Button>
                        </span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SignUp;