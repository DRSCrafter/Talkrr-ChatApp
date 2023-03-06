import '../../Styles/Components/Dialogs/chatDialog.css';
import React, {useContext} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {styled} from '@mui/material/styles';

import {Dialog, IconButton, useMediaQuery} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleIcon from '@mui/icons-material/People';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {handleDeletePrivateChat, handleLeaveGroupChat} from "../../services/chat";
import ChatContext from "../../Context/chatContext";
import ControlSection from "../controlSection.js";
import UserContext from "../../Context/userContext";
import InfoIcon from "@mui/icons-material/Info";
import ChatDialogProps from "../../types/components/dialogs/chatDialog";

import undefinedUser from '../../Assets/undefinedUser.jpg'
import undefinedGroup from '../../Assets/undefinedGroup.jpg'

function ChatDialog({open, onClose, chatInfo, members}: ChatDialogProps) {
    const {user, handleUpdateUser, socketRef} = useContext(UserContext);
    const {setChatID} = useContext(ChatContext);

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

    const deletePrivateChat = async () => {
        await handleDeletePrivateChat(chatInfo.id, user, handleUpdateUser, socketRef);
        setChatID('');
        onClose();
    }

    const leaveGroupChat = async () => {
        await handleLeaveGroupChat(chatInfo.id, user, handleUpdateUser);
        setChatID('');
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
                        <LazyLoadImage
                            src={chatInfo?.chatImage}
                            placeholderSrc={chatInfo?.isPrivate ? undefinedUser : undefinedGroup}
                            className="dialog-header-profile-image"
                        />
                    </span>
                    <div className="dialog-header-profile-info">
                        <div style={{fontSize: 22}}>{chatInfo?.name}</div>
                        <div style={{fontSize: 13}}>
                            {chatInfo.isPrivate ? 'Private Chat' : `${chatInfo?.members?.length} members`}
                        </div>
                    </div>
                </div>
                <span style={{display: "flex", flexDirection: 'column', rowGap: '5px'}} className="dialog-sections">
                    {chatInfo?.isPrivate &&
                        <>
                            <div className="dialog-details">
                                <AlternateEmailIcon fontSize="medium"/>
                                <span style={{marginLeft: 10}}>{chatInfo?.email}</span>
                            </div>
                            {chatInfo?.phoneNumber &&
                                <div className="dialog-details">
                                    <PhoneIcon fontSize="medium"/>
                                    <span style={{marginLeft: 10,}}>{chatInfo?.phoneNumber}</span>
                                </div>
                            }
                        </>
                    }
                    <div className="dialog-details">
                        <InfoIcon fontSize="medium"/>
                        <span style={{marginLeft: 10,}}>{chatInfo?.about}</span>
                    </div>
                </span>
                {!chatInfo?.isPrivate &&
                    <span className="dialog-sections">
                        <div style={{margin: '10px', display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                            <PeopleIcon style={{marginRight: '15px'}}/>
                            <span>Members</span>
                        </div>
                        {members?.map(member => (
                            <div style={{width: '100%', height: '70px', display: "flex", alignItems: "center"}}
                                 key={member._id}>
                                <LazyLoadImage
                                    src={member?.profileImage}
                                    placeholderSrc={chatInfo?.isPrivate ? undefinedUser : undefinedGroup}
                                    className="dialog-member-image"
                                />
                                <span className="dialog-member-text">
                                    {member?.name}
                                </span>
                            </div>
                        ))}
                    </span>
                }
                <ControlSection
                    chatInfo={chatInfo}
                    onLeaveGroup={leaveGroupChat}
                    onDeletePrivate={deletePrivateChat}
                    callback={onClose}
                />
            </DialogContainer>
        </>
    );
}

export default ChatDialog;