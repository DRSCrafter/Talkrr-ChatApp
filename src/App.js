import './App.css';
import React from "react";
import SidePanel from "./Sections/SidePanel";
import Root from "./Sections/Root";
import MessagingSection from "./Sections/MessagingSection";
import ContactPanel from "./Sections/ContactPanel";

function App() {
    return (
        <Root>
            <SidePanel />
            <MessagingSection />
            <ContactPanel />
        </Root>
    );
}

export default App;
