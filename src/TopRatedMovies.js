import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const TopRatedMovies = ({ guestToken }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies
    const apiKey = '46826f12550dd6a2d85e036a2ee75c91';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error('Error fetching popular movies:', error));
  }, []);

  return (
    <div>
      <h2>TopRated Movies</h2>
      <div className="movie-container">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} guestToken={guestToken} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
