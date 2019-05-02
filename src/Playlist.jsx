import React from "react";
import ReactDOM from "react-dom";
import Spotify from "spotify-web-api-js";
import "./styles.css";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           authenticated: false,
           devices: [],
           songs: [],
           search: "",
           currentDevice: "",
        };
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
    
    async removePlayback(songId) {
      this.props.playlist.filter((song) => {
        if (song.songId == songId) {
          song.inPlaylist = false;
        }
      })
    }

    render() {
        return (
            <div>
                <div class="ui compact message">Current Playlist</div>
                    <div className="ui celled list">
                    {this.props.playlist.map(song => (
                      song.inPlaylist &&
                        <div
                        className="item"
                        key={song.songId}
                        onClick={e => this.startPlayback(song.songId)}
                        >
                        {/* <div className="image">
                            <img class="ui avatar image" src={song.album.images[0].url} />
                        </div> */}
                        <p className="header">{song.songName}</p>
                        
                        <div className="meta">
                               {song.artistNames}
                               <div class="ui icon right floated buttons">
                                   <button class="ui button" onClick={e => this.removePlayback(song.songId)}>
                                       <i class="x icon"></i>
                                   </button>
                                </div>
                        </div>
                                {/* <div className="meta">
                                <span className="date">
                                    {song.artist}
                                </span> */}
                                {/* </div> */}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Playlist;