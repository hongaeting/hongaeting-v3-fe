import { useSocket } from 'hooks';
import { RootState } from 'modules';
import {
  setMyMediaStream,
  setMyPeer,
  setOtherMediaStream,
  setOtherPeerId,
  setSocket,
} from 'modules/call';
import Peer from 'peerjs';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

type MatchingResult = {
  result: 'WAITING' | 'ERROR' | 'MATCHING';
  roomId: string;
};

type MatchingStatus = {
  payload: { result: MatchingResult; roomId: string };
};

const useInitMyCallData = () => {
  const { myPeer, myMediaStream, socket } = useSelector(
    (state: RootState) => state.call
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const newPeer = new Peer(undefined, {
    host: process.env.REACT_APP_PEER_SERVER_HOST,
    port: parseInt(process.env.REACT_APP_PEER_SERVER_PORT || '', 10),
    path: process.env.REACT_APP_PEER_SERVER_PATH,
  });

  const [newSocket] = useSocket(
    process.env.REACT_APP_VIDEO_CHAT_SOCKET_NAMESPACE as string,
    [
      [
        'user:matching-status',
        ({ payload }: MatchingStatus) => {
          if (payload.result.result === 'MATCHING') {
            history.push(`/call/make/${payload.roomId}`);
          }
        },
      ],
      [
        'user:matching-complete',
        ({ payload }) => {
          dispatch(setOtherPeerId(payload.otherPeerId));
          history.push(`/call/make/${payload.roomId}`);

          if (myPeer === null || myMediaStream === null || socket === null) {
            return;
          }

          const peerConnection = myPeer.call(
            payload.otherPeerId,
            myMediaStream
          );

          peerConnection.on('stream', (otherMediaStream: MediaStream) => {
            dispatch(setOtherMediaStream(otherMediaStream));
          });

          peerConnection.on('close', () => {
            socket.emit('leave-room');
          });
        },
      ],
      [
        'user:calling-ended',
        () => {
          console.log('user:calling-ended 받음');
          if (myPeer !== null) {
            myPeer.destroy();
          }

          if (socket !== null) {
            // socket.emit('end-calling');
          }

          // eslint-disable-next-line no-alert
          alert('상대방이 통화를 종료했습니다.');
        },
      ],
    ]
  );

  const connectMyStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    dispatch(setMyMediaStream(stream));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useCallback(() => {
    if (myPeer === null) dispatch(setMyPeer(newPeer));
    if (myMediaStream === null) connectMyStream();
    if (socket === null) dispatch(setSocket(newSocket));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
};

export default useInitMyCallData;
