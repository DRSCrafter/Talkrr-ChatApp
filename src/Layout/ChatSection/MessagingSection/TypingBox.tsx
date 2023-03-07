import "../../../Styles/Layout/ChatSection/MessagingSection/TypingBox.scss";
import React, {useState} from "react";
import {IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import data from '@emoji-mart/data'
import Picker from "@emoji-mart/react";
import TypingBoxProps from "../../../types/layout/chatSection/messagingSection/typingBox";

function TypingBox({value, onChange, onSend, onEmojiAdd}: TypingBoxProps) {
    const [emojiShow, setEmojiShow] = useState(false);
    const handleToggleEmojiShow = () => setEmojiShow(!emojiShow);

    return (
        <form className="typing-box" onSubmit={onSend}>
            <input
                className="typing-box__input input"
                placeholder="Type and Press Login to Send"
                value={value}
                onChange={onChange}
            />
            <span style={{position: 'relative', display: 'inline'}}>
                <IconButton className="typing-box__button" onClick={handleToggleEmojiShow}>
                    <EmojiEmotionsIcon/>
                </IconButton>
                <div className={`typing-box__emoji typing-box__emoji__mobile ${!emojiShow && 'hidden'}`}>
                    <Picker data={data} onEmojiSelect={onEmojiAdd} style={{width: '100px'}}/>
                </div>
            </span>
            <IconButton className="typing-box__button" type="submit">
                <SendIcon/>
            </IconButton>
        </form>
    );
}

export default TypingBox;
