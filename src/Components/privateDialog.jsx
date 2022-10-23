import '../Styles/Components/privateDialog.css';
import React, {useContext, useEffect, useState} from 'react';

import {
    Autocomplete, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import UserContext from "../Context/userContext";
import httpConnection from "../utils/httpConnection";
import {toast} from "react-toastify";

const {apiEndpoint} = require('../config.json');

function PrivateDialog({open, onClose}) {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);

    const [userList, setUserList] = useState([]);
    const [choice, setChoice] = useState('');
    const [onlyContacts, showOnlyContacts] = useState(true);

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
            if (user && user.contacts.includes(contact._id))
                result.push(contact);
        }
        return result;
    }

    const handleAddPrivateTalk = async () => {
        const userIndex = userList.findIndex(target => target.name === choice);
        if (userIndex === -1) {
            toast.error('Not a valid Username');
        }

        const target = userList[userIndex];

        const formDataTalk = new FormData();
        formDataTalk.append('name', 'name');
        formDataTalk.append('about', 'about');
        formDataTalk.append('members', JSON.stringify([user._id, target._id]));
        formDataTalk.append('isPrivate', true);

        try {
            const {data} = await httpConnection.post(`${apiEndpoint}/api/talks/`, formDataTalk);

            const id = {id: data._id};
            const talks = [...user.talks, id];
            handleUpdateUser('talks', talks);
            socketRef.current.emit('createRoom', {talkID: data._id, userIDs: [target._id]});
            onClose();
        } catch (ex) {
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
                        <Autocomplete
                            freeSolo
                            disableClearable
                            value={choice}
                            onInputChange={handleChoose}
                            options={userList.map(user => user.name)}
                            renderInput={(params) => (
                                <TextField {...params} label="Search the Username"
                                           InputProps={{...params.InputProps, type: 'search',}}
                                />
                            )}
                        />
                        <FormControlLabel control={<Checkbox checked={onlyContacts} onChange={toggleBox}/>}
                                          label="Only show the contacts"/>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{width: '40%'}} variant="contained" onClick={handleAddPrivateTalk}>
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

export default PrivateDialog;