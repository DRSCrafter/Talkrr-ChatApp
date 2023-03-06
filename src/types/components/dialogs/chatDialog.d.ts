import {RenderedChat} from "../../context/chat";
import User from "../../context/user";
import Dialog from './dialog';

export default interface ChatDialog extends Dialog{
    chatInfo: RenderedChat,
    members: User[],
}