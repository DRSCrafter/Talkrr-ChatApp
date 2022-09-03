import '../Styles/Components/UserButton.css';
import React, {useContext} from "react";
import Button from "@mui/material/Button";
import TalkContext from "../Context/talkContext";

function UserButton({talk}) {
    const {setTalkID} = useContext(TalkContext);

    const handleClick = () => {
        console.log(talk.id);
        setTalkID(talk.id);
    }

    return (
        <Button className="user-button-container" style={styles.sideUserContainer} onClick={handleClick}>
            <span className="user-button-profile-image-container">
                <img src={require('../Assets/thumbnail (1).png')} className="user-button-profile-image"
                     alt="user profile"/>
            </span>
            <span className="user-button-profile-text">
                <div className="user-button-profile-name">{talk.name}</div>
                <div className="user-button-profile-message">last message here</div>
            </span>
        </Button>)
}

const styles = {
    sideUserContainer: {
        backgroundColor: 'rgba(256, 256, 256, 0.4)',
        color: '#ffffff',
        margin: '10px auto auto',
        borderRadius: 10,
        padding: 0,
    },
};

export default UserButton;