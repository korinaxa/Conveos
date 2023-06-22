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
    {movieDetails === null ? (<p>No results found.</p>) : (
        <ul>
          <div className="object_container">
            <h3>Title: {movieDetails.Title}</h3>
            <p>Year: {movieDetails.Year}</p>
            <p>Rating: {movieDetails.imdbRating}</p>
            <img src={movieDetails.Poster} alt={movieDetails.Title} />
          </div>
        </ul>
      )}
      <Link to="/">Go back</Link>
  </div>
);
}
export default DetailedPage;
