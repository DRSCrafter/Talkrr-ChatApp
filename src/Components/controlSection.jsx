import '../Styles/Components/controlSection.css';
import React, {useContext} from 'react';
import UserContext from "../Context/userContext";
import {handleAddContact, handleRemoveContact} from "../utils/talkHandling";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function ControlSection({talkInfo, onDeletePrivate, onLeaveGroup, middleware}) {
    const {user, handleUpdateUser} = useContext(UserContext);

    const addContact = async () => {
        await handleAddContact(talkInfo._id, user, handleUpdateUser);
        if (middleware)
            middleware();
    }

    const removeContact = async () => {
        await handleRemoveContact(talkInfo._id, user, handleUpdateUser);
        if (middleware)
            middleware();
    }

    return (
        <>
            <div className="controls-container">
                {talkInfo.isPrivate ?
                    <Button className="control-btn" style={{...styles.button, color: "red"}}
                            onClick={onDeletePrivate}>
                        <DeleteIcon fontSize="medium"/>
                        <span style={{marginLeft: 10}}>Delete Talk</span>
                    </Button> :
                    <Button className="control-btn" style={styles.button} onClick={onLeaveGroup}>
                        <LogoutIcon fontSize="medium"/>
                        <span style={{marginLeft: 10}}>Leave Talk</span>
                    </Button>
                }
                {talkInfo && talkInfo.isPrivate &&
                    <>
                        {user.contacts.includes(talkInfo._id) ?
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