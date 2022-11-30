import "../../../Styles/Layout/ChatSection/MessagingSection/TypingBox.css";
import React, {useState} from "react";
import {IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import data from '@emoji-mart/data'
import Picker from "@emoji-mart/react";

function TypingBox({value, onChange, onSend, onEmojiAdd}) {
    const [emojiShow, setEmojiShow] = useState(false);
    const handleToggleEmojiShow = () => setEmojiShow(!emojiShow);

    return (
        <form className="typing-box-container" onSubmit={onSend}>
            <input
                className="typing-box-input input"
                placeholder="Type and Press Login to Send"
                value={value}
                onChange={onChange}
            />
            <span style={{position: 'relative', display: 'inline'}}>
                <IconButton className="typing-box-btn" onClick={handleToggleEmojiShow}>
                    <EmojiEmotionsIcon/>
                </IconButton>
                <div className={`typing-box-emoji typing-box-emoji-phone ${!emojiShow && 'hidden'}`}>
                    <Picker data={data} onEmojiSelect={onEmojiAdd} style={{width: '100px'}}/>
                </div>
            </span>
            <IconButton className="typing-box-btn" type="submit">
                <SendIcon/>
            </IconButton>
        </form>
    );
}

export default TypingBox;
