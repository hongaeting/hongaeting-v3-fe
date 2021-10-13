import { INIT_MY_CALL_INFO } from '.';
import {
  SET_MY_PEER,
  REMOVE_MY_PEER,
  SET_MY_MEDIA_STREAM,
  SET_OHTER_PEER_ID,
  SET_OTHER_MEDIA_STREAM,
  SET_SOCKET,
  REMOVE_MY_MEDIA_STREAM,
  REMOVE_OTHER_MEDIA_STREAM,
  REMOVE_OTHER_PEER_ID,
  REMOVE_SOCKET,
} from './actions';
import { CallAction, CallState } from './types';

const initialPeerState: CallState = {
  myPeer: null,
  myMediaStream: null,
  otherPeerId: null,
  otherMediaStream: null,
  socket: null,
};

export default function call(
  state: CallState = initialPeerState,
  action: CallAction
): CallState {
  switch (action.type) {
    case SET_MY_PEER:
      return {
        ...state,
        myPeer: action.payload,
      };
    case INIT_MY_CALL_INFO:
      return {
        ...state,
        myPeer: action.payload.myPeer,
        myMediaStream: action.payload.myMediaStream,
        socket: action.payload.socket,
      };
    case REMOVE_MY_PEER:
      return { ...state, myPeer: null };
    case SET_MY_MEDIA_STREAM:
      return { ...state, myMediaStream: action.payload };
    case REMOVE_MY_MEDIA_STREAM:
      return { ...state };
    case SET_OHTER_PEER_ID:
      return { ...state, otherPeerId: action.payload };
    case REMOVE_OTHER_PEER_ID:
      return { ...state };
    case SET_OTHER_MEDIA_STREAM:
      return { ...state, otherMediaStream: action.payload };
    case REMOVE_OTHER_MEDIA_STREAM:
      return { ...state };
    case SET_SOCKET:
      return { ...state, socket: action.payload };
    case REMOVE_SOCKET:
      return { ...state };
    default:
      return state;
  }
}
