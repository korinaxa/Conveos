import React, { useState } from "react";
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
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearch = () => {
    axios.get(`http://www.omdbapi.com/?apikey=9e3139c8&s=${selectedOption}`).then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
        <label>
          <input type="radio" value="movie" checked={selectedOption === "movie"} onChange={handleOptionChange}/>
          Movies
        </label>
        <label>
          <input type="radio" value="series" checked={selectedOption === "series"} onChange={handleOptionChange}/>
          Series
        </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default App;
