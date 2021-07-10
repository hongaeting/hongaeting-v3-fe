import React from 'react';
import { useParams } from 'react-router-dom';
import RTCVideo from '../component/RTCVideo';
import useVideoChat from '../hooks/useVideoChat';

type VideoChatParams = { roomid: string };

export default function VideoChatContainer() {
  const params: VideoChatParams = useParams();
  const [myCallingData, mateCallingData, messages, isLoading] = useVideoChat({
    roomid: params.roomid as unknown as number,
  });

  return (
    <div>
      <div>user : {myCallingData.id}</div>
      <div>roomid : {params.roomid}</div>
      <div>myStream: {myCallingData.stream?.id}</div>
      <div>otherStream: {mateCallingData.stream?.id}</div>
      <div>상대방 id: {mateCallingData.id}</div>
      {messages.map((msg, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>{msg} </div>
      ))}
      <RTCVideo mediaStream={myCallingData.stream} />
      <RTCVideo mediaStream={mateCallingData.stream} />
    </div>
  );
}
