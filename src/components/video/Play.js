import React, { useEffect } from 'react'

// Redux
import { connect } from 'react-redux';

function Play({ play, media, onPlaying, offPlaying, isPlaying }) {

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
        aria-label='play pause toggle'>
        {!isPlaying &&
          <svg id="nfplayerPlay" viewBox="0 0 28 28">
            <polygon points="8 22 8 6 22.0043763 14"></polygon>
          </svg>
        }

        {isPlaying &&
          <svg id="nfplayerPause" viewBox="0 0 28 28">
            <rect x="9" y="6" width="4" height="16"></rect>
            <rect x="15" y="6" width="4" height="16"></rect>
          </svg>
        }
      </button>
  )
}

const mapStateToProps = state => {
  return {
    isPlaying: state.playing
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onPlaying: () => dispatch({ type: 'PLAYING' }),
    offPlaying: () => dispatch({ type: 'NOTPLAYING' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Play);;