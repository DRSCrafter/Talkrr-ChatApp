import '../App.css';
import React from "react";
import SidePanel from "../Components/Sections/SidePanel";
import Root from "../Components/Sections/Root";
import MessagingSection from "../Components/Sections/MessagingSection";
import ContactPanel from "../Components/Sections/ContactPanel";

function MainPage() {
    return (
        <Root>
            <SidePanel />
            <MessagingSection />
            <ContactPanel />
        </Root>
    );
}

export default MainPage;