import React from 'react';
import {Button} from "@mui/material";

function MenuButton({text, icon, onClose, onClick}) {
    const handleClick = (event) => {
        onClick();
        onClose();
    }

    return (
        <>
            <Button style={{display: 'block', paddingBlock: '10px', color: '#000000'}} variant="text" startIcon={icon}
                    onClick={handleClick}>
                    <span>
                        {text}
                    </span>
            </Button>
        </>
    );
}

export default MenuButton;