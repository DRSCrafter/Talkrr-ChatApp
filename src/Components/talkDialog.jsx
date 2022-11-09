import '../Styles/Components/talkDialog.css';
import React, {useContext} from 'react';

import {styled} from '@mui/material/styles';
import {Dialog, IconButton, useMediaQuery} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleIcon from '@mui/icons-material/People';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {handleDeletePrivateTalk, handleLeaveGroupTalk} from "../utils/talkHandling";
import TalkContext from "../Context/talkContext";
import ControlSection from "./controlSection";
import UserContext from "../Context/userContext";
import InfoIcon from "@mui/icons-material/Info";

const {apiEndpoint} = require('../config.json');

function TalkDialog({open, onClose, talkInfo, members}) {
    const {user, handleUpdateUser} = useContext(UserContext);
    const {setTalkID} = useContext(TalkContext);

    const isPC = useMediaQuery('(min-width: 1024px)');

    const DialogContainer = styled(Dialog)(() => ({
        '& .MuiPaper-root': {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '30px',
            backgroundColor: '#252525',
            minHeight: '500px',
            overflowX: 'hidden',
            color: "white",
            boxSizing: 'border-box',
            padding: '20px'
        },
    }));

    const deletePrivateTalk = async () => {
        await handleDeletePrivateTalk(talkInfo.id, user, handleUpdateUser);
        setTalkID('');
        onClose();
    }

    const leaveGroupTalk = async () => {
        await handleLeaveGroupTalk(talkInfo.id, user, handleUpdateUser);
        setTalkID('');
        onClose();
    }

    return (
        <>
            <DialogContainer
                open={open}
                onClose={onClose}
                fullWidth={isPC}
                fullScreen={!isPC}
                style={{backdropFilter: 'blur(10px)'}}
            >
                <div style={{margin: '-10px'}}>
                    <IconButton style={{color: 'white'}} onClick={onClose}>
                        <KeyboardBackspaceIcon fontSize={"medium"}/>
                    </IconButton>
                </div>
                <div className="dialog-header-container">
                    <span className="dialog-header-image-container">
                        <img
                            src={talkInfo && `${apiEndpoint}/${talkInfo?.talkImage}`}
                            className="dialog-header-profile-image"
                        />
                    </span>
                    <div className="dialog-header-profile-info">
                        <div style={{fontSize: 22}}>{talkInfo?.name}</div>
                        <div style={{fontSize: 13}}>{talkInfo?.members?.length} members</div>
                    </div>
                </div>
                <span style={{display: "flex", flexDirection: 'column', rowGap: '5px'}} className="dialog-sections">
                    {talkInfo?.isPrivate &&
                        <>
                            <div className="dialog-details">
                                <AlternateEmailIcon fontSize="medium"/>
                                <span style={{marginLeft: 10,}}>{talkInfo?.email}</span>
                            </div>
                            {talkInfo?.phoneNumber &&
                                <div className="dialog-details">
                                    <PhoneIcon fontSize="medium"/>
                                    <span style={{marginLeft: 10,}}>{talkInfo?.phoneNumber}</span>
                                </div>
                            }
                        </>
                    }
                    <div className="dialog-details">
                        <InfoIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>{talkInfo?.about}</span>
                    </div>
                </span>
                {!talkInfo?.isPrivate &&
                    <span className="dialog-sections">
                        <div style={{margin: '10px', display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                            <PeopleIcon style={{marginRight: '15px'}}/>
                            <span>Members</span>
                        </div>
                        {members.map(member => (
                            <div style={{width: '100%', height: '70px', display: "flex", alignItems: "center"}}
                                 key={member._id}>
                                <img src={`${apiEndpoint}/${member?.profileImage}`} className="dialog-member-image"/>
                                <span className="dialog-member-text">
                                    {member?.name}
                                </span>
                            </div>
                        ))}
                    </span>
                }
                <ControlSection
                    talkInfo={talkInfo}
                    onLeaveGroup={leaveGroupTalk}
                    onDeletePrivate={deletePrivateTalk}
                    callback={onClose}
                />
            </DialogContainer>
        </>
    );
}

export default TalkDialog;