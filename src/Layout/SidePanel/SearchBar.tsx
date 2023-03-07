import '../../Styles/Layout/SidePanel/SearchBar.scss';
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarProps from "../../types/layout/sidePanel/searchBar";

function SearchBar({value, onChange}: SearchBarProps) {
    return (
        <div className="search-bar input">
            <SearchIcon fontSize="large" className="search-bar__image"/>
            <input value={value} onChange={onChange} className="search-bar__input" placeholder={'Search'}/>
        </div>
    );
}

export default SearchBar;