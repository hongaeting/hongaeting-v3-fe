import React from 'react';
import { Redirect } from 'react-router-dom';
import { uuidV4 } from '../utils';

export default function CreateRoom() {
  const newRoomUrl = `/video-chats/${uuidV4()}`;
  return <Redirect to={newRoomUrl} />;
}
