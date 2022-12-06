import '../Styles/Components/controlSection.css';
import React, {useContext} from 'react';
import UserContext from "../Context/userContext";
import {handleAddContact, handleRemoveContact} from "../utils/chatHandling";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function ControlSection({chatInfo, onDeletePrivate, onLeaveGroup, callback}) {
    const {user, handleUpdateUser} = useContext(UserContext);

    const addContact = async () => {
        await handleAddContact(chatInfo._id, user, handleUpdateUser);
        if (callback)
            callback();
    }

    const removeContact = async () => {
        await handleRemoveContact(chatInfo._id, user, handleUpdateUser);
        if (callback)
            callback();
    }

    return (
        <>
            <div className="controls-container">
                {chatInfo?.isPrivate ?
                    <Button className="control-btn" style={{...styles.button, color: "red"}}
                            onClick={onDeletePrivate}>
                        <DeleteIcon fontSize="medium"/>
                        <span style={{marginLeft: 10}}>Delete Chat</span>
                    </Button> :
                    <Button className="control-btn" style={styles.button} onClick={onLeaveGroup}>
                        <LogoutIcon fontSize="medium"/>
                        <span style={{marginLeft: 10}}>Leave Chat</span>
                    </Button>
                }
                {chatInfo?.isPrivate &&
                    <>
                        {user.contacts.includes(chatInfo._id) ?
                            <Button
                                className="control-btn"
                                onClick={removeContact}
                                style={{...styles.button, color: 'red'}}>
                                <PersonRemoveAlt1Icon fontSize="medium"/>
                                <span style={{marginLeft: 10,}}>Remove Contact</span>
                            </Button> :
                            <Button
                                className="control-btn"
                                onClick={addContact}
                                style={{...styles.button, color: 'dodgerblue',}}>
                                <PersonAddAlt1Icon fontSize="medium"/>
                                <span style={{marginLeft: 10,}}>Add Contact</span>
                            </Button>
                        }
                    </>
                }
            </div>
        </>
    );
}

const styles = {
    button: {
        display: 'flex', justifyContent: 'flex-start', padding: '10px'
    }
}

export default ControlSection;