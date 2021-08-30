import { Grid } from '@material-ui/core';
import GreenButton from 'component/common/button/GreenButton';
import Subtitle from 'component/auth/Subtitle';
import EmailForm from 'component/auth/EmailForm';
import { useHistory } from 'react-router-dom';

const TITLE = ['학교 인증에', '필요한 시간 30초!'];

export default function EmailFormContainer() {
  const history = useHistory();
  return (
    <Grid container>
      <Subtitle content={TITLE} />
      <EmailForm />
      <GreenButton onClick={() => history.push('/auth/signup/receive')}>
        인증 메일 받기
      </GreenButton>
    </Grid>
  );
}
