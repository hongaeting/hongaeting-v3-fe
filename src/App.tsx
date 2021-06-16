import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { ChatContainer, VideoChatContainer } from './containers';
import VideoChatRouter from './router/videoChatRouter';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ChatContainer} />
        <VideoChatRouter />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
