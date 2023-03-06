import {RenderedChat} from "../context/chat";

export default interface SidePanel {
    chats: RenderedChat[],
    onToggleDrawer: (open: boolean) => (event: any) => void
}