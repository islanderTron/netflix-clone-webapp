import React from 'react';
import { useEffect } from 'react';

function Timer(props) {
  
  // console.log('test', props.media)
  // const media = mediaRef.current;
  // let minutes = Math.floor(media.currentTime/60);
  // let seconds = Math.floor(media.currentTime - minutes * 60);

  // let durationMinutes = Math.floor(media.duration/60
  // let durationSeconds = Math.round(media.duration - durationMinutes * 60)

  // // Timer
  // let mediatime = `${minutes }:${seconds < 10 ? '0' + seconds : seconds } / ${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
  // timerRef.current.textContent = mediatime;
  
  // // Time bar
  // let barLength = timerWrapperRef.current.clientWidth * (media.currentTime/media.duration);

  // console.log(timerWrapperRef.current.clientWidth)
  // timerBarRef.current.style.width = `${barLength}px`;


  useEffect(() => {
    
  })
  return <p>time</p>
}

export default Timer;