import React from 'react';

import './css/App.css';

import Navigation from './components/nav/navigation';
import Video from './components/video/video';

function App() {
  return (
    <div className="App">
      {/* <Navigation /> */}
      <Video 
        videoPath="/videos/demo.mp4"
      />
    </div>
  );
}

export default App;
