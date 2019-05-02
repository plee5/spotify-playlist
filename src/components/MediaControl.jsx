import React from 'react';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PausePlayButton from './PausePlayButton';
import { Direction, Slider } from 'react-player-controls';
import '../styles/mediacontrol.css';
import VolumeControl from './VolumeControl';
import Spotify from "spotify-web-api-js";

class MediaControl extends React.Component {
    constructor(props) {
        super(props);
        this.toggleIsPlaying = this.toggleIsPlaying.bind(this);
        this.skipToPrevious = this.skipToPrevious.bind(this);
        this.skipToNext = this.skipToNext.bind(this);
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);
        this.state = {
            isPlaying: false,
            authenticated: false,
            devices: [],
            songs: [],
            search: "",
            currentDevice: "",
            playlistSongs: []
        }
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

    async toggleIsPlaying() {
        await this.spotifyClient.getMyCurrentPlayingTrack({
            device_id: this.state.currentDevice
        }).then((response) => {
            this.setState({
                isPlaying: response.is_playing
            })
        });
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
    }

    async pause() {
        await this.spotifyClient.pause({
            device_id: this.state.currentDevice
        });
    }

    async play() {
        await this.spotifyClient.play({
            device_id: this.state.currentDevice
        });
    }

    async skipToNext() {
        await this.spotifyClient.skipToNext({
            device_id: this.state.currentDevice
        });
    }

    async skipToPrevious() {
        await this.spotifyClient.skipToPrevious({
            device_id: this.state.currentDevice
        });
    }

    render() {
        const { isPlaying } = this.state;
        return (
        <div className="media-container">
            <div>
                <PreviousButton onClick={this.skipToPrevious}/>

                <PausePlayButton isPlaying={isPlaying} onClick={this.toggleIsPlaying}/>

                <NextButton onClick={this.skipToNext}/>
                <VolumeControl />
            </div>
        </div>
        );
    }
}

export default MediaControl;