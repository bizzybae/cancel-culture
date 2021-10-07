import React, {  useState } from "react";
import { BsSearch } from "react-icons/bs";
import { searchTweet } from "../redux/asyncActions/TweetAsync";
import { useDispatch, useSelector } from "react-redux";
import "../styles/explore.css";
import { Link } from "react-router-dom";
const SearchInput = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const tweetsInfo = useSelector((state) => state.notificationReducer);
  const searchResult = tweetsInfo.searchQuery;

  const searchMe = (e) => {
    e.preventDefault();

      dispatch(searchTweet(query));
  
  };
  return (
    <form
      autoComplete="off"
      onSubmit={searchMe}
      className="mt-2 position-relative d-flex justify-content-center mb-4"
    >
      <BsSearch className="searchicons" />
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyUp={searchMe}
        type="text"
        className="searchinput"
        id="search-bar"
        placeholder="Search Twitter"
      />
      {searchResult.length > 0 && (
        <div className="resultDiv">
          {searchResult.map((res) => (
            <Link to={`${res.author.username}/tweet/${res.id}`} key={res.id}>
              <SearchResult res={res} />
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchInput;

const SearchResult = ({ res }) => {
  return (
    <div className="d-flex result">
      <img className="authorImage" src={res?.author.avatar} alt="your result" />
      <div className="mx-3">
        <strong>{res.author.username}</strong>
        <p className="side-name">{res.title}</p>
      </div>
    </div>
  );
};
