import { Grid } from '@material-ui/core';
import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';

const TITLE = ['반갑습니다 ~~님'];
const DESCRIPTION = ['학교에서 나와 잘 맞는', '대화 상대를 찾아보세요'];

export default function SignInCompleteContainer() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle content={TITLE} />
      </Grid>
      <Grid item xs={12}>
        <Subtitle content={DESCRIPTION} />
      </Grid>
      <GreenButton>지금 찾아보기</GreenButton>
    </Grid>
  );
}
