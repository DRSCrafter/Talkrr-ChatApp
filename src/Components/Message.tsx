import '../Styles/Components/Message.css';
import React from "react";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ContextMenu from "./contextMenu.js";
import MessageProps from '../types/components/messageComponent';

function Message({isSent, message, onGetMember, onDelete, onCopy}: MessageProps) {
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (e: any) => {
        e.preventDefault();
        setContextMenu(
            contextMenu === null
                ? ({
                    mouseX: e.clientX + 2,
                    mouseY: e.clientY - 6,
                } as NonNullable<any>)
                : null
        );
    };
    const handleClose = () => {
        setContextMenu(null);
    };

    const {content, sender, date} = message;

    const member = onGetMember(sender);

    const contextUserList = [
        {
            text: "Copy",
            icon: <ContentCopyIcon style={styles.menuItem}/>,
            onClick: () => onCopy(message.content)
        },
        {
            text: "Delete",
            icon: <DeleteIcon style={styles.menuItem}/>,
            onClick: () => onDelete(message._id)
        },
    ]

    const contextOthersList = [
        {
            text: "Copy",
            icon: <ContentCopyIcon style={styles.menuItem}/>,
            onClick: () => onCopy(message.content)
        },
    ]

    return (
        <div style={(styles.container(isSent) as React.CSSProperties)} className="message-container">
            <div
                className={`message-body ${isSent ? "message-body-send" : "message-body-receive"}`}
                onContextMenu={handleContextMenu}
            >
                {isSent ? null : <div style={{fontWeight: 'bold', marginBottom: 10}}>{member?.name}</div>}
                <span>
                {content}
                    </span>
                <div className="message-data">{date}</div>
            </div>
            <ContextMenu
                list={isSent ? contextUserList : contextOthersList}
                onContext={contextMenu}
                onClose={handleClose}
            />
        </div>
    );
}

const styles = {
    container: (isSent: boolean) => ({direction: isSent ? 'rtl' : 'ltr'}),
    menuItem: {marginRight: 15, padding: 5}
};

export default Message;