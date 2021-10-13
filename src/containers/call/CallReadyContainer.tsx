/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import Subtitle from 'component/auth/Subtitle';
import HelpTypography from 'component/common/typography/HelpTypography';
import { RootState } from 'modules';

const TITLE = ['전화 매칭', '준비중에 있습니다.'];

export default function CallReadyContainer() {
  const { myPeer, socket } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    if (socket !== null && myPeer !== null) {
      socket.emit('request-matching', { peerId: myPeer.id });

      window.addEventListener('beforeunload', () => {
        socket.emit('cancel-matching');
      });
    }

    return () => {
      window.removeEventListener('beforeunload', () => {
        socket?.emit('cancel-matching');
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

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
    </Grid>
  );
}
