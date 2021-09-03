import { Grid } from '@material-ui/core';
import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';

const TITLE = [
  '반갑습니다 ~~~님',
  '우리 학교 다른 학과 학우와',
  '이야기 나누어보세요.',
];

export default function CallReceiveContainer() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle content={TITLE} />
      </Grid>

      <GreenButton>홍대 학우와 통화 시작하기</GreenButton>
    </Grid>
  );
}
