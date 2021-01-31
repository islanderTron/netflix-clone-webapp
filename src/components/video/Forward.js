import React from 'react';

function Forward(props) {
  let fwdRef = React.createRef();
  const media = props.media;
  /**
   * Event Handlers
   */
  function mediaForward() {
    return media ? media.currentTime += 3 : '';
  }
  /**
   * Renders 
   */

  return (
      <button
        ref={fwdRef}
        onClick={() => mediaForward()}
        className='fwd'
        aria-label='fast forward'
        style={{ transform: "inherit" }}>
        <svg id="nfplayerFastForward" viewBox="0 0 28 28">
          <g stroke="none" strokeWidth="1" fill="none">
            <g transform="translate(14.000000, 13.000000) scale(-1, 1) translate(-14.000000, -13.000000) translate(4.000000, 1.000000)">
              <path d="M17.9992616,7.99804242 C19.2555293,9.66969874 20,11.7479091 20,14 C20,19.5228475 15.5228475,24 10,24 C4.4771525,24 0,19.5228475 0,14 C0,8.4771525 4.4771525,4 10,4 L12,4" stroke="white" strokeWidth="2" transform="translate(10.000000, 14.000000) scale(-1, 1) translate(-10.000000, -14.000000) "></path>
              <polyline stroke="white" strokeWidth="2" points="11.5 0.5 8 3.92749023 11.5 7.5"></polyline>
              <polyline stroke="white" strokeWidth="2" points="7 0.5 3.5 4 7 7.5"></polyline>
            </g>
            <text fontSize="10" fontWeight="400" letterSpacing="-0.3" fill="white">
              <tspan x="7" y="19">10</tspan>
            </text>
          </g>
        </svg>
      </button>
  )
}

export default Forward;