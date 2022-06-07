import '../App.css';

import UserButton from "../Components/UserButton";
import SearchBar from "../Components/SearchBar";
import SideBottom from "../Components/SideBottom";
import Banner from "../Components/Banner";

function SidePanel() {
    return (<>
            <span style={styles.sidePanel}>
                <Banner/>
                <SearchBar/>
                <div style={styles.usersContainer}>
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

const styles = {
    sidePanel: {
        width: '23%', minWidth: 250, minHeight: 700, height: '100vh', padding: 10, paddingRight: 0, marginTop: 30
    }, usersContainer: {
        width: '100%', height: '70%', minHeight: 400, overflow: 'scroll', overflowX: 'hidden'
    }
}

export default SidePanel;
