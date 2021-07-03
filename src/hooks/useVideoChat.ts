import Peer from 'peerjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSocket from './useSocket';

type VideoChatConnectionInfo = {
  roomid: number;
};

type EventPayload = {
  msg: string;
  userId: string;
};

type CallReadyEventPayload = {
  isCallReady: boolean;
};

// type CallMate = {
//   id: string;
//   stream: MediaStream | null;
// };

const useVideoChat = ({
  roomid,
}: VideoChatConnectionInfo): [
  MediaStream | null,
  MediaStream | null,
  string[],
  string,
  string,
  boolean
] => {
  const myPeer = useMemo(
    () =>
      new Peer(undefined, {
        host: '/',
        port: parseInt(process.env.REACT_APP_PEER_SERVER_PORT || '', 10),
      }),
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [callMateId, setCallMateId] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [callMateStream, setCallMateStream] =
    useState<MediaStream | null>(null);
  const [otherUserReadyToCall, setOtherUserReadyToCall] =
    useState<boolean>(false);

  // const [callMate, setCallMate] = useState<CallMate>({ id: '', stream: null });

  const [socket] = useSocket(
    process.env.REACT_APP_VIDEO_CHAT_SOCKET_NAMESPACE as string,
    [
      // 내가 추가할 socket 이벤트들을 선언해주어야 함.
      [
        'user:enter-room',
        (payload: EventPayload) => {
          // messages가 초기화됨 계속..
          setMessages([...messages, payload.msg]);
          setCallMateId(payload.userId);
        },
      ],
      [
        'user:leave-room',
        (payload: EventPayload) => {
          // messages가 초기화됨 계속..
          setMessages([...messages, payload.msg]);
        },
      ],
      [
        'user:call-ready',
        (payload: CallReadyEventPayload) => {
          setOtherUserReadyToCall(payload.isCallReady);
          if (myStream !== null) {
            call(callMateId);
          }
        },
      ],
    ]
  );

  const connectMyStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setMyStream(stream);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const call = useCallback(
    (otherUser: string) => {
      if (myStream === null) return;

      const peerConnection = myPeer.call(otherUser, myStream);

      peerConnection.on('stream', (otherUserStream: MediaStream) => {
        setCallMateStream(otherUserStream);
        setIsLoading(false);
      });

      peerConnection.on('close', () => {
        socket.emit('leave-room');
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myStream]
  );

  useEffect(() => {
    connectMyStream();

    myPeer.on('open', (id: string) => {
      socket.emit('enter-room', { roomid, userid: id });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (myStream !== null) {
      if (otherUserReadyToCall) {
        call(callMateId);
      } else {
        socket.emit('call-ready');

        myPeer.on('call', (callConnection) => {
          callConnection.answer(myStream);

          callConnection.on('stream', (stream: MediaStream) => {
            setCallMateStream(stream);
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myStream]);

  return [myStream, callMateStream, messages, myPeer.id, callMateId, isLoading];
};

export default useVideoChat;
