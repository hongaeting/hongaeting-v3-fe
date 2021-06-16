import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import useSocket from './useSocket';
import { uuidV4 } from '../utils';

const CLIENT_EVENT = {
  JOINED_ROOM: 'joinedRoom',
  LEFT_ROOM: 'leftRoom',
  MSG_TO_CLIENT: 'msgToClient',
} as const;
const SERVER_EVENT = {
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
  MSG_TO_SERVER: 'msgToServer',
} as const;

type Info = {
  room: string;
  user: string;
};
type Message = {
  uuid: string;
  room: string;
  user: string;
  text: string;
};
type FuncSendMessage = (message: string) => void;
type FuncChangeInfo = (info: Info) => void;

const useChat = (
  defaultInfo: Info
): [Message[], FuncSendMessage, FuncChangeInfo] => {
  const admin = useMemo(() => 'admin', []);
  const [info, setInfo] = useState<Info>(defaultInfo);
  const [messages, setMessages] = useState<Message[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeInfo = useCallback(debounce(setInfo, 500), []);

  const [socket] = useSocket(
    process.env.REACT_APP_CHAT_SOCKET_NAMESPACE as string,
    [
      [
        CLIENT_EVENT.JOINED_ROOM,
        (joinedRoom: string) =>
          setMessages((_messages) => [
            ..._messages,
            {
              uuid: uuidV4(),
              room: joinedRoom,
              user: admin,
              text: `${joinedRoom} 방에 입장했습니다.`,
            },
          ]),
      ],
      [
        CLIENT_EVENT.LEFT_ROOM,
        (leftRoom: string) =>
          setMessages((_messages) => [
            ..._messages,
            {
              uuid: uuidV4(),
              room: leftRoom,
              user: admin,
              text: `${leftRoom} 방을 퇴장했습니다.`,
            },
          ]),
      ],
      [
        CLIENT_EVENT.MSG_TO_CLIENT,
        (message: Message) =>
          setMessages((_messages) => [..._messages, message]),
      ],
    ]
  );

  const joinRoom = useCallback(
    ({ room, user }: Info) =>
      socket.emit(SERVER_EVENT.JOIN_ROOM, {
        uuid: uuidV4(),
        user: admin,
        room,
        text: `${user}이(가) 입장했습니다.`,
      }),
    [socket, admin]
  );

  const leaveRoom = useCallback(
    ({ room, user }: Info) =>
      socket.emit(SERVER_EVENT.LEAVE_ROOM, {
        uuid: uuidV4(),
        user: admin,
        room,
        text: `${user}이(가) 퇴장했습니다.`,
      }),
    [socket, admin]
  );

  const sendMessage = useCallback(
    (text: string) =>
      socket.emit(SERVER_EVENT.MSG_TO_SERVER, {
        uuid: uuidV4(),
        text,
        ...info,
      }),
    [socket, info]
  );

  useEffect(() => {
    joinRoom(info);

    return () => {
      leaveRoom(info);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return [messages, sendMessage, changeInfo];
};

export default useChat;
