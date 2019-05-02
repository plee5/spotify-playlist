import React from "react";
import ReactDOM from "react-dom";

import Spotify from "spotify-web-api-js";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      devices: [],
      songs: [],
      search: "",
      currentDevice: "",
      playlistSongs: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  async componentDidMount() {
    if (window.location.hash) {
      // Remove the "#"
      const queryString = window.location.hash.substring(1);
      // Parse the access_token out
      const accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(accessToken);

      const { devices } = await this.spotifyClient.getMyDevices();
      // const devices = Object.keys(devicesResp).map(key => devicesResp[key]);
      this.setState({
        authenticated: true,
        devices,
        currentDevice: devices[0].id
      });
    }
  }

  async startPlayback(songId) {
    await this.spotifyClient.play({
      device_id: this.state.currentDevice,
      uris: [`spotify:track:${songId}`]
    });
  }

  async addSongToPlaylist(songName, artistNames, songId) {
    const newSong = {
      songName: songName,
      artistNames: artistNames,
      songId: songId
    }
    let curPlaylist = this.state.playlistSongs;
    this.setState({playlistSongs: [...curPlaylist, newSong]})
  }

  async onSubmit(ev) {
    ev.preventDefault();
    const {
      tracks: { items: songs }
    } = await this.spotifyClient.searchTracks(this.state.search, {
      market: "us"
    });
    this.setState({ songs });
  }

  render() {
    if (!this.state.authenticated) {
      return (
        <a
          href={`https://accounts.spotify.com/authorize/?client_id=ac9ec319b658424d8aa1e41317e7c70f&response_type=token&redirect_uri=${window
            .location.origin +
            window.location
              .pathname}&scope=user-read-playback-state user-modify-playback-state user-top-read user-read-private`}
        >
          Login with Spotify
        </a>
      );
    }
    return (
      <div className="ui right aligned category search">
        <form className="ui icon input" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Search for songs..."
            onChange={e => this.setState({ search: e.target.value })}
          />
          <input type="submit" value="Search" />
        </form>
        <div class="ui two column grid">
          <div class="column">
          <div class="ui compact message">Current Search Results</div>

            <div className="ui celled list">
              {this.state.songs.slice(0,5).map(song => (
                <div
                  className="item"
                  key={song.id}
                  // onClick={e => this.startPlayback(song.id)}
                >
                  {/* <div className="image">
                    <img class="ui avatar image" src={song.album.images[0].url} />
                  </div> */}
                  <div className="content">
                    <p className="header">{song.name}</p>
                    <div className="meta">
                      <span className="date">
                        {song.artists.map(artist => artist.name).join(", ")}
                      </span>
                    </div>
                    <button class="ui right floated green button"
                        onClick={this.addSongToPlaylist}>Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="column">
            <div class="ui compact message">Current Playlist</div>
            <div className="ui celled list">
              {this.state.playlistSongs.map(song => (
                <div
                  className="item"
                  key={song.id}
                  onClick={e => this.startPlayback(song.id)}
                >
                  {/* <div className="image">
                    <img class="ui avatar image" src={song.album.images[0].url} />
                  </div> */}
                  <div className="content">
                    <p className="header">{song.name}</p>
                    <div className="meta">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <select
          className="ui dropdown"
          onChange={e => this.setState({ currentDevice: e.target.value })}
        >
          {this.state.devices.map(device => (
            <option value={device.id}>{device.name}</option>
          ))}
        </select> */}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
