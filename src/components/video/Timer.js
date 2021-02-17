import React from 'react';
import { useEffect, useState } from 'react';

function Timer(props) {

  let timerWrapperRef = React.createRef();
  let timerRef = React.createRef();
  let timerBarRef = React.createRef();
  
  const [mediaCurrent, setMediaCurrent] = useState(0);
  const [timerBar, setTimerBar] = useState();

  /**
   * Lifecycle Method
   */

  useEffect(() => {
    if(props.media) {

      // console.log(props.media.currentTime)
      props.media.ontimeupdate = (event) => {
        updateTime(event.srcElement)
      }

      // onloadstart
      // ondurationchange
      // loadedmetadata
      // loadedmetadataprogress
      // canplay
      // canplaythrough

      setTimerBar(timerWrapperRef.current);
    }
  }, [props.media, ontimeupdate, timerWrapperRef]);

  useEffect(() => {

    // https://github.com/iandevlin/iandevlin.github.io/blob/master/mdn/video-player-styled/js/video-player.js
    // React to the user clicking within the progress barReact to the user clicking within the progress bar
    timerWrapperRef.current.addEventListener("click", (e) => {
      let timerBar = timerBarRef.current;
      if(timerBar) {
        let pos = (e.pageX - (timerBar.offsetLeft + timerBar.offsetParent.offsetLeft));

        console.log(pos);
        // if(props.media.currentTime) {
        //   props.media.currentTime = pos * props.media.duration;
        // }
      }
    })
  }, [timerWrapperRef, timerBarRef])

  /**
   * Event Handlers
   */

  function updateTime(media) {
    setMediaCurrent(media.currentTime);
  }
  
  /**
   * Renders
   */

  function renderTimer() {
    return ((props.duration - mediaCurrent)/60).toFixed(2).replace('.', ':');
  }

  function renderTimerBar() {
    if(timerBar) {
      let barLength = mediaCurrent/props.duration * 100;
      return barLength + '%';
    }
  }
  
  return (
    <div className="top-controller">
      <div className='timerWrapper'>
        <div 
          className="timer"
          ref={timerWrapperRef} 
        >
          <div 
            className='timerBar' 
            ref={timerBarRef}
            style={{ width: renderTimerBar() }}
            ></div>

            <div className="button" style={{left: renderTimerBar() }} ></div>
        </div>
      </div>
      <div className='time-reminder'>
          <p 
            ref={timerRef} aria-label='timer'>{renderTimer()}</p>
        </div>
    </div>
  )
}

export default Timer;