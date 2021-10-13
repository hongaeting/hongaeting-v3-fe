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

type UserCallingData = {
  id: string;
  stream: MediaStream | null;
  readyToCall?: boolean;
};

const useVideoChat = ({
  roomid,
}: VideoChatConnectionInfo): [
  UserCallingData,
  UserCallingData,
  string[],
  boolean
] => {
  const myPeer = useMemo(
    () =>
      new Peer(undefined, {
        host: process.env.REACT_APP_PEER_SERVER_HOST,
        port: parseInt(process.env.REACT_APP_PEER_SERVER_PORT || '', 10),
        path: process.env.REACT_APP_PEER_SERVER_PATH,
      }),
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [myCallingData, setMyCallingData] = useState<UserCallingData>({
    id: '',
    stream: null,
    readyToCall: false,
  });
  const [mateCallingData, setMateCallingData] = useState<UserCallingData>({
    id: '',
    stream: null,
    readyToCall: false,
  });

  const [socket] = useSocket(
    process.env.REACT_APP_VIDEO_CHAT_SOCKET_NAMESPACE as string,
    [
      // 내가 추가할 socket 이벤트들을 선언해주어야 함.
      [
        'user:enter-room',
        (payload: EventPayload) => {
          // messages가 초기화됨 계속..
          setMessages([...messages, payload.msg]);
          // setCallMateId(payload.userId);
          setMateCallingData({ ...mateCallingData, id: payload.userId });
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
          // setOtherUserReadyToCall(payload.isCallReady);
          setMateCallingData({
            ...mateCallingData,
            readyToCall: payload.isCallReady,
          });
          if (myCallingData.stream !== null) {
            call();
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

    setMyCallingData({ ...myCallingData, stream, id: myPeer.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const call = useCallback(
    () => {
      if (myCallingData.stream === null) return;

      const peerConnection = myPeer.call(
        mateCallingData.id,
        myCallingData.stream
      );

      peerConnection.on('stream', (callMateStream: MediaStream) => {
        // setCallMateStream(callMateStream);
        setMateCallingData({ ...mateCallingData, stream: callMateStream });
        setIsLoading(false);
      });

      peerConnection.on('close', () => {
        socket.emit('leave-room');
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myCallingData.stream, mateCallingData.id]
  );

  useEffect(() => {
    connectMyStream();

    myPeer.on('open', (id: string) => {
      socket.emit('enter-room', { roomid, userid: myPeer.id });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (myCallingData.stream !== null) {
      if (mateCallingData.readyToCall) {
        call();
      } else {
        socket.emit('call-ready');

        myPeer.on('call', (callConnection) => {
          callConnection.answer(myCallingData.stream ?? undefined);

          callConnection.on('stream', (callMateStream: MediaStream) => {
            setMateCallingData({ ...mateCallingData, stream: callMateStream });
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCallingData.stream]);

  return [myCallingData, mateCallingData, messages, isLoading];
};

export default useVideoChat;
