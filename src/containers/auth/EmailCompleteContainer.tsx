import { Grid } from '@material-ui/core';
import ProfileForm from 'component/auth/ProfileForm';
import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';

const TITLE = ['학교 인증 완료!'];

export default function EmailCompleteContainer() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle content={TITLE} />
      </Grid>
      <Grid item xs={12}>
        <ProfileForm subtitle={['프로필 정보 입력']} />
      </Grid>
      <GreenButton>다음</GreenButton>
    </Grid>
  );
}
