import React from 'react';
import logo from './logo.svg';
import './App.css';
import Playlist from "./Playlist.jsx";

// function App() {

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addSong = this.addSong.bind(this);
    this.playPause = this.playPause.bind(this);
    this.state = {
      songs : [],
      nextSongId : 0,
    };
  }
  
  addSong(name) {
    const { nextSongId } = this.state;
    const newSong = {
      // TODO 2: initialize new item object
      id : nextSongId,
      name : name,
      songIsPlaying : false,
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextSongId : nextSongId + 1,
      songs : prevState.songs.concat(newSong)
    })));
  }
  
  playPause(id) {
    
    for (var i = 0; i < this.state.songs.length; i++) {
        it = this.state.items[i];
        if (this.state.items[i].id==id) {
          it.songIsPlaying = !it.songIsPlaying;
        }
    }
    this.setState({songs : this.state.songs});
  }
  
  render() { 
    const {
      songs,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
          Spotify Playlist
          </p>
          <div>
          {
            songs.map((it) => (
                <Playlist name = {it.name} isPlaying = {it.songIsPlaying} startPlaying = {() => this.startPlaying(this.id)} /> //will need to map an array
            ))
          }
          </div>
        </header>
        
      </div>
    );
  }
}
//need to add something to add the song.

export default App;
