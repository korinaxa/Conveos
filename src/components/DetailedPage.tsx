import React, { useState, useEffect }  from 'react';
import '../App.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const apiKey = "9e3139c8";

interface MovieDetails {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Runtime: string;
  Released: string;
  Actors: string;
  Awards: string;
  Country: string;
  DVD: string;
  Plot: string;
  Writer: string;
  Poster: string;
  imdbRating: number;
  Director: string;
  Language: string;
  Genre: string;
}


function DetailedPage() {
  
const { Title } = useParams<{ Title: string }>();
const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

useEffect(() => {
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?t=${Title}&apikey=${apiKey}`);
      setMovieDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  fetchMovieDetails();
}, [Title]);

return (
  <div>
    <Link className="links" to="/">Go back</Link>
    {movieDetails === null ? (<p>No results found.</p>) : (
    <div className="flex-container">
      <div className="flex-child">
        <div id="title_text"><span>{movieDetails.Title}</span></div>
        <p><span>Released: </span>{movieDetails.Released}</p>
        <p><span>Year: </span>{movieDetails.Year}</p>
        <p><span>Type: </span>{movieDetails.Type}</p>
        <p><span>Genre: </span>{movieDetails.Genre}</p>
        <p><span>Plot: </span>{movieDetails.Plot}</p>
        <p><span>Actors: </span>{movieDetails.Actors}</p>
        <p><span>Awards: </span>{movieDetails.Awards}</p>
        <p><span>Country: </span>{movieDetails.Country}</p>
        <p><span>Runtime: </span>{movieDetails.Runtime}</p>
        <p><span>Writer: </span>{movieDetails.Writer}</p>
        <p><span>Director: </span>{movieDetails.Director}</p>
        <p><span>Language: </span>{movieDetails.Language}</p>       
        <p><span>DVD: </span>{movieDetails.DVD}</p>
      </div>
      <div id="second_child" className="flex-child">
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
        <p>Rating: {movieDetails.imdbRating}</p>
      </div>
    </div>
    )}
  </div>
);
}
export default DetailedPage;
