import '../Styles/Components/contactsDialog.css';
import React, {useContext, useEffect, useState} from 'react';

import {Dialog, IconButton, useMediaQuery} from "@mui/material";
import {styled} from "@mui/material/styles";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import UserContext from "../Context/userContext";
import httpConnection from "../utils/httpConnection";
import {handleRemoveContact} from "../utils/talkHandling";
import {toast} from "react-toastify";
import TalkContext from "../Context/talkContext";
import {useNavigate} from "react-router-dom";

const {apiEndpoint} = require('../config.json');

function ContactsDialog({open, onClose}) {
    const isPC = useMediaQuery('(min-width: 1024px)');
    const {user, handleUpdateUser} = useContext(UserContext);
    const {socketRef} = useContext(TalkContext);
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    const getContactsInfo = async () => {
        const {data} = await httpConnection.get(`${apiEndpoint}/api/users/${user._id}/contacts`);
        setContacts(data);
    }

    useEffect(() => {
        getContactsInfo();
    }, [user]);

    const removeContact = async (id) => {
        await handleRemoveContact(id, user, handleUpdateUser);
        onClose();
    }

    const handleAddPrivateTalk = async (id) => {
        const exists = await httpConnection.get(`${apiEndpoint}/api/talks/${user._id}/private/${id}`);
        if (exists.data) {
            console.log(exists.data);
            navigate(`../../talk/${exists.data._id}`);
            onClose();
            return;
        }

        const userIndex = contacts.findIndex(target => target._id === id);
        if (userIndex === -1) {
            toast.error('Not a valid Username');
        }

        const target = contacts[userIndex];

        const formDataTalk = new FormData();
        formDataTalk.append('name', 'name');
        formDataTalk.append('about', 'about');
        formDataTalk.append('members', JSON.stringify([user._id, target._id]));
        formDataTalk.append('isPrivate', true);

        const {data} = await httpConnection.post(`${apiEndpoint}/api/talks/`, formDataTalk);

        const talks = [...user.talks, {id: data._id}];
        onClose();
        handleUpdateUser('talks', talks);
        socketRef.current.emit('createRoom', {talkID: data._id, userIDs: [target._id]});
    }

    const DialogContainer = styled(Dialog)(() => ({
        '& .MuiPaper-root': {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '15px',
            backgroundColor: '#252525',
            minHeight: '500px',
            overflowX: 'hidden',
            color: "white",
            boxSizing: 'border-box',
            padding: '20px'
        },
    }));

    return (
        <>
            <DialogContainer
                open={open}
                onClose={onClose}
                fullWidth={isPC}
                fullScreen={!isPC}
                style={{backdropFilter: 'blur(10px)'}}
            >
                <div className="contact-dialog-header">
                    <div>
                        <IconButton style={{color: 'white'}} onClick={onClose}>
                            <KeyboardBackspaceIcon fontSize={"medium"}/>
                        </IconButton>
                    </div>
                    <span className="contact-dialog-header-title">
                        Contacts
                    </span>
                </div>
                {contacts.map(contact => (
                    <div className="contact-info-container" key={contact._id}>
                        <span style={{display: 'flex', alignItems: 'center'}}>
                            <img
                                src={`${apiEndpoint}/${contact?.profileImage}`}
                                className="contact-info-image"
                            />
                            <span className="contact-info-text">
                                {contact?.name}
                            </span>
                        </span>
                        <span>
                            <IconButton style={{color: 'dodgerblue', marginRight: 10}}>
                                <QuestionAnswerIcon fontSize={"medium"}
                                                    onClick={() => handleAddPrivateTalk(contact._id)}/>
                            </IconButton>
                            <IconButton style={{color: 'red'}}>
                                <PersonRemoveIcon fontSize={"medium"} onClick={() => removeContact(contact._id)}/>
                            </IconButton>
                        </span>
                    </div>
                ))}
            </DialogContainer>
        </>
    );
}

export default ContactsDialog;