import React, { useEffect, useState, useRef } from 'react';
import './css/video.scss'

// Components
import Timer from './Timer';
import Play from './Play';
import Stop from './Stop'
import BackForward from './BackForward';

// Redux
import { connect, useSelector } from 'react-redux';

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
    if(mediaRef) {
      if(isPlaying === true) {
        playRef.current.setAttribute('data-icon', 'u');
        mediaRef.current.play();
      } else {
        playRef.current.setAttribute('data-icon', 'P');
        mediaRef.current.pause(); 
      }
    }
  }

  function playPauseHandler(e) {
    if(e.keyCode === 32) {
      return mediaRef.current.paused ? onPlaying() : offPlaying();
    }
  }


  /**
   * RENDERS
   */

  return (
    <div>
      <div>
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
      </div>

      {/* Custom Control */}
      {/* <div ref={controlsRef} className="video-controls"> */}
      <div ref={controlsRef}>
        {/* <Timer
          media={media}
          duration={duration}
        /> */}

        {/* <div className='bottom-controller row'> */}
        <div>
            {/* <div className="pl-5" width="200px"> */}
            <div >
              <Play 
                play={playRef}
                media={media}
              />
              <BackForward 
                media={media}
              />
              {/* <Volume 
                media={media}
              /> */}
            </div>
            {/* <div className="col-8"> */}
            <div>
              {/* <p className="text-left mb-0">Movie/TV Show name</p> */}
              <p>Movie/TV Show name</p>
            </div>  
            {/* <div className="col-2"> */}
            <div>
              {/* <p className="float-right">video menu</p> */}
              <p>video menu</p>
            </div>
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
    onPlaying: () => dispatch({ type: 'PLAYING'}),
    offPlaying: () => dispatch({ type: 'NOTPLAYING'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);