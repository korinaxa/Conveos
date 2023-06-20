import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("movie");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=9e3139c8&s=${searchValue}&type=${selectedOption}`
      )
      .then((response) => {
        setSearchResults(response.data.Search);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    if (selectedOption === "") {
      setSearchResults([]);
      return;
    }

    axios
      .get(
        `http://www.omdbapi.com/?apikey=9e3139c8&s=${selectedOption}&type=${selectedOption}`
      )
      .then((response) => {
        setSearchResults(response.data.Search);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedOption]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <label id="label_movies">
          <input type="radio" value="movie" checked={selectedOption === "movie"} onChange={handleOptionChange}/>
          Movies
        </label>
        <label id="label_series">
          <input type="radio" value="series" checked={selectedOption === "series"} onChange={handleOptionChange}/>
          Series
        </label>

          <div  id="search_field">
          <input type="text" value={searchValue} onChange={handleSearchChange}></input>
          <button onClick={handleSearchSubmit}>Search</button>
          </div>

      </header>
      
      <div className="all_objects">
        {searchResults === undefined ? (<p>No results found.</p>) : (
          <ul>
        {searchResults.map((movie) => (
          <div className="object_container" key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>Year: {movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
        </ul>
        )}
      </div>

    </div>
  );
};

export default App;
