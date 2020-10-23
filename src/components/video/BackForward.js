import React from 'react';

function BackForward(props) {
  let rwdRef = React.createRef();
  let fwdRef = React.createRef();
  const media = props.media;
  /**
   * Event Handlers
   */
  
  function mediaBackward() {
    return media ? media.currentTime -= 3 : '';
  }

  function mediaForward() {
    return media ? media.currentTime += 3 : '';
  }
  /**
   * Renders 
   */

  return(
    <>
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
    </>
  )
}

export default BackForward;