import React, { useEffect } from 'react';
import './css/video.scss'

function Video(props) {

  let mediaRef = React.createRef();
  let controlsRef = React.createRef();

  let playRef = React.createRef();
  let stopRef = React.createRef();
  let rwdRef = React.createRef();
  let fwdRef = React.createRef();

  let timerWrapperRef = React.createRef();
  let timerRef = React.createRef();
  let timerBarRef = React.createRef();

  useEffect(() => {
    /**
     * Implements event listeners for those Refs 
     */
    mediaRef.current.removeAttribute('controls');
    controlsRef.current.style.visibility = 'visible'

    playRef.current.addEventListener('click', playPauseMedia);
    stopRef.current.addEventListener('click', stopMedia);
    mediaRef.current.addEventListener('ended', stopMedia);

    // Seeking back and forth
    rwdRef.current.addEventListener('click', mediaBackward);
    fwdRef.current.addEventListener('click', mediaForward);
    mediaRef.current.addEventListener('timeupdate', setTime);
  }, [])

  /**
   * HANDLER EVENTS
   */

  function playPauseMedia() {
    const media = mediaRef.current;
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
    const media = mediaRef.current;
    return media.currentTime -= 3;
  }

  function mediaForward() {
    const media = mediaRef.current;
    return media.currentTime += 3;
  }

  function setTime() {
    const media = mediaRef.current;
    let minutes = Math.floor(media.currentTime/60);
    let seconds = Math.floor(media.currentTime - minutes * 60);

    let minuteValue;
    let secondValue;

    if(minutes < 10) {
      minuteValue = '0' + minutes;
    } 

    if (seconds < 10) {
      secondValue = '0' + seconds;
    }

    else {
      secondValue = seconds;
    }

    // Timer
    let mediatime = `${minuteValue}:${secondValue}`;
    timerRef.current.textContent = mediatime;

    // Time bar
    let barLength = timerWrapperRef.current.clientWidth * (media.currentTime/media.duration);
    timerBarRef.current.style.width = `${barLength}px`;
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
        <button
          ref={playRef}
          className='play'
          data-icon='P'
          aria-label='play pause toggle'></button>
        <button
          ref={stopRef}
          className='stop'
          data-icon='S'
          aria-label='stop'></button>
        
        {/* Timer */}
        <div
          ref={timerWrapperRef}
          className='timers'>
          <div className='timerBar' ref={timerBarRef}></div>
          <span
            ref={timerRef} aria-label='timer'></span>
        </div>

        <button
          ref={rwdRef}
          className='rwd'
          data-icon='B' 
          aria-label='rewind' />
        <button
          ref={fwdRef}
          className='fwd'
          data-icon='F'
          aria-label='fast forward' />
      </div>
    </div>
  )
}

export default Video;