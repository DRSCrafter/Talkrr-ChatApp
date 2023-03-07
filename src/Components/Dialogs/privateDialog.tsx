// @ts-nocheck

import '../../Styles/Components/Dialogs/privateDialog.scss';
import React, {useContext, useEffect, useState} from 'react';

import {
    Autocomplete, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import UserContext from "../../Context/userContext";
import httpConnection from "../../utils/http";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import User from "../../types/context/user";
import DialogProps from '../../types/components/dialogs/dialog';

function PrivateDialog({open, onClose}: DialogProps) {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);

    const [userList, setUserList] = useState([]);
    const [choice, setChoice] = useState('');
    const [onlyContacts, showOnlyContacts] = useState(true);

    const navigate = useNavigate();

    const handleChoose = (event, value: string) => setChoice(value);

    const toggleBox = (event: React.ChangeEvent<HTMLInputElement>) => showOnlyContacts(event.target.checked);

    const handleGetList = async () => {
        let list = await httpConnection.get('/users/strict/list');
        if (onlyContacts)
            list = handleFilterFriends(list.data);
        else
            list = list.data;
        return list.filter((member: User) => member._id !== user._id);
    }
    const handleFilterFriends = (list: User[]) => {
        const result = [];
        for (let contact of list) {
            if (user?.contacts.includes(contact._id))
                result.push(contact);
        }
        return result;
    }

    const handleAddPrivateChat = async () => {
        const userIndex = userList.findIndex((target: User) => target.name === choice);
        if (userIndex === -1) {
            toast.error('Not a valid Username');
        }

        const target: User = userList[userIndex];

        const exists = await httpConnection.get(`/chats/${user._id}/private/${target._id}`);
        if (exists.data) {
            navigate(`../../chat/${exists.data._id}`);
            onClose();
            return toast.info('Private Chat with this user already exists!');
        }

        const formDataChat = new FormData();
        formDataChat.append('name', 'name');
        formDataChat.append('about', 'about');
        formDataChat.append('members', JSON.stringify([user._id, target._id]));
        formDataChat.append('isPrivate', true);

        const {data} = await httpConnection.post(`/chats/`, formDataChat);

        const chats = [...user.chats, {id: data._id}];
        handleUpdateUser('chats', chats);
        socketRef.current.emit('createRoom', {chatID: data._id, userIDs: [target._id]});
        onClose();
    }

    useEffect(() => {
        handleGetList().then(res => setUserList(res));
    }, [user, onlyContacts])

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
            >
                <form style={{paddingInline: '10px'}} onSubmit={handleAddPrivateChat}>
                    <DialogTitle>
                        {"ُStart a new Private Chat"}
                    </DialogTitle>
                    <DialogContent sx={{overflow: 'visible'}}>
                        <Autocomplete
                            freeSolo
                            disableClearable
                            value={choice}
                            onInputChange={handleChoose}
                            options={userList.map((user: User) => user.name)}
                            renderInput={(params) => (
                                <TextField
                                    label="Search the Username"
                                    InputProps={{...params.InputProps, type: 'search',}}
                                    {...params}
                                />
                            )}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={onlyContacts} style={{color: '#8b00ff'}} onChange={toggleBox}/>}
                            label="Only show the contacts"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{width: '40%', backgroundColor: '#8b00ff'}} variant="contained" type="submit">
                            {"Create Chat"}
                        </Button>
                        <Button style={{width: '15%', color: '#8b00ff'}} variant="text" onClick={onClose}>
                            {"Cancel"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
        ;
}

export default PrivateDialog;