import '../../Styles/Components/Dialogs/privateDialog.css';
import React, {useContext, useEffect, useRef, useState} from 'react';
import UserContext from "../../Context/userContext";
import httpConnection from "../../utils/httpConnection";

import {
    Autocomplete, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function GroupDialog({open, onClose}) {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);

    const [userList, setUserList] = useState([]);
    const [choice, setChoice] = useState('');
    const [onlyContacts, showOnlyContacts] = useState(true);

    const nameRef = useRef('');
    const aboutRef = useRef('');
    const [chatImage, setChatImage] = useState(null);

    const handleChoose = (event, value) => setChoice(value);

    const toggleBox = (event) => showOnlyContacts(event.target.checked);

    const handleGetList = async () => {
        let list = await httpConnection.get('/users/strict/list');
        if (onlyContacts)
            list = handleFilterFriends(list.data);
        else
            list = list.data;
        list = list.filter(member => member._id !== user._id);
        setUserList(list);
    }
    const handleFilterFriends = (list) => {
        const result = [];
        for (let contact of list) {
            if (user?.contacts.includes(contact._id))
                result.push(contact);
        }
        return result;
    }

    const handleFileChange = event => setChatImage(event.target.files[0]);

    const handleAddGroupChat = async (e) => {
        e.preventDefault();

        let idList = choice.map(choice => choice._id);
        const requestList= JSON.stringify([user._id, ...idList]);
        const formDataChat = new FormData();
        formDataChat.append('name', nameRef.current.value);
        formDataChat.append('about', aboutRef.current.value);
        formDataChat.append('members', requestList);
        formDataChat.append('isPrivate', false);
        formDataChat.append('chatImage', chatImage);
        try {
            const {data} = await httpConnection.post('/chats/', formDataChat);

            const id = {id: data._id};
            const chats = [...user.chats, id];
            handleUpdateUser('chats', chats);
            socketRef.current.emit('createRoom', {chatID: data._id, userIDs: [user._id, ...idList]});
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
                        {"ُStart a new Group Chat"}
                    </DialogTitle>
                    <DialogContent sx={{overflow: 'visible'}}>
                        <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', columnGap: '10px'}}>
                                <IconButton color="primary" aria-label="upload picture" component="label"
                                            size={"large"}>
                                    <input hidden accept="image/*" type="file" onChange={handleFileChange}/>
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
                                        label="Choose the members"
                                        placeholder="Favorites"
                                        {...params}
                                    />
                                )}
                            />
                        </div>
                        <FormControlLabel control={<Checkbox checked={onlyContacts} onChange={toggleBox}/>}
                                          label="Only show the contacts"/>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{width: '40%'}} variant="contained" onClick={handleAddGroupChat}>
                            {"Create Chat"}
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