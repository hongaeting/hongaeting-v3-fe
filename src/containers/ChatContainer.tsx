import React, { useCallback, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import { debounce } from 'lodash';
import './ChatContainer.css';

/**
 * Generates ver.4 UUID
 * @returns {string} UUID - 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
 */
export const uuidV4 = () => {
  const [hexadecimals, delimiterIndex] = ['0123456789abcdef', [8, 13, 18, 23]];
  return Array.from({ length: 36 }, (_, i) =>
    delimiterIndex.includes(i)
      ? '-'
      : hexadecimals[Math.floor(Math.random() * hexadecimals.length)]
  ).join('');
};

type Message = {
  uuid: string;
  room: string;
  user: string;
  text: string;
};

type Info = {
  room: string;
  user: string;
};

export default function ChatContainer() {
  const socket = useMemo(
    () =>
      io.connect('http://localhost:4000/chats', {
        transports: ['websocket'],
      }),
    []
  );
  const admin = useMemo(() => 'admin', []);
  const [room, setRoom] = useState<string>('default');
  const [user, setUser] = useState<string>(`user-${uuidV4().slice(0, 8)}`);
  const [text, setText] = useState<string>('');
  const [info, setInfo] = useState<Info>({ room, user });
  // eslint-disable-next-line
  const changeInfo = useCallback(debounce(setInfo, 500), []);
  const [messages, setMessages] = useState<Message[]>([]);
  const joinRoom = useCallback(
    ({ room: _room, user: _user }) =>
      socket.emit('joinRoom', {
        uuid: uuidV4(),
        room: _room,
        user: admin,
        text: `${_user}이(가) 입장했습니다.`,
      }),
    [socket, admin]
  );
  const leaveRoom = useCallback(
    ({ room: _room, user: _user }) =>
      socket.emit('leaveRoom', {
        uuid: uuidV4(),
        room: _room,
        user: admin,
        text: `${_user}이(가) 퇴장했습니다.`,
      }),
    [socket, admin]
  );
  const sendMessage = useCallback(
    (_text) =>
      socket.emit('msgToServer', {
        uuid: uuidV4(),
        text: _text,
        ...info,
      }),
    [socket, info]
  );

  useEffect(() => {
    socket.on('error', () => {});
    socket.on('connect', () => {});
    socket.on('connect_error', () => {});
    socket.on('disconnect', () => {});
    socket.on('joinedRoom', (joinedRoom: string) =>
      setMessages((_messages) => [
        ..._messages,
        {
          uuid: uuidV4(),
          room: joinedRoom,
          user: admin,
          text: `${joinedRoom} 방에 입장했습니다.`,
        },
      ])
    );
    socket.on('leftRoom', (leftRoom: string) =>
      setMessages((_messages) => [
        ..._messages,
        {
          uuid: uuidV4(),
          room: leftRoom,
          user: admin,
          text: `${leftRoom} 방을 퇴장했습니다.`,
        },
      ])
    );
    socket.on('msgToClient', (message: Message) =>
      setMessages((_messages) => [..._messages, message])
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    joinRoom(info);

    return () => {
      leaveRoom(info);
    };
    // eslint-disable-next-line
  }, [info]);

  const handleChagneRoom: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setRoom(value);
  const handleChagneUser: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setUser(value);
  const handleChagneText: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setText(value);
  const handleKeyUpText: React.KeyboardEventHandler<HTMLInputElement> = ({
    key,
  }) => {
    if (text === '' || key !== 'Enter') return;
    sendMessage(text);
    setText('');
  };
  const handleKeyUpInfp: React.KeyboardEventHandler<HTMLInputElement> = () =>
    changeInfo({ room, user });

  return (
    <div className="chat-container">
      <main className="chat-view">
        <label className="room" htmlFor="room">
          <span>Room</span>
          <input
            id="room"
            value={room}
            onChange={handleChagneRoom}
            onKeyUp={handleKeyUpInfp}
          />
        </label>
        <br />
        <label className="user" htmlFor="user">
          <span>User</span>
          <input
            id="user"
            value={user}
            onChange={handleChagneUser}
            onKeyUp={handleKeyUpInfp}
          />
        </label>
        <br />
        <ul className="messages">
          {messages.map(({ uuid, user: _user, text: _text }) =>
            _user === admin ? (
              <li key={uuid}>{`[${_text}]`}</li>
            ) : (
              <li key={uuid}>{`[${_user}] ${_text}`}</li>
            )
          )}
        </ul>
        <label className="text" htmlFor="text">
          <span>Chat</span>
          <input
            id="text"
            value={text}
            onChange={handleChagneText}
            onKeyUp={handleKeyUpText}
            placeholder="텍스트를 입력 후 Enter"
          />
        </label>
      </main>
    </div>
  );
}
