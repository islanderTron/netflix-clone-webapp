import React from 'react';

function Stop(props) {
  let stopRef = React.createRef();
  /** 
   * Event Handlers 
   */

  function stopMedia() {
    const media = props.media;
    const play = props.play.current;

    media.pause();
    media.currentTime = 0;
    return play.setAttribute('data-icon', 'P'); 
  }

  /**
   * Renders
   */
  return(
    <button
      ref={stopRef}
      onClick={ () => stopMedia() }
      className='stop'
      data-icon='S'
      aria-label='stop'></button>
  )
}

export default Stop;