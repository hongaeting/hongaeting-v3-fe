/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import ProfileForm from 'component/auth/ProfileForm';
import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';

const TITLE = ['대화 상대를 찾기 위한', '정보를 입력해주세요.'];

export default function SignInFormContainer() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle content={TITLE} />
      </Grid>
      <Grid
        item
        xs={12}
        css={css`
          margin-top: 44px;
        `}
      >
        <ProfileForm />
      </Grid>
      <GreenButton>다음</GreenButton>
    </Grid>
  );
}
