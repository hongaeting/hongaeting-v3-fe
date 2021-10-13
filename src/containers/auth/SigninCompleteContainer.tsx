import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';
import useIsCallReady from 'hooks/useIsCallReady';
import useInitMyCallData from 'hooks/call/useInitMyCallData';

const TITLE = ['반갑습니다 ~~님'];
const DESCRIPTION = ['학교에서 나와 잘 맞는', '대화 상대를 찾아보세요'];

export default function SignInCompleteContainer() {
  const callReady = useIsCallReady();
  const history = useHistory();

  const initMyCallData = useInitMyCallData();

  useEffect(() => {
    initMyCallData();
  }, [initMyCallData]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle content={TITLE} />
      </Grid>
      <Grid item xs={12}>
        <Subtitle content={DESCRIPTION} />
      </Grid>
      {callReady ? (
        <GreenButton onClick={() => history.push('/call/ready')}>
          지금 찾아보기
        </GreenButton>
      ) : (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
}
