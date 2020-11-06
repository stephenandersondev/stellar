import React from 'react'

const SearchBar = ({searchChange}) => {
    return (
        <form className="search-bar">
            <input placeholder="search..." type="text" onChange={(e)=>searchChange(e)} />
        </form>
    )
}

export default SearchBar