/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';

import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';
import HelpTypography from 'component/common/typography/HelpTypography';
import RTCVideo from 'component/RTCVideo';
import { RootState } from 'modules';
import { setOtherMediaStream } from 'modules/call';

const TITLE = ['~~~님과의', '통화가 시작 되었습니다.'];

type CallMakeContainerParams = {
  roomId: string;
};

export default function CallMakeContainer() {
  const params: CallMakeContainerParams = useParams();
  const { myPeer, myMediaStream, otherMediaStream, socket } = useSelector(
    (state: RootState) => state.call
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (myPeer !== null) {
      myPeer.on('close', () => {
        myPeer.destroy();
      });

      myPeer.on('call', (callConnection) => {
        callConnection.answer(myMediaStream ?? undefined);

        callConnection.on('stream', (receivedMediaStream: MediaStream) => {
          dispatch(setOtherMediaStream(receivedMediaStream));
        });
      });

      window.addEventListener('beforeunload', () => {
        myPeer.destroy();
        socket?.emit('end-calling');
      });
    }

    return () => {
      myPeer?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle content={TITLE} />
      </Grid>
      <Grid
        item
        xs={12}
        css={css`
          margin-top: 30px;
        `}
      >
        <HelpTypography
          css={css`
            text-decoration-line: none;
          `}
        >
          마음을 다치게 하는 <br />
          말은 하지 말아주세요
        </HelpTypography>
      </Grid>
      <Grid
        item
        xs={12}
        css={css`
          margin-top: 90px;
        `}
      >
        <HelpTypography>
          개인정보 처리방침에 동의하는 것으로 간주합니다.
        </HelpTypography>
        <RTCVideo mediaStream={otherMediaStream} />
      </Grid>
      <GreenButton
        onClick={() => {
          if (myPeer !== null && socket !== null) {
            myPeer.destroy();
            socket.emit('end-calling');

            // eslint-disable-next-line no-alert
            alert('통화가 종료되었습니다!');
          }
        }}
      >
        통화 종료하기
      </GreenButton>
    </Grid>
  );
}
