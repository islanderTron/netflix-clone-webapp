import React, { useEffect, useState, useRef } from 'react';
import './css/video.scss'

// Components
import Timer from './Timer';
import Play from './Play';
import Stop from './Stop'
import Back from './Backward';
import Forward from './Forward';

// Redux
import { connect, useSelector } from 'react-redux';
import Backward from './Backward';

function Video({ videoPath, onPlaying, offPlaying }) {

  const [media, setMedia] = useState(null);
  const [duration, setDuration] = useState()

  const isPlaying = useSelector(state => state.playing);

  let mediaRef = useRef();
  let controlsRef = useRef();
  let playRef = useRef();

  /**
   * Lifecycle 
   */

  useEffect(() => {
    controlsRef.current.style.visibility = 'visible';
    mediaRef.current.disablePictureInPicture = true;

    // Focus on the video when a user's browser is opened 
    mediaRef.current.focus()

    setMedia(mediaRef.current);

    mediaRef.current.ondurationchange = (event) => {
      mediaDuration(event.srcElement)
    }

    setDuration(mediaRef)

  }, [mediaRef.current]);

  useEffect(() => {
    // Browser compatability - Safari and Chrome 
    window.addEventListener('keydown', (e) => {
      playPauseHandler(e);
    }, true)
  }, [window])

  useEffect(() => {
    playHandler();
  }, [isPlaying])

  /** 
   * Event Handler
   */


  function mediaDuration(media) {
    setDuration(media.duration)
  }

  function playHandler() {
    if (mediaRef) {
      if (isPlaying === true) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }

  function playPauseHandler(e) {
    if (e.keyCode === 32) {
      return mediaRef.current.paused ? onPlaying() : offPlaying();
    }
  }


  /**
   * RENDERS
   */

  return (
    <div className='videoWrapper'>
      <video
        ref={mediaRef}
        controls={false}
      // onKeyDown={(e) => playPauseHandler(e)}
      >
        <source
          src={videoPath}
          type={`video/mp4`}
        />
      </video>

      {/* Custom Control */}
      <div ref={controlsRef} className="video-controls">
        <Timer
          media={media}
          duration={duration}
        />

        <div className='bottom-controller'>
          <Play
            play={playRef}
            media={media}
          />
          <Backward
            media={media}
          />

          <Forward 
            media={media}
          />
          <button
            aria-label='volume toggle'>
            <svg id="volumeMax" viewBox="0 0 28 28">
              <path d="M13,22 L7,18 L3,18 L3,10 L7,10 L13,6 L13,22 Z M16.7437869,18.3889482 L15.3295734,16.9747347 C16.9546583,15.3496497 16.9546583,12.7148664 15.3295734,11.0897815 L16.7437869,9.6755679 C19.1499205,12.0817014 19.1499205,15.9828147 16.7437869,18.3889482 Z M19.2137399,20.2137399 L17.7995264,18.7995264 C20.4324159,16.1666368 20.4324159,11.8978793 17.7995264,9.26498977 L19.2137399,7.8507762 C22.6276781,11.2647144 22.6276781,16.7998018 19.2137399,20.2137399 Z M21.6836929,22.0385316 L20.2694793,20.6243181 C23.9101736,16.9836239 23.9101736,11.0808923 20.2694793,7.44019807 L21.6836929,6.02598451 C26.1054357,10.4477273 26.1054357,17.6167888 21.6836929,22.0385316 Z"></path>
              </svg>
          </button>
          
          {/* <Volume 
                media={media}
              /> */}
          
          <div className="videoName">
            <h4>Tilte</h4> <span>S1: E1</span> <span>Episode name</span>
          </div>
          
          <button aria-label='report issue'>
            <svg id="nfplayerReportAProblem" viewBox="0 0 28 28">
              <g transform="translate(3, 3)">
                <g strokeWidth="2" fill="transparent">
                  <circle cx="11" cy="11" r="10"></circle>
                </g>
                <text fontSize="14" fontWeight="bold">
                  <tspan x="7" y="16">?</tspan>
                </text>
              </g>
            </svg>
          </button>
          
          <button aria-label='next episdoe'>
            <svg id="nfplayerNextEpisode" viewBox="0 0 28 28">
              <g transform="translate(6, 6)">
                <path d="M0,16 L0,0 L14,8 L0,16 Z M14,16 L14,0 L16,0 L16,16 L14,16 Z"></path>
              </g>
            </svg>
          </button>

          <button aria-label='next episodes'>
            <svg id="nfplayerEpisodes" viewBox="0 0 28 28">
              <path d="M27,7.25 L27,14 L24.7142857,14 L24.7142857,7.25 L11,7.25 L11,5 L27,5 L27,7.25 Z M23,11.2222222 L23,19 L20.7333333,19 L20.7333333,11.2222222 L6,11.2222222 L6,9 L23,9 L23,11.2222222 Z M1,13 L19,13 L19,24 L1,24 L1,13 Z"></path>
            </svg>
          </button>
          
          <button aria-label='subtiltes'>
            <svg id="nfplayerSubtitles" viewBox="0 0 28 28">
              <g transform="translate(1, 6)">
                <path d="M24,14 L24,19 L19,14 L0,14 L0,0 L26,0 L26,14 L24,14 Z M2,6 L2,8 L7,8 L7,6 L2,6 Z M9,6 L9,8 L17,8 L17,6 L9,6 Z M19,6 L19,8 L24,8 L24,6 L19,6 Z M2,10 L2,12 L10,12 L10,10 L2,10 Z M12,10 L12,12 L17,12 L17,10 L12,10 Z"></path>
              </g>
            </svg>
          </button>

          <button aria-label='speed controls'>
            <svg id="nfplayerSpeed" viewBox="0 0 35 35">
              <path d="M19.8023846,13.7111538 L22.0437692,15.0580769 L19.2865317,19.6534728 C19.4959852,20.029472 19.6153846,20.4622373 19.6153846,20.9224231 C19.6153846,22.3648077 18.4423846,23.5378077 17,23.5378077 C15.5576154,23.5378077 14.3846154,22.3648077 14.3846154,20.9224231 C14.3846154,19.4800385 15.5576154,18.3070385 17,18.3070385 C17.0149054,18.3070385 17.0297821,18.3071637 17.044629,18.3074133 L19.8023846,13.7111538 Z M28.7025597,25.4286405 C27.4615385,24.8461538 27.4615385,24.8461538 26.3609633,24.2636672 C27.0809129,22.8165686 27.4611462,21.2406017 27.4611462,19.6153846 C27.4611462,13.8370647 22.7779276,9.15384615 16.9996077,9.15384615 C11.2221213,9.15384615 6.53806923,13.8375388 6.53806923,19.6153846 C6.53806923,21.2391793 6.91888033,22.8151015 7.63955975,24.2636672 C6.53846154,24.8461538 6.53846154,24.8461538 5.29796333,25.4286405 C4.39964336,23.6230174 3.92268462,21.6492043 3.92268462,19.6153846 C3.92268462,12.3930568 9.77772922,6.53846154 16.9996077,6.53846154 C24.2223647,6.53846154 30.0765308,12.3926276 30.0765308,19.6153846 C30.0765308,21.6502951 29.600283,23.6242168 28.7025597,25.4286405 Z"></path>
            </svg>
          </button>

          <button aria-label='full screen'>
            <svg id="nfplayerFullscreen" viewBox="0 0 28 28">
              <g transform="translate(2, 6)">
                <polygon points="8 0 6 0 5.04614258 0 0 0 0 5 2 5 2 2 8 2"></polygon>
                <polygon transform="translate(4, 13.5) scale(1, -1) translate(-4, -13.5) " points="8 11 6 11 5.04614258 11 0 11 0 16 2 16 2 13 8 13"></polygon>
                <polygon transform="translate(20, 2.5) scale(-1, 1) translate(-20, -2.5) " points="24 0 22 0 21.0461426 0 16 0 16 5 18 5 18 2 24 2"></polygon>
                <polygon transform="translate(20, 13.5) scale(-1, -1) translate(-20, -13.5) " points="24 11 22 11 21.0461426 11 16 11 16 16 18 16 18 13 24 13"></polygon>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    test: state.playing
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onPlaying: () => dispatch({ type: 'PLAYING' }),
    offPlaying: () => dispatch({ type: 'NOTPLAYING' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);