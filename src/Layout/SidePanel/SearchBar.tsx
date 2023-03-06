import '../../Styles/Layout/SidePanel/SearchBar.css';
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarProps from "../../types/layout/sidePanel/searchBar";

function SearchBar({value, onChange}: SearchBarProps) {
    return (
        <div className="search-bar-container input">
            <SearchIcon fontSize="large" className="search-bar-image"/>
            <input value={value} onChange={onChange} className="search-bar-input" placeholder={'Search'}/>
        </div>
    );
}

export default SearchBar;