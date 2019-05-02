import React from "react";
import ReactDOM from "react-dom";

import Spotify from "spotify-web-api-js";

// import "./styles.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      devices: [],
      songs: [],
      search: "",
      currentDevice: ""
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
    await this.spotifyClient.play({
      device_id: this.state.currentDevice,
      uris: [`spotify:track:${songId}`]
    });
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
      <div className="ui container">
        <form className="ui form" onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={e => this.setState({ search: e.target.value })}
          />
          <input type="submit" value="Search" />
        </form>
        <div className="ui container six column grid">
          {this.state.songs.map(song => (
            <div
              className="ui one column card"
              key={song.id}
              onClick={e => this.startPlayback(song.id)}
            >
              <div className="image">
                {/* <img src={song.album.images[0].url} /> */}
              </div>
              <div className="content">
                <p className="header">{song.name}</p>
                <div className="meta">
                  <span className="date">
                    {song.artists.map(artist => artist.name).join(", ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <select
          className="ui dropdown"
          onChange={e => this.setState({ currentDevice: e.target.value })}
        >
          {this.state.devices.map(device => (
            <option value={device.id}>{device.name}</option>
          ))}
        </select>
      </div>
    );
  }
}
// class Search extends React.Component {
//     constructor(props) {
//         super(props);
//         this.onChange = this.onChange.bind(this);
//         this.keyPress = this.keyPress.bind(this);
//         // this.token = "BQA7cJaDt0l4UiTpDOser70NCKogOt7m89VlYoljHQzuHE67AFu0aDuU7V-dWikJniqZt5LxYmuRsEyrTrcqRl6Antaf0Ol9mfFq_cC9LxKZXX_AmLZho8F7MuVgL5RpgCRl7ZVEjEQXyUTKcsJYQ01nNOnpueLo2XNnwQ";
//         this.state = {
//           authenticated: false,
//           devices: [],
//           songs: [],
//           search: "",
//           currentDevice: "",
//           query: ""
//         };
//         // this.onSubmit = this.onSubmit.bind(this);
//     }
//     onChange = e => {
//       const { value } = e.target;
//       this.setState({
//         query: value
//       });
//     };

//     keyPress = e => {
//         e.preventDefault();
//           console.log('value',this.state.query);
//           this.search(this.state.query);
//       };
  
//     search = query => {
//         const token = "BQA7cJaDt0l4UiTpDOser70NCKogOt7m89VlYoljHQzuHE67AFu0aDuU7V-dWikJniqZt5LxYmuRsEyrTrcqRl6Antaf0Ol9mfFq_cC9LxKZXX_AmLZho8F7MuVgL5RpgCRl7ZVEjEQXyUTKcsJYQ01nNOnpueLo2XNnwQ";
//         const url = 'https://api.spotify.com/v1/search?access_token='+token+'&query='+query+'&type=track&limit=1';
//         console.log(url);
//         fetch(url)
//             .then(results => results.json())
//             .then(data => {
//                 this.setState({ songs: data.tracks });
//                 console.log(data.tracks);
//             });
        
//     };
  
//     async componentDidMount() {
//       if (window.location.hash) {
//         // Remove the "#"
//         const queryString = window.location.hash.substring(1);
//         // Parse the access_token out
//         const accessToken = new URLSearchParams(queryString).get("access_token");
//         this.spotifyClient = new Spotify();
//         this.spotifyClient.setAccessToken(accessToken);
  
//         const { devices } = await this.spotifyClient.getMyDevices();
//         // const devices = Object.keys(devicesResp).map(key => devicesResp[key]);
//         this.setState({
//           authenticated: true,
//           devices,
//           currentDevice: devices[0].id
//         });
//       }
//     }
  
//     render() {
//       return (
//         <form
//           onSubmit={this.keyPress}
//         >

//           <input
//             type="text"
//             className="search-box"
//             placeholder="Search for..."
//             onChange={this.onChange}
//           />

//           {/* {this.state.people.map(person => (
//             <ul key={person.name}>
//               <li>{person.name}</li>
//             </ul>
//           ))} */}
//         </form>
//       );
//     }
//   }

  export default Search;