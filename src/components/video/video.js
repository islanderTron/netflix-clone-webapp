import React, { useEffect, useState } from 'react';
import './css/video.scss'

import Timer from './Timer'

function Video(props) {

  const [media, setMedia] = useState(null);

  let mediaRef = React.createRef();
  let controlsRef = React.createRef();

  let playRef = React.createRef();
  let stopRef = React.createRef();
  let rwdRef = React.createRef();
  let fwdRef = React.createRef();

  let timerWrapperRef = React.createRef();
  let timerRef = React.createRef();
  let timerBarRef = React.createRef();

  // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

  useEffect(() => {
    mediaRef.current.removeAttribute('controls');
    controlsRef.current.style.visibility = 'visible'
  }, [])

  useEffect(() => {
    setMedia(mediaRef.current)
  }, [mediaRef])
  /**
   * HANDLER EVENTS
   */

  function playPauseMedia() {
    // const media = mediaRef.current;
    const play = playRef.current;    
    if(media.paused) {
      play.setAttribute('data-icon', 'u');
      media.play()
    } else {
      play.setAttribute('data-icon', 'P');
      media.pause()
    }
  }

  function stopMedia() {
    const media = mediaRef.current;
    const play = playRef.current;
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon', 'P'); 
  }

  function mediaBackward() {
    return media ? media.currentTime -= 3 : '';
  }

  function mediaForward() {
    return media ? media.currentTime += 3 : '';
  }

  /**
   * RENDERS
   */

  return (
    <div>
      <video ref={mediaRef}>
        <source
          src={props.videoPath}
          type={`video/mp4`}
        />
      </video>
      

      <div ref={controlsRef} className="video-controls">
        <div className="top-controller">
          {/* Timer */}
          <div
            className='timers'>
              <Timer
                media={media}
                timerBar={timerBarRef}
                timer={timerRef}  
                timerWrapper={timerWrapperRef}
              />
            <div ref={timerWrapperRef} style={{width:"90%", backgroundColor: "black"}}>
              <div className='timerBar' ref={timerBarRef}></div>
            </div>
            <div>
              <span
                style={{width:"10%"}} ref={timerRef} aria-label='timer'></span>
            </div>
          </div>
        </div>

        <div className='bottom-controller'>
          <button
            ref={playRef}
            onClick={ () => playPauseMedia() }
            className='play'
            data-icon='P'
            aria-label='play pause toggle'></button>
          <button
            ref={stopRef}
            onClick={ () => stopMedia() }
            className='stop'
            data-icon='S'
            aria-label='stop'></button>

          <button
            ref={rwdRef}
            onClick={ () => mediaBackward() }
            className='rwd'
            data-icon='B' 
            aria-label='rewind' />
          <button
            ref={fwdRef}
            onClick={ () => mediaForward() }
            className='fwd'
            data-icon='F'
            aria-label='fast forward' />
        </div>
      </div>
    </div>
  )
}

export default Video;