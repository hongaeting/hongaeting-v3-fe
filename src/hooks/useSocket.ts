import { useMemo, useEffect } from 'react';
import io from 'socket.io-client';

const EVENT_NAME = {
  ERROR: 'error',
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  DISCONNECT: 'disconnect',
} as const;

type EnumEventName = typeof EVENT_NAME[keyof typeof EVENT_NAME];

type SocketEventListener = [
  eventName: EnumEventName | string,
  // eslint-disable-next-line
  eventListener: any
];

// eslint-disable-next-line
const useSocket = (listeners?: SocketEventListener[]): any => {
  const socket = useMemo(
    () =>
      io.connect(process.env.REACT_APP_SOCKET_URL as string, {
        transports: ['websocket'],
      }),
    []
  );

  useEffect(() => {
    listeners?.forEach(([event, listener]) => {
      socket.on(event, listener);
    });
    // eslint-disable-next-line
  }, []);

  return [socket];
};

export default useSocket;
