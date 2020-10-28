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
    controlsRef.current.style.visibility = 'visible';
    mediaRef.current.disablePictureInPicture = true;

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
    if(event.type === 'click') {
      setIsPlay(isPlay === false ? true :  false);
    } 
    else if(event.charCode === 32) {
      setIsPlay(isPlay === false ? true :  false);
    }
  }

  /**
   * RENDERS
   */

  return (
    <div>
      <div 
        onKeyPress={(e) => keyboardEvents(e)}
        onClick={(e) => keyboardEvents(e)} >
        <video 
          ref={mediaRef}
          controls={false}
        >
          <source
            src={props.videoPath}
            type={`video/mp4`}
          />
        </video>
      </div>

      <div ref={controlsRef} className="video-controls">
        <Timer
          media={media}
          duration={duration}
        />

        <div className='bottom-controller'>
          <Play 
            play={playRef}
            media={media}
            isPlay={isPlay}
          />
          <Stop 
            media={media}
            play={playRef}
          />
          <BackForward 
            media={media}
          />
        </div>
      </div>
    </div>
  )
}

export default Video;