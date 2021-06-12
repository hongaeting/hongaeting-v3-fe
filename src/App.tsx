import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { ChatContainer, VideoChatContainer } from './containers';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ChatContainer}/>
        <Route path="/video-chat" component={VideoChatContainer}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
