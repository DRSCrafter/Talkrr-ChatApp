import React from 'react';

import {IconButton, Menu} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import MenuButton from "./menuButton";

function AddButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton style={{width: 50, color: 'white'}} onClick={handleClick}>
                <AddIcon fontSize="large" style={{color: 'white'}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuButton text="New Private Talk" icon={<PersonIcon style={{display: 'inline'}}/>}
                            onClose={handleClose}/>
                <MenuButton text="New Group Talk" icon={<PeopleIcon style={{display: 'inline'}}/>}
                            onClose={handleClose}/>
            </Menu>
        </>
    );
}

export default AddButton;