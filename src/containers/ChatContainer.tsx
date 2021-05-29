import React, { useState } from 'react';

import { uuidV4 } from '../utils';
import { useChat } from '../hooks';
import './ChatContainer.css';

export default function ChatContainer() {
  const [room, setRoom] = useState<string>('default');
  const [user, setUser] = useState<string>(`user-${uuidV4().slice(0, 8)}`);
  const [text, setText] = useState<string>('');
  const [messages, sendMessage, changeInfo] = useChat({ room, user });

  const handleChangeRoom: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setRoom(value);
  const handleChangeUser: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setUser(value);
  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = ({
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
            onChange={handleChangeRoom}
            onKeyUp={handleKeyUpInfp}
          />
        </label>
        <br />
        <label className="user" htmlFor="user">
          <span>User</span>
          <input
            id="user"
            value={user}
            onChange={handleChangeUser}
            onKeyUp={handleKeyUpInfp}
          />
        </label>
        <br />
        <ul className="messages">
          {messages.map(({ uuid, user: _user, text: _text }) => (
            <li key={uuid}>{`[${_user}] ${_text}`}</li>
          ))}
        </ul>
        <label className="text" htmlFor="text">
          <span>Chat</span>
          <input
            id="text"
            value={text}
            onChange={handleChangeText}
            onKeyUp={handleKeyUpText}
            placeholder="텍스트를 입력 후 Enter"
          />
        </label>
      </main>
    </div>
  );
}
