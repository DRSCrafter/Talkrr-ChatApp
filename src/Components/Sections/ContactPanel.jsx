import '../../Styles/Components/Sections/ContactPanel.css';
import React, {useContext, useEffect, useState} from "react";

import Button from "@mui/material/Button";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import LogoutIcon from '@mui/icons-material/Logout';

import TalkContext from "../../Context/talkContext";
import UserContext from "../../Context/userContext";
import {handleAddContact, handleDeletePrivateTalk, handleLeaveGroupTalk, handleRemoveContact, processTalkData}
    from "../../utils/talkHandling";

function ContactPanel() {
    const [talkInfo, setTalkInfo] = useState({});
    const {setTalkID, currentTalk} = useContext(TalkContext);
    const {user, handleUpdateUser} = useContext(UserContext);

    useEffect(() => {
        processTalkData(user, currentTalk).then(res => setTalkInfo(res));
    }, [currentTalk]);

    const deletePrivateTalk = async () => {
        await handleDeletePrivateTalk(talkInfo.id, user, handleUpdateUser);
        setTalkID('');
    }
    const leaveGroupTalk = async () => {
        await handleLeaveGroupTalk(talkInfo.id, user, handleUpdateUser);
        setTalkID('');
    }

    return (
        <div className="contact-panel-root">
            <div className="contact-panel-container">
                <div className="identity-container">
                    <img src={require('../../Assets/thumbnail (1).png')} className="profile-image"/>
                    <span className="profile-name">{talkInfo && talkInfo.name}</span>
                </div>

                {talkInfo && talkInfo.email ? <div className="details-container">
                    <div className="profile-details">
                        <AlternateEmailIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>{talkInfo && talkInfo.email}</span>
                    </div>
                    {talkInfo && talkInfo.phoneNumber &&
                        <div className="profile-details">
                            <PhoneIcon fontSize="medium"/>
                            <span style={{marginLeft: 10,}}>{talkInfo && talkInfo.phoneNumber}</span>
                        </div>
                    }
                    <div className="bio">{talkInfo && talkInfo.bio}</div>
                </div> : <div></div>}

                <div className="controls-container">
                    {talkInfo.isPrivate ?
                        <Button className="control-btn" style={styles.button} onClick={deletePrivateTalk}>
                            <DeleteIcon fontSize="medium"/>
                            <span style={{marginLeft: 10}}>Delete Talk</span>
                        </Button> :
                        <Button className="control-btn" style={styles.button} onClick={leaveGroupTalk}>
                            <LogoutIcon fontSize="medium"/>
                            <span style={{marginLeft: 10}}>Leave Talk</span>
                        </Button>
                    }
                    {talkInfo && talkInfo.isPrivate &&
                        <>
                            {user.contacts.includes(talkInfo._id) ?
                                <Button className="control-btn"
                                        onClick={() => handleRemoveContact(talkInfo._id, user, handleUpdateUser)}
                                        style={{...styles.button, color: 'red'}}>
                                    <PersonRemoveAlt1Icon fontSize="medium"/>
                                    <span style={{marginLeft: 10,}}>Remove Contact</span>
                                </Button> :
                                <Button className="control-btn"
                                        onClick={() => handleAddContact(talkInfo._id, user, handleUpdateUser)}
                                        style={{...styles.button, color: 'dodgerblue',}}>
                                    <PersonAddAlt1Icon fontSize="medium"/>
                                    <span style={{marginLeft: 10,}}>Add Contact</span>
                                </Button>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

const styles = {
    button: {
        display: 'flex', justifyContent: 'flex-start', padding: '10px'
    }
}

export default ContactPanel;