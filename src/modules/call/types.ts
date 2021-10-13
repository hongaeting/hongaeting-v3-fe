import Peer from 'peerjs';
import {
  setMyPeer,
  initMyCallInfo,
  removeMyPeer,
  setMyMediaStream,
  removeMyMediaStream,
  setOtherPeerId,
  removeOtherPeerId,
  setOtherMediaStream,
  removeOtherMediaStream,
  setSocket,
  removeSocket,
} from './actions';

export type CallAction =
  | ReturnType<typeof setMyPeer>
  | ReturnType<typeof initMyCallInfo>
  | ReturnType<typeof removeMyPeer>
  | ReturnType<typeof setMyMediaStream>
  | ReturnType<typeof removeMyMediaStream>
  | ReturnType<typeof setOtherPeerId>
  | ReturnType<typeof removeOtherPeerId>
  | ReturnType<typeof setOtherMediaStream>
  | ReturnType<typeof removeOtherMediaStream>
  | ReturnType<typeof setSocket>
  | ReturnType<typeof removeSocket>;

export type CallState = {
  myPeer: Peer | null;
  myMediaStream: MediaStream | null;
  otherPeerId: string | null;
  otherMediaStream: MediaStream | null;
  socket: SocketIOClient.Socket | null;
};
