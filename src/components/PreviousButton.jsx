import React from 'react';
import { Button, PlayerIcon } from 'react-player-controls';
import { ReactComponent as Previous } from '../icons/previous.svg';

function PreviousButton({ onClick }) {
    return (
        <button className="media-button" type="button" onClick={onClick}>
            <Previous />
        </button>
    );
}
export default PreviousButton;