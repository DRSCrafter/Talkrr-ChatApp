//@ts-nocheck

import '../../Styles/Components/Dialogs/privateDialog.scss';
import React, {useContext, useEffect, useRef, useState} from 'react';
import UserContext from "../../Context/userContext";
import httpConnection from "../../utils/http";

import {
    Autocomplete, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from "@mui/lab/LoadingButton";
import DialogProps from "../../types/components/dialogs/dialog";
import User from "../../types/context/user";

function GroupDialog({open, onClose}: DialogProps) {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);

    const [userList, setUserList] = useState([]);
    const [choice, setChoice] = useState('');
    const [onlyContacts, showOnlyContacts] = useState(true);

    const [loading, setLoading] = useState(false);

    const nameRef = useRef('');
    const aboutRef = useRef('');
    const [chatImage, setChatImage] = useState(null);

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

    const handleFileChange = (event: React.ChangeEvent<any>) => setChatImage(event.target.files[0]);

    const handleAddGroupChat = async (e: React.FormEvent) => {
        e.preventDefault();

        let idList = choice.map(choice => choice._id);
        const requestList = JSON.stringify([user._id, ...idList]);
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
        handleGetList().then(res => setUserList(res));
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
                        <form style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}} onSubmit={handleAddGroupChat}>
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
                        </form>
                        <FormControlLabel control={<Checkbox checked={onlyContacts} onChange={toggleBox}/>}
                                          label="Only show the contacts"/>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton
                            loading={loading}
                            style={styles.loadingButton(loading)}
                            variant="contained"
                            type="submit"
                        >
                            {"Create Chat"}
                        </LoadingButton>
                        <Button style={styles.cancelButton} variant="text" onClick={onClose}>
                            {"Cancel"}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
        ;
}

const styles = {
    loadingButton: (loading) => ({
        backgroundColor: loading ? 'rgba(0,0,0,0)' : '#8b00ff',
        width: '40%'
    }),
    cancelButton: {
        width: '15%',
        color: '#707070'
    }
}

export default GroupDialog;