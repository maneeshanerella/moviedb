import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Routes
import PopularMovies from './PopularMovies.js';
import TopRatedMovies from './TopRatedMovies.js';
import './App.css';

function App() {
  const [guestToken, setGuestToken] = useState('');

  useEffect(() => {
    // Fetch guest session token
    fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=46826f12550dd6a2d85e036a2ee75c91')
      .then(response => response.json())
      .then(data => setGuestToken(data.guest_session_id))
      .catch(error => console.error('Error creating guest session:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/popular">Popular Movies</Link>
            </li>
            <li>
              <Link to="/top-rated">Top Rated Movies</Link>
            </li>
          </ul>
        </nav>
        
        {/* Use Routes container to wrap your Route components */}
        <Routes>
          <Route path="/popular" element={<PopularMovies guestToken={guestToken} />} />
          <Route path="/top-rated" element={<TopRatedMovies guestToken={guestToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
