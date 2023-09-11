import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie, guestToken }) => {
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
  
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=46826f12550dd6a2d85e036a2ee75c91&guest_session_id=${guestToken}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserRating(data.rating.value);
        }
      })
      .catch(error => console.error('Error fetching user rating:', error));
  }, [guestToken, movie.id]);

  const handleRatingChange = rating => {
    setUserRating(rating);

    const url = `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=46826f12550dd6a2d85e036a2ee75c91&guest_session_id=${guestToken}`;
    const ratingData = { value: rating };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjgyNmYxMjU1MGRkNmEyZDg1ZTAzNmEyZWU3NWM5MSIsInN1YiI6IjY0ZTU3Nzg4MDZmOTg0MDBhZTQ3OGRhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ffkHwRxfeWcBOJj66w_45jbOWKD1pGQQIHKgVIe2P2U'
      },
      body: JSON.stringify(ratingData),
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log('Rating submitted:', data))
      .catch(error => console.error('Error submitting rating:', error));
  };

  const handleDeleteRating = () => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=46826f12550dd6a2d85e036a2ee75c91&guest_session_id=${guestToken}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjgyNmYxMjU1MGRkNmEyZDg1ZTAzNmEyZWU3NWM5MSIsInN1YiI6IjY0ZTU3Nzg4MDZmOTg0MDBhZTQ3OGRhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ffkHwRxfeWcBOJj66w_45jbOWKD1pGQQIHKgVIe2P2U'
      },
    };

    fetch(url, options)
      .then(response => {
        if (response.status === 204) {
          console.log('Rating deleted');
          setUserRating(0); 
        } else {
          console.error('Error deleting rating:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting rating:', error));
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= userRating ? 'filled' : ''}`}
        onClick={() => handleRatingChange(i)}
      >
        ★
      </span>
    );
  }

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      </div>
      <h3>{movie.title}</h3>
      <div className="rating-stars">{stars}</div>
      {userRating > 0 && (
        <button className="delete-button" onClick={handleDeleteRating}>
          Delete Rating
        </button>
      )}
    </div>
  );
};

export default MovieCard;
