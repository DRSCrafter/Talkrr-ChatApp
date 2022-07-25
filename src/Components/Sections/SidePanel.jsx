import '../../App.css';
import '../../Styles/Components/Sections/SidePanel.css';

import UserButton from "../UserButton";
import SearchBar from "../SearchBar";
import SideBottom from "../SideBottom";
import Banner from "../Banner";

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
