import React from 'react';
import {Menu, MenuItem} from "@mui/material";

function ContextMenu({list, onContext, onClose}) {
    const onClick = (onclick) => {
        onClose();
        onclick();
    }

    return (
        <>
            <Menu
                open={onContext !== null}
                onClose={onClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    onContext !== null
                        ? {top: onContext.mouseY, left: onContext.mouseX}
                        : undefined
                }
            >
                {list && list.map((item, index) => (
                    <MenuItem key={index} onClick={() => onClick(item.onClick)}
                              style={styles.menuItem}>{item.icon}{item.text}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

const styles = {
    menuItem: {paddingRight: 30, boxSizing: "border-box"}
}

export default ContextMenu;