import React from 'react'

function Play(props) {

  /**
   * Event Handlers
   */
  function playPauseHandler() {
    const media = props.media;
    const play = props.play.current;

    if (media.paused) {
      play.setAttribute('data-icon', 'u');
      media.play();
    } else {
      play.setAttribute('data-icon', 'P');
      media.pause();
    }
  }

  /**
   * Renders
   */

  return (
    <button
      ref={props.play}
      onClick={() => playPauseHandler()}
      className='play'
      data-icon='P'
      aria-label='play pause toggle'></button>
  )
}

export default Play;