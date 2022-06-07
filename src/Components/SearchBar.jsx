import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
    return (
        <div className="input" style={styles.searchBar}>
            <SearchIcon fontSize="large" style={{color: 'white', marginInline: 5}}/>
            <input style={styles.searchInput} placeholder={'Search'}/>
        </div>
    );
}

const styles = {
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: '6%',
        borderRadius: 15,
        marginBlock: 10,
        paddingRight: 20,
        margin: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: "blur(4px)",
        color: 'white'
    }, searchInput: {
        width: '100%', color: 'white', height: '100%', background: 'none', outline: 'none', fontSize: 16, border: 0
    }
};

export default SearchBar;