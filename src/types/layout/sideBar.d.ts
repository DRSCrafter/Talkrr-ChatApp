export default interface SideBar {
    open: boolean,
    onToggle: (open: boolean) => (event: any) => void
}