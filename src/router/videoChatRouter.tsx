import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { VideoChatContainer } from "../containers";
import CreateRoom from '../containers/VideoChatCreateRoom';

export default function VideoChatRouter () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/video-chats" component={CreateRoom} />
                <Route path="/video-chats/:roomid" component={VideoChatContainer}/>
            </Switch>
        </BrowserRouter>
    )
}