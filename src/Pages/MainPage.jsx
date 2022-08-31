import '../App.css';
import React from "react";
import SidePanel from "../Components/Sections/SidePanel";
import Root from "../Components/Sections/Root";
import MessagingSection from "../Components/Sections/MessagingSection";
import ContactPanel from "../Components/Sections/ContactPanel";
import httpConnection from "../utils/httpConnection";

class MainPage extends React.Component {

    render() {
        const {currentTalk, talks, contactInfo, self} = this.state;

        return (
            <Root>
                <SidePanel talks={talks}/>
                <MessagingSection messages={currentTalk.messages} self={self}/>
                <ContactPanel info={contactInfo}/>
            </Root>
        );
    }
}

export default MainPage;