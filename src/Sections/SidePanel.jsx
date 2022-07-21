import '../App.css';
import '../Styles/Sections/SidePanel.css';

import UserButton from "../Components/UserButton";
import SearchBar from "../Components/SearchBar";
import SideBottom from "../Components/SideBottom";
import Banner from "../Components/Banner";

function SidePanel() {
    return (<>
            <span className="side-panel-container">
                <Banner/>
                <SearchBar/>
                <div className="users-container">
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                    <UserButton/>
                </div>
                <SideBottom/>
            </span>
    </>);
}

export default SidePanel;
