import React from 'react';
import { Button, PlayerIcon } from 'react-player-controls';
import { ReactComponent as Next } from '../icons/next.svg';


function NextButton({ onClick }) {
    return (
        <button className="media-button" type="button" onClick={onClick}>
           <Next />
        </button>
    );
}
export default NextButton;