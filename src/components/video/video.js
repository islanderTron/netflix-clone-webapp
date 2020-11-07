import React, { useEffect, useState, useRef } from 'react';
import './css/video.scss'

// Components
import Timer from './Timer';
import Play from './Play';
import Stop from './Stop'
import BackForward from './BackForward';

function Video(props) {

  const [media, setMedia] = useState(null);
  const [duration, setDuration] = useState()
  const [isPlay, setIsPlay] = useState(false);

  let mediaRef = useRef();
  let controlsRef = useRef();
  let playRef = useRef();

  useEffect(() => {
    // mediaRef.current.removeAttribute('controls');
    mediaRef.current.addEventListener('keydown', event => {
      console.log(event)
      // CONTINUE TO WORK ON KEYBOARD ISSUE FOR BROSWER COMPATIABILITY (CHROME & SAFARI)
      
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
      
      // console.log(event)
      // if(event.keyCode === 32) {
      //   mediaRef.current.play()
      // }
    }); 
    controlsRef.current.style.visibility = 'visible';
    mediaRef.current.disablePictureInPicture = true;

    // Focus on the video when a user's browser is opened 
    mediaRef.current.focus()

    setMedia(mediaRef.current);

    mediaRef.current.ondurationchange = (event) => {
      mediaDuration(event.srcElement)
    }
    // setDuration(mediaRef)
  }, [mediaRef.current]);

  function mediaDuration(media) {
    setDuration(media.duration)
  }

  function keyboardEvents(event) {
    console.log(event)
    
    // if(event.type === 'click') {
    //   setIsPlay(isPlay === false ? true :  false);
    // } 
    // else if(event.charCode === 32) {
    //   setIsPlay(isPlay === false ? true :  false);
    // }
  }

  /**
   * RENDERS
   */

  return (
    <div>
      <div 
        // onKeyUp={keyboardEvents}
        // onClick={(e) => keyboardEvents(e)} 
        // onKeyDown={(e) => keyboardEvents(e)}
        onKeyPress={(e) => keyboardEvents(e)}
        onChange={(e) => keyboardEvents(e)}
        >
        <video 
          ref={mediaRef}
          // controls={false}
        >
          <source
            src={props.videoPath}
            type={`video/mp4`}
          />
        </video>
      </div>

      {/* Custom Control */}
      <div ref={controlsRef} className="video-controls">
        <Timer
          media={media}
          duration={duration}
        />

        <div className='bottom-controller container mw-100'>
          <div className='row'>
            <div className="col-2 p-0 float-left left-controllers">
              <Play 
                play={playRef}
                media={media}
                isPlay={isPlay}
              />
              <BackForward 
                media={media}
              />
              {/* Volume - will work */}
              {/* <Volume /> */}
            </div>
            <div className="col-8">
              <p className="text-left mb-0">Movie/TV Show name</p>
            </div>
            
            <div className="col-2">
              <p className="float-right">video menu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video;