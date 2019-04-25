import React from 'react';
import './playlist.css';

function TodoItem({
  description,
  sessionsCompleted,
  isCompleted,
  startSession,
  toggleIsCompleted,
  isPlaying,
}) {
  return (
    <div className="card todo-item-container">
      <div className="todo-item-container-left">
        <button onClick={toggleIsCompleted} type="button" className="todo-item-complete-button">
{          isPlaying?
             <div className="buttonplay"/>
             : <div className="buttonpause"/>
          }
        </button>
        
          <div className="todo-item-description"> The song will go here. It's off centered...</div>
        
      </div>
    </div>
  );
}

export default TodoItem;
