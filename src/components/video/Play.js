import React from 'react'

// Redux
import { connect } from 'react-redux';

function Play({ play, media, onPlaying, offPlaying }) {
  
  function playPauseHandler() {
    return media.paused ? onPlaying() : offPlaying();
  }

  /**
   * Renders
   */

  return (
    <button
      ref={play}
      onClick={() => playPauseHandler()}
      className='play'
      data-icon='P'
      aria-label='play pause toggle'></button>
  )
}

const mapStateToProps = state => {
  return { 
    test: state.playing
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onPlaying: () => dispatch({ type: 'PLAYING'}),
    offPlaying: () => dispatch({ type: 'NOTPLAYING'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Play);;