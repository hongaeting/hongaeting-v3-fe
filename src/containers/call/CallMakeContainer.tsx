/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import Subtitle from 'component/auth/Subtitle';
import GreenButton from 'component/common/button/GreenButton';
import HelpTypography from 'component/common/typography/HelpTypography';

const TITLE = ['~~~님과의', '통화가 시작 되었습니다.'];

export default function CallMakeContainer() {
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
      </Grid>
      <GreenButton>통화 종료하기</GreenButton>
    </Grid>
  );
}
