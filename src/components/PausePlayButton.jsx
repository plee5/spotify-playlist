import React from 'react';
import { PlayerIcon } from 'react-player-controls';
import { ReactComponent as Play } from '../icons/play.svg';
import { ReactComponent as Pause } from '../icons/pause.svg';



function PausePlayButton({ onClick, isPlaying }) {
    return (
        <button className="media-button" type="button" onClick={onClick}>
            { isPlaying ? <Pause /> : <Play /> }
        </button>
    );
}

export default PausePlayButton;