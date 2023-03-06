import React from 'react';
import {Button} from "@mui/material";
import MenuButtonProps from "../types/components/menuButton";

function MenuButton({text, icon, onClose, onClick}: MenuButtonProps) {
    const handleClick = () => {
        onClick();
        onClose();
    }

    return (
        <>
            <Button style={styles.button} variant="text" startIcon={icon} onClick={handleClick}>
                    <span>
                        {text}
                    </span>
            </Button>
        </>
    );
}

const styles = {
    button: {
        display: 'block',
        paddingBlock: '10px',
        color: '#000000'
    }
}

export default MenuButton;