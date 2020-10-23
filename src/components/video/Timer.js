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
      let barLength = timerBar.clientWidth * (props.media.currentTime/props.media.duration);

      return barLength + 'px';
    }
  }
  
  return (
    <div className="top-controller" style={{ height: '30px'}}>
      <div className='timers'>
        <div 
          ref={timerWrapperRef} 
          style={{ width:"90%", backgroundColor: "black", float: 'left' }}
        >
          <div 
            className='timerBar' 
            ref={timerBarRef}
            style={{ width: renderTimerBar(), height: '38px', backgroundColor: 'gray' }}
            >
            </div>
        </div>
        <div style={{ width:"10%", float: 'left', backgroundColor: "black" }}>
          <span 
            ref={timerRef} aria-label='timer'>{renderTimer()}</span>
        </div>
      </div>
    </div>
  )
}

export default Timer;