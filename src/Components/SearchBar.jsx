import '../Styles/Components/SearchBar.css';
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
    return (
        <div className="search-bar-container input">
            <SearchIcon fontSize="large" className="search-bar-image"/>
            <input className="search-bar-input" placeholder={'Search'}/>
        </div>
    );
}

export default SearchBar;