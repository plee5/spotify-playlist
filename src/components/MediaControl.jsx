import React from 'react';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PausePlayButton from './PausePlayButton';
import { Direction, Slider } from 'react-player-controls'
import '../styles/mediacontrol.css';
import VolumeControl from './VolumeControl';

class MediaControl extends React.Component {
    constructor(props) {
        super(props);
        this.toggleIsPlaying = this.toggleIsPlaying.bind(this);
        this.previousSong = this.previousSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.state = {
            isPlaying: false,
        }
    }

    toggleIsPlaying() {
        this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
    }

    previousSong() {

    }

    nextSong() {

    }

    render() {
        const { isPlaying } = this.state;
        return (
        <div className="media-control">
            <div>
                <PreviousButton onClick={this.previousSong}/>

                <PausePlayButton isPlaying={isPlaying} onClick={this.toggleIsPlaying}/>

                <NextButton onClick={this.nextSong}/>
                <VolumeControl />
            </div>
        </div>
        );
    }
}

export default MediaControl;