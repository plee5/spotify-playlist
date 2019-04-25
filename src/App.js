import React from 'react';
import logo from './logo.svg';
import './App.css';
import Playlist from "./Playlist.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        Spotify Playlist
        </p>
        <div>
        
          <Playlist /> //will need to map an array
        </div>
      </header>
    </div>
  );
}

export default App;
