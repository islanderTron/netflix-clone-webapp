import React, { useEffect } from 'react'

function Play(props) {
  const media = props.media;
  const play = props.play.current;

  useEffect(() => {
    keyboardEffect(props.isPlay);
  }, [props.isPlay])

  /**
   * Event Handlers
   */
  function playPauseHandler() {
    if (media.paused) {
      play.setAttribute('data-icon', 'u');
      media.play();
    } else {
      play.setAttribute('data-icon', 'P');
      media.pause();
    }
  }

  function keyboardEffect(isPlay) {
    if(isPlay === true) {
      play.setAttribute('data-icon', 'u');
      media.play();
    } 
    else if(isPlay === false) {
      if(play) {
        play.setAttribute('data-icon', 'P');
        media.pause();
      }
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