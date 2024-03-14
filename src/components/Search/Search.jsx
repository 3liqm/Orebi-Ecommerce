import React, { useEffect, useState } from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  fetchAsyncSearchProduct,
  getSearchProducts,
  getSearchProductsStatus,
} from "../../Store/SearchSlice";
import SearchResultBox from "../SearchResultBox/SearchResultBox";
import { Link } from "react-router-dom";

const Search = () => {
  // Redux hooks for dispatching actions and selecting data from the store
  const dispatch = useDispatch();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);
  // State to manage local search results and query terms
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Handler for user input in the search input field
  useEffect(() => {
    setSearchResults(searchProducts);
  }, [searchProducts]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchTerm(e.target.value);

// Dispatching an action to fetch search results based on the input query
    dispatch(fetchAsyncSearchProduct(query));
  };

// Handler for when a user clicks on a search result item
  const handleItemClick = (selectedProduct) => {
    // Clearing search results and query when an item is selected
    setSearchQuery("");
    dispatch(clearSearch()); 
  };
  return (
     // search input field, search icon and search results box
    <div className="search-box">
      <div className="search-box-content">
        <input
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="Search your products here"
        />
        <FaSearch size={18} />
      </div>
      {/* Linking to the search results page based on the search term */}
      <Link to={`/search/${searchTerm}`}>
        {searchQuery && (
          <SearchResultBox
            products={searchResults}
            handleItemClick={handleItemClick}
          />
        )}
      </Link>
    </div>
  );
};

export default Search;
