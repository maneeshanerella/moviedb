import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie, guestToken }) => {
  // State to store the user's rating for the movie
  const [userRating, setUserRating] = useState(0);

  // Fetch the user's rating when the component mounts or when guestToken or movie.id changes
  useEffect(() => {
    // Construct the URL for fetching the user's rating
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=46826f12550dd6a2d85e036a2ee75c91&guest_session_id=${guestToken}`;

    // Fetch the user's rating from the API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // If the fetch is successful and data.success is true, set the user's rating in state
        if (data.success) {
          setUserRating(data.rating.value);
        }
      })
      .catch(error => console.error('Error fetching user rating:', error));
  }, [guestToken, movie.id]);

  // Function to handle changes in the user's rating
  const handleRatingChange = rating => {
    // Update the user's rating in state
    setUserRating(rating);

    // Construct the URL for submitting the new rating
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=46826f12550dd6a2d85e036a2ee75c91&guest_session_id=${guestToken}`;
    const ratingData = { value: rating };

    // Options for the POST request to submit the new rating
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // Replace with your authorization token (Bearer token)
        Authorization: 'Bearer your-auth-token-here',
      },
      body: JSON.stringify(ratingData),
    };

    // Send the POST request to submit the new rating
    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log('Rating submitted:', data))
      .catch(error => console.error('Error submitting rating:', error));
  };

  // Function to handle deleting the user's rating
  const handleDeleteRating = () => {
    // Construct the URL for deleting the user's rating
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=46826f12550dd6a2d85e036a2ee75c91&guest_session_id=${guestToken}`;

    // Options for the DELETE request to delete the rating
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // Replace with your authorization token (Bearer token)
        Authorization: 'Bearer your-auth-token-here',
      },
    };

    // Send the DELETE request to delete the rating
    fetch(url, options)
      .then(response => {
        if (response.status === 204) {
          // If the response status is 204 (No Content), the rating was deleted successfully
          console.log('Rating deleted');
          // Reset the user's rating to 0 in state
          setUserRating(0); 
        } else {
          // If the response status is not 204, there was an error
          console.error('Error deleting rating:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting rating:', error));
  };

  // Create an array of star elements for rating display
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

  // Render the movie card with details and rating options
  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      </div>
      <h3>{movie.title}</h3>
      <div className="rating-stars">{stars}</div>
      {/* Display the "Delete Rating" button if the user has already rated the movie */}
      {userRating > 0 && (
        <button className="delete-button" onClick={handleDeleteRating}>
          Delete Rating
        </button>
      )}
    </div>
  );
};

export default MovieCard;
