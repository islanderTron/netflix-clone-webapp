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


  // This useEffect() uses keyboard event to allow the user to press the space button to play/pause the video.
  useEffect(() => {
    mediaRef.current.addEventListener('keydown', event => {
      if(event.code === 'Space') { 
        setIsPlay(isPlay === false ? true :  false);
      }

      console.log(isPlay);
    });
  }, [isPlay])

  function mediaDuration(media) {
    setDuration(media.duration)
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
        >
          <source
            src={props.videoPath}
            type={`video/mp4`}
          />
        </video>
      </div>

      {/* Custom Control */}
      <div ref={controlsRef} className="video-controls">
        {/* <Timer
          media={media}
          duration={duration}
        /> */}

        <div className='bottom-controller row'>
            <div className="pl-5" width="200px">
              <Play 
                play={playRef}
                media={media}
                isPlay={isPlay}
              />
              <BackForward 
                media={media}
              />
              {/* <Volume 
                media={media}
              /> */}
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
  )
}

export default Video;