import { useEffect, useState } from 'react';
import useSocket from './useSocket';

type VideoChatConnectionInfo = {
  roomid: number;
  userid: string;
};

type EventPayload = {
  msg: string;
};

const useVideoChat = ({
  roomid,
  userid,
}: VideoChatConnectionInfo): [SocketIOClient.Socket, string[]] => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket] = useSocket(
    process.env.REACT_APP_VIDEO_CHAT_SOCKET_NAMESPACE as string,
    [
      // 내가 추가할 socket 이벤트들을 선언해주어야 함.
      [
        'member-change',
        (payload: EventPayload) => {
          setMessages([...messages, payload.msg]);
        },
      ],
    ]
  );

  const joinRoom = () => {
    console.log(roomid, userid);
    socket.emit('join-room', { roomid, userid });
  };

  const leaveRoom = () => {
    socket.emit('user-left', { roomid, userid });
  };

  useEffect(() => {
    console.log('join');
    joinRoom();

    return leaveRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [socket, messages];
};

export default useVideoChat;
