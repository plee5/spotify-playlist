import React from "react";
import ReactDOM from "react-dom";
import Spotify from "spotify-web-api-js";
import "./styles.css";

class SearchComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          authenticated: false,
          devices: [],
          songs: [],
          search: "",
          currentDevice: "",
          playlistSongs: [],
          isPlaying: false
        };
        this.onSubmit = this.onSubmit.bind(this);
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
        if(!this.state.isPlaying) {
          await this.spotifyClient.play({
              device_id: this.state.currentDevice,
              uris: [`spotify:track:${songId}`]
          });
          this.setState({
            isPlaying: true
          });
        }
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
          return (
                <div>
                    <form className="ui icon input" onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Search for songs..."
                            onChange={e => this.setState({ search: e.target.value })}
                        />
                        <input type="submit" value="Search" />
                    </form>
                    <div class="ui compact message">Current Search Results</div>
                        <div className="ui celled list">
                        {this.state.songs.slice(0,5).map(song => (
                            <div
                            className="item"
                            key={song.id}
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
                                    onClick={() => this.props.addSong(song.name, song.artists.map(artist => artist.name).join(", "), song.id)}>Add</button>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
          );
      }
}

export default SearchComp;