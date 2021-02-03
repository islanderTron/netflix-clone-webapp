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
      props.media.ontimeupdate = (event) => {
        updateTime(event.srcElement)
      }

      setTimerBar(timerWrapperRef.current);
    }
  }, [props.media, ontimeupdate, timerWrapperRef]);

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
      let barLength = mediaCurrent/props.duration * 100
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

            <div className="button" style={{left: renderTimerBar() }}></div>
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