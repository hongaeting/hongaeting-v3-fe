/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';
import HelpTypography from 'component/common/typography/HelpTypography';
import SubtitleTypography from 'component/common/typography/SubtitleTypography';
import TitleTypography from 'component/common/typography/TitleTypography';

const TITLE = ['받은 메일함 확인!'];

export default function EmailReceiveContainer() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle content={TITLE} />
      </Grid>
      <Grid item xs={12}>
        <TitleTypography
          css={css`
            font-size: 18px;
          `}
        >
          email
        </TitleTypography>
        <SubtitleTypography
          css={css`
            font-size: 18px;
          `}
        >
          받은 메일함에서 인증버튼을 클릭해주세요.
        </SubtitleTypography>
      </Grid>
      <Grid item xs={12}>
        <HelpTypography
          css={css`
            margin-top: 20px;
          `}
        >
          메일이 오지 않은 경우,
        </HelpTypography>
        <HelpTypography>스팸 메일함도 꼭 확인해주세요.</HelpTypography>
        <GreenButton>인증 메일 다시 받기</GreenButton>
      </Grid>
    </Grid>
  );
}
