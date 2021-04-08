import React from 'react';

import './css/App.css';

// Components
import Home from './components/Home';
import Navigation from './components/nav/navigation';
import Video from './components/video/Video';

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/netflix" exact>
          <Video videoPath='/videos/demo.mp4' />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;