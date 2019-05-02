import React from "react";
import ReactDOM from "react-dom";
import Spotify from "spotify-web-api-js";
import "./styles.css";
import { Search } from "semantic-ui-react";
import SearchComp from "./Search.jsx";
import Playlist from "./Playlist.jsx";
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
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  async componentDidMount() {
    if (window.location.hash) {
      const queryString = window.location.hash.substring(1);
      const accessToken = new URLSearchParams(queryString).get("access_token");
      this.spotifyClient = new Spotify();
      this.spotifyClient.setAccessToken(accessToken);
      const { devices } = await this.spotifyClient.getMyDevices();
      this.setState({
        authenticated: true,
        devices,
        currentDevice: devices[0].id
      });
    }
  }

  addSongToPlaylist(songName, artistNames, songId) {
    let newSong = {
      songName: songName,
      artistNames: artistNames,
      songId: songId
    }
    let curPlaylist = this.state.playlistSongs;
    this.setState({playlistSongs: [...curPlaylist, newSong]})
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
      <div className="ui left aligned category search">
        <div class="ui equal width grid">
          <div class="column">
            <SearchComp addSong={this.addSongToPlaylist}/>
          </div>
          <div class="column">
            <Playlist playlist={this.state.playlistSongs}/>
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