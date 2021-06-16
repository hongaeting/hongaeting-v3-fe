import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useVideoChat from '../hooks/useVideoChat';

type VideoChatParams = { roomid: string };

export default function VideoChatContainer() {
  const params: VideoChatParams = useParams();
  const [videoChat, messages] = useVideoChat({
    roomid: params.roomid as unknown as number,
    userid: '10',
  });
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    setUser(videoChat.id);
  }, [videoChat.id]);

  return (
    <div>
      <div>dk</div>
      <div>user : {user}</div>
      <div>roomid : {params.roomid}</div>
      {messages.map((msg, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>{msg} </div>
      ))}
    </div>
  );
}
