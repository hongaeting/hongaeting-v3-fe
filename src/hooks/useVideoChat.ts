/* eslint-disable no-console */
import Peer from 'peerjs';
import { useEffect, useState } from 'react';
import useSocket from './useSocket';

type VideoChatConnectionInfo = {
  roomid: number;
};

type EventPayload = {
  msg: string;
};

const useVideoChat = ({
  roomid,
}: VideoChatConnectionInfo): [MediaStream | null, string[], string] => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [socket] = useSocket(
    process.env.REACT_APP_VIDEO_CHAT_SOCKET_NAMESPACE as string,
    [
      // 내가 추가할 socket 이벤트들을 선언해주어야 함.
      [
        'member-change',
        (payload: EventPayload) => {
          // messages가 초기화됨 계속..
          setMessages([...messages, payload.msg]);
        },
      ],
    ]
  );
  const [user, setUser] = useState<string>('');
  const [myStream, setMyStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const connectMyStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
    };

    if (!peer) {
      setPeer(
        new Peer(undefined, {
          host: process.env.REACT_APP_PEER_SERVER_HOST,
          port: parseInt(process.env.REACT_APP_PEER_SERVER_PORT || '', 10),
        })
      );
    } else {
      connectMyStream();
      peer.on('open', (id: string) => {
        socket.emit('join-room', { roomid, userid: id });
        setUser(id);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peer]);

  return [myStream, messages, user];
};

export default useVideoChat;
