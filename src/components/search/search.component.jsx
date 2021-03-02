import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInput = () => {
    setSearchValue("");
  };

  const searchFood = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInput();
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter food name.."
        value={searchValue}
        onChange={handleSearchInput}
      />
      <input type="submit" value="Search" onClick={searchFood} />
    </div>
  );
};

export default Search;
