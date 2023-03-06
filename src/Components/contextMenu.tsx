import React from 'react';
import {Menu, MenuItem} from "@mui/material";
import ContextMenuProps from "../types/components/contextMenu";

function ContextMenu({list, onContext, onClose}: ContextMenuProps) {
    const handleClick = (CallBack: () => void) => {
        onClose();
        CallBack();
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
                {list?.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleClick(item.onClick)}
                        style={(styles.menuItem as React.CSSProperties)}
                    >
                        {item.icon} {item.text}
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