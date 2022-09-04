import '../App.css';
import React, {useContext, useEffect, useState} from "react";
import UserContext from "../Context/userContext";
import TalkContext from "../Context/talkContext";

import SidePanel from "../Components/Sections/SidePanel";
import Root from "../Components/Sections/Root";
import MessagingSection from "../Components/Sections/MessagingSection";
import ContactPanel from "../Components/Sections/ContactPanel";
import SideBar from "../Components/Sections/sideBar";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {getCurrentTalk, getTalks} from "../utils/talkHandling";

function MainPage() {
    const {user} = useContext(UserContext);

    const [talkID, setTalkID] = useState('');
    const [talks, setTalks] = useState([]);
    const [currentTalk, setCurrentTalk] = useState(null);

    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setDrawer(open);
    };

    const drawerList1 = [
        {
            text: 'New Private Talk',
            icon: <PersonIcon/>
        },
        {
            text: 'New Group Talk',
            icon: <PeopleIcon/>
        }
    ];
    const drawerList2 = [
        {
            text: 'Settings',
            icon: <SettingsIcon/>
        },
        {
            text: 'User Preferences',
            icon: <ManageAccountsIcon/>
        }
    ]


    useEffect(() => {
        getTalks(user, setTalks);
    }, [user]);

    useEffect(() => {
        getCurrentTalk(talkID, setCurrentTalk);
    }, [talkID])

    const handleUpdateTalk = (key, value) => setCurrentTalk({...currentTalk, [key]: value});

    return (
        <TalkContext.Provider value={{currentTalk, handleUpdateTalk, setTalkID}}>
            <Root>
                <SidePanel talks={talks} onToggleDrawer={toggleDrawer}/>
                <MessagingSection/>
                <ContactPanel/>
            </Root>
            <SideBar list={[drawerList1, drawerList2]} open={drawer} onToggle={toggleDrawer}/>
        </TalkContext.Provider>
    );
}

export default MainPage;