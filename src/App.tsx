import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const apiKey = "9e3139c8";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imdbRating: number;
}


const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("movie");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSortOptionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortOption(value);
    switch (value) {
      case 'year':
        handleSortByYear();
        break;
      case 'rating':
        handleSortByRating();
        break;
      default:
        handleSortByTitle();
        break;
    }
  };

  const handleSortByTitle = () => {
    const sortedMovies = [...searchResults].sort((a, b) => a.Title.localeCompare(b.Title));
    setSearchResults(sortedMovies);
  }

  const handleSortByYear = () => {
    const sortedMovies = searchResults.sort((a, b) => parseInt((a.Year).slice(0,4)) - parseInt((b.Year).slice(0,4)));
    setSearchResults(sortedMovies);
  }

  const handleSortByRating = () => {
    const sortedMovies = searchResults.sort((a, b) => b.imdbRating - a.imdbRating);
    setSearchResults(sortedMovies);
  }

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}&type=${selectedOption}`);  
      setSearchResults(response.data.Search);

      const moviesWithoutRating: Movie[] = response.data.Search;
      const promises = moviesWithoutRating.map(async (movie) => {
        const ratingResponse = await await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
        const imdbRating = ratingResponse.data.imdbRating;
        return { ...movie, imdbRating };
      });

      const updatedMovies = await Promise.all(promises);
      setSearchResults(updatedMovies);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {

    if (selectedOption === "") {
      setSearchResults([]);
      return;
    }

    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${selectedOption}&type=${selectedOption}`);  
        const sortedMovies = [...response.data.Search].sort((a, b) => a.Title.localeCompare(b.Title));
        setSearchResults(sortedMovies);

        const moviesWithoutRating: Movie[] = sortedMovies;
        const promises = moviesWithoutRating.map(async (movie) => {
          const ratingResponse = await await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
          const imdbRating = ratingResponse.data.imdbRating;
          return { ...movie, imdbRating };
        });

        const updatedMovies = await Promise.all(promises);
        setSearchResults(updatedMovies);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovieData();

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
      </header>

      <div id="sort_field">
        <label id="label_sort">Sort by: </label>
          <select value={sortOption} onChange={handleSortOptionChange}>
            <option value="default">Title (A-Z)</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div id="search_field">
          <input type="text" value={searchValue} onChange={handleSearchChange}></input>
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
      
      <div className="all_objects">
        {searchResults === undefined ? (<p>No results found.</p>) : (
          <ul>
        {searchResults.map((movie) => (
          <div className="object_container" key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>Year: {movie.Year}</p>
            <p>Rating: {movie.imdbRating}</p>
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
