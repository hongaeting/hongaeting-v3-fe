import React from 'react';
import { useParams } from 'react-router-dom';
import RTCVideo from '../component/RTCVideo';
import useVideoChat from '../hooks/useVideoChat';

type VideoChatParams = { roomid: string };

export default function VideoChatContainer() {
  const params: VideoChatParams = useParams();
  const [myStream, otherStream, messages, user, otherUser] = useVideoChat({
    roomid: params.roomid as unknown as number,
  });

  return (
    <div>
      <div>user : {user}</div>
      <div>roomid : {params.roomid}</div>
      <div>myStream: {myStream?.id}</div>
      <div>otherStream: {otherStream?.id}</div>
      <div>상대방 id: {otherUser}</div>
      {messages.map((msg, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>{msg} </div>
      ))}
      <RTCVideo mediaStream={myStream} />
      <RTCVideo mediaStream={otherStream} />
    </div>
  );
}
