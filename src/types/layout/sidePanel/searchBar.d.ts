import React from "react";

export default interface SearchBar {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}