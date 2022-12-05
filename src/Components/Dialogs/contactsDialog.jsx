import '../../Styles/Components/Dialogs/contactsDialog.css';
import React, {useContext, useEffect, useState} from 'react';

import {Dialog, IconButton, useMediaQuery} from "@mui/material";
import {styled} from "@mui/material/styles";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

import UserContext from "../../Context/userContext";
import httpConnection from "../../utils/httpConnection";
import {handleRemoveContact} from "../../utils/chatHandling";
import {toast} from "react-toastify";
import ChatContext from "../../Context/chatContext";
import {useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import TryIcon from "@mui/icons-material/Try";

function ContactsDialog({open, onClose}) {
    const isPC = useMediaQuery('(min-width: 1024px)');
    const {user, handleUpdateUser} = useContext(UserContext);
    const {socketRef} = useContext(ChatContext);
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    const getContactsInfo = async () => {
        const {data} = await httpConnection.get(`/users/${user._id}/contacts`);
        setContacts(data);
    }

    useEffect(() => {
        if (user)
            getContactsInfo();
    }, [user]);

    const removeContact = async (id) => {
        await handleRemoveContact(id, user, handleUpdateUser);
        onClose();
    }

    const handleAddPrivateChat = async (id) => {
        const exists = await httpConnection.get(`/chats/${user._id}/private/${id}`);
        if (exists.data) {
            navigate(`../../chat/${exists.data._id}`);
            onClose();
            return;
        }

        const userIndex = contacts.findIndex(target => target._id === id);
        if (userIndex === -1) {
            toast.error('Not a valid Username');
        }

        const target = contacts[userIndex];

        const formDataChat = new FormData();
        formDataChat.append('name', 'name');
        formDataChat.append('about', 'about');
        formDataChat.append('members', JSON.stringify([user._id, target._id]));
        formDataChat.append('isPrivate', true);

        const {data} = await httpConnection.post(`/chats/`, formDataChat);

        const chats = [...user.chats, {id: data._id}];
        onClose();
        handleUpdateUser('chats', chats);
        socketRef.current.emit('createRoom', {chatID: data._id, userIDs: [target._id]});
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
                {contacts.length !== 0 ? (contacts.map(contact => (
                        <div className="contact-info-container" key={contact._id}>
                            <span style={{display: 'flex', alignItems: 'center'}}>
                                <LazyLoadImage
                                    src={contact?.profileImage}
                                    placeholderSrc={require('../../Assets/undefinedUser.jpg')}
                                    className="contact-info-image"
                                />
                                <span className="contact-info-text">
                                    {contact?.name}
                                </span>
                            </span>
                            <span>
                                <IconButton
                                    style={{color: 'dodgerblue', marginRight: 10}}
                                    onClick={() => handleAddPrivateChat(contact._id)}>
                                    <QuestionAnswerIcon fontSize={"medium"}/>
                                </IconButton>
                                <IconButton style={{color: 'red'}} onClick={() => removeContact(contact._id)}>
                                    <PersonRemoveIcon fontSize={"medium"}/>
                                </IconButton>
                            </span>
                        </div>
                    ))) :
                    <div className="contact-not-found">
                        <ConnectWithoutContactIcon style={{fontSize: '120px'}}/>
                        <div>
                            Connect to some people, will ya?
                        </div>
                    </div>}
            </DialogContainer>
        </>
    );
}

export default ContactsDialog;