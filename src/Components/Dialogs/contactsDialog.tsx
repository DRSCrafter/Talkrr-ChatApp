import '../../Styles/Components/Dialogs/contactsDialog.scss';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {toast} from "react-toastify";

import {Dialog, IconButton, useMediaQuery} from "@mui/material";
import {styled} from "@mui/material/styles";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import UserContext from "../../Context/userContext";
import httpConnection from "../../utils/http";
import {handleRemoveContact} from "../../services/chat";
import DialogProps from "../../types/components/dialogs/dialog";
import User from "../../types/context/user";

import undefinedUser from '../../Assets/undefinedUser.jpg';

function ContactsDialog({open, onClose}: DialogProps) {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);
    const [contacts, setContacts] = useState([]);
    const isPC = useMediaQuery('(min-width: 1024px)');
    const navigate = useNavigate();

    const getContactsInfo = async () => await httpConnection.get(`/users/${user._id}/contacts`);

    useEffect(() => {
        if (user?._id)
            getContactsInfo().then(res => setContacts(res.data));
    }, [user]);

    const removeContact = async (id: string) => {
        await handleRemoveContact(id, user, handleUpdateUser);
        onClose();
    }

    const handleAddPrivateChat = async (id: string) => {
        const exists = await httpConnection.get(`/chats/${user._id}/private/${id}`);
        if (exists.data) {
            navigate(`../../chat/${exists.data._id}`);
            onClose();
            return;
        }

        const userIndex = contacts.findIndex((target: User) => target._id === id);
        if (userIndex === -1) {
            toast.error('Not a valid Username');
        }

        const target: User = contacts[userIndex];

        const formDataChat = new FormData();
        formDataChat.append('name', 'name');
        formDataChat.append('about', 'about');
        formDataChat.append('members', JSON.stringify([user._id, target._id]));
        formDataChat.append('isPrivate', (true as any));

        const {data} = await httpConnection.post(`/chats/`, formDataChat);

        // @ts-ignore
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
                <div className="contact__dialog__header">
                    <div>
                        <IconButton style={{color: 'white'}} onClick={onClose}>
                            <KeyboardBackspaceIcon fontSize={"medium"}/>
                        </IconButton>
                    </div>
                    <span className="contact__header__title">
                        Contacts
                    </span>
                </div>
                {contacts.length !== 0 ? (contacts.map((contact: User) => (
                        <div className="contact__dialog__info" key={contact._id}>
                            <span style={{display: 'flex', alignItems: 'center'}}>
                                <LazyLoadImage
                                    src={contact?.profileImage}
                                    placeholderSrc={undefinedUser}
                                    className="contact__info__image"
                                />
                                <span className="contact__info__content">
                                    {contact?.name}
                                </span>
                            </span>
                            <span>
                                <IconButton
                                    style={{color: 'dodgerblue', marginRight: 10}}
                                    onClick={() => handleAddPrivateChat(contact._id)}
                                >
                                    <QuestionAnswerIcon fontSize={"medium"}/>
                                </IconButton>
                                <IconButton style={{color: 'red'}} onClick={() => removeContact(contact._id)}>
                                    <PersonRemoveIcon fontSize={"medium"}/>
                                </IconButton>
                            </span>
                        </div>
                    ))) :
                    <div className="contact__not-found">
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