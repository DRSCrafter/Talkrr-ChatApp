import '../../App.css';
import '../../Styles/Components/Sections/SidePanel.css';

import UserButton from "../UserButton";
import SearchBar from "../SearchBar";
import SideBottom from "../SideBottom";
import Banner from "../Banner";

function SidePanel({talks}) {
    return (<>
            <span className="side-panel-container">
                <Banner/>
                <SearchBar/>
                <div className="users-container">
                    {talks.map(talk => (<UserButton talk={talk}/>))}
                </div>
                <SideBottom/>
            </span>
    </>);
}

export default SidePanel;
