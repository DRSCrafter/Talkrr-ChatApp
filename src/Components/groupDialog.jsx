import '../Styles/Components/privateDialog.css';
import React, {useContext, useEffect, useRef, useState} from 'react';
import UserContext from "../Context/userContext";
import httpConnection from "../utils/httpConnection";

import {
    Autocomplete, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const {apiEndpoint} = require('../config.json');

function GroupDialog({open, onClose}) {
    const {user, handleUpdateUser} = useContext(UserContext);
    const [userList, setUserList] = useState([]);
    const [choice, setChoice] = useState('');
    const [onlyContacts, showOnlyContacts] = useState(true);

    const nameRef = useRef('');
    const aboutRef = useRef('');

    const handleChoose = (event, value) => setChoice(value);

    const toggleBox = (event) => showOnlyContacts(event.target.checked);

    const handleGetList = async () => {
        let list = await httpConnection.get(`${apiEndpoint}/api/users/strict/list`);
        if (onlyContacts)
            list = handleFilterFriends(list.data);
        else
            list = list.data;
        setUserList(list);
    }
    const handleFilterFriends = (list) => {
        const result = [];
        for (let contact of list) {
            if (user.contacts.includes(contact._id))
                result.push(contact);
        }
        return result;
    }

    const handleAddGroupTalk = async () => {
        const idList = choice.map(choice => choice._id);
        const request = {
            name: nameRef.current.value,
            about: aboutRef.current.value,
            members: [user._id, ...idList],
            isPrivate: false
        }
        try {
            const {data} = await httpConnection.post(`${apiEndpoint}/api/talks/`, JSON.stringify(request), {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });

            const id = {id: data._id};
            const talks = [...user.talks, id];
            handleUpdateUser('talks', talks);
            onClose();
        } catch (ex) {
            console.log(ex.response.message);
        }
    }

    useEffect(() => {
        handleGetList();
    }, [user, onlyContacts])

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
            >
                <div style={{paddingInline: '10px'}}>
                    <DialogTitle>
                        {"ُStart a new Private Talk"}
                    </DialogTitle>
                    <DialogContent sx={{overflow: 'visible'}}>
                        <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', columnGap: '10px'}}>
                                <IconButton color="primary" aria-label="upload picture" component="label"
                                            size={"large"}>
                                    <input hidden accept="image/*" type="file"/>
                                    <PhotoCamera/>
                                </IconButton>
                                <TextField fullWidth inputRef={nameRef} variant={"outlined"} label={"Group Name"}/>
                            </div>
                            <div>
                                <TextField fullWidth inputRef={aboutRef} variant={"outlined"} label={"About Group"}/>
                            </div>
                            <Autocomplete
                                multiple
                                value={choice.name}
                                getOptionLabel={choice => choice.name}
                                onChange={handleChoose}
                                options={userList}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose the members"
                                        placeholder="Favorites"
                                    />
                                )}
                            />
                        </div>
                        <FormControlLabel control={<Checkbox checked={onlyContacts} onChange={toggleBox}/>}
                                          label="Only show the contacts"/>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{width: '40%'}} variant="contained" onClick={handleAddGroupTalk}>
                            {"Create Talk"}
                        </Button>
                        <Button style={{width: '15%', color: '#707070'}} variant="text" onClick={onClose}>
                            {"Cancel"}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
        ;
}

export default GroupDialog;