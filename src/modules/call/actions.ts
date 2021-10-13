import Peer from 'peerjs';

export const INIT_MY_CALL_INFO = 'call/INIT_MY_CALL_INFO' as const;
export const initMyCallInfo = (
  myPeer: Peer,
  myMediaStream: MediaStream,
  socket: SocketIOClient.Socket
) => ({
  type: INIT_MY_CALL_INFO,
  payload: { myPeer, myMediaStream, socket },
});

export const SET_MY_PEER = 'call/SET_MY_PEER' as const;
export const REMOVE_MY_PEER = 'call/REMOVE_MY_PEER' as const;

export const SET_MY_MEDIA_STREAM = 'call/SET_MY_MEDIA_STREAM' as const;
export const REMOVE_MY_MEDIA_STREAM = 'call/REMOVE_MY_MEDIA_STREAM' as const;

export const SET_OHTER_PEER_ID = 'call/SET_OHTER_PEER_ID' as const;
export const REMOVE_OTHER_PEER_ID = 'call/REMOVE_OTHER_PEER_ID' as const;

export const SET_OTHER_MEDIA_STREAM = 'call/SET_OTHER_MEDIA_STREAM' as const;
export const REMOVE_OTHER_MEDIA_STREAM =
  'call/REMOVE_OTHER_MEDIA_STREAM' as const;

export const SET_SOCKET = 'call/SET_SOCKET' as const;
export const REMOVE_SOCKET = 'call/REMOVE_SOCKET' as const;

export const setMyPeer = (myPeer: Peer) => ({
  type: SET_MY_PEER,
  payload: myPeer,
});
export const removeMyPeer = () => ({ type: REMOVE_MY_PEER });

export const setMyMediaStream = (myMediaStream: MediaStream) => ({
  type: SET_MY_MEDIA_STREAM,
  payload: myMediaStream,
});
export const removeMyMediaStream = () => ({ type: REMOVE_MY_MEDIA_STREAM });

export const setOtherPeerId = (otherPeerId: string) => ({
  type: SET_OHTER_PEER_ID,
  payload: otherPeerId,
});
export const removeOtherPeerId = () => ({ type: REMOVE_OTHER_PEER_ID });

export const setOtherMediaStream = (otherMediaStream: MediaStream) => ({
  type: SET_OTHER_MEDIA_STREAM,
  payload: otherMediaStream,
});
export const removeOtherMediaStream = () => ({
  type: REMOVE_OTHER_MEDIA_STREAM,
});

export const setSocket = (socket: SocketIOClient.Socket) => ({
  type: SET_SOCKET,
  payload: socket,
});
export const removeSocket = () => ({ type: REMOVE_SOCKET });
