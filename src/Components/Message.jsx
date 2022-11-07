import '../Styles/Components/Message.css';
import React from "react";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ContextMenu from "./contextMenu";

function Message({isSent, message, onGetMember, onDelete, onCopy}) {
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null
        );
    };
    const handleClose = () => {
        setContextMenu(null);
    };

    const {content, sender, date} = message;

    const member = onGetMember(sender);

    const contextUserList = [
        // {
        //     text: "Reply",
        //     icon: <ReplyIcon style={styles.menuItem}/>,
        // },
        {
            text: "Copy",
            icon: <ContentCopyIcon style={styles.menuItem}/>,
            onClick: () => onCopy(message.content)
        },
        // {
        //     text: "Edit",
        //     icon: <EditIcon style={styles.menuItem}/>
        // },
        {
            text: "Delete",
            icon: <DeleteIcon style={styles.menuItem}/>,
            onClick: () => onDelete(message._id)
        },
    ]

    const contextOthersList = [
        // {
        //     text: "Reply",
        //     icon: <ReplyIcon style={styles.menuItem}/>,
        // },
        {
            text: "Copy",
            icon: <ContentCopyIcon style={styles.menuItem}/>,
            onClick: () => onCopy(message.content)
        },
    ]

    return (
        <div style={styles.container(isSent)} className="message-container">
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
    container: isSent => ({direction: isSent ? 'rtl' : 'ltr'}),
    menuItem: {marginRight: 15, padding: 5}
};

export default Message;