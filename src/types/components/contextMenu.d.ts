interface MenuItem {
    text: string,
    icon: any,
    onClick: () => void
}

export default interface ContextMenu {
    list: MenuItem[],
    onContext: any,
    onClose: () => void
}