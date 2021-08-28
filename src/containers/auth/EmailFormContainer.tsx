/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';
import Subtitle from 'component/common/typography/Subtitle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StartServiceButton from 'component/common/button/StartServiceButton';
import GreenButton from 'component/common/button/GreenButton';

export default function EmailFormContainer() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Subtitle>
          학교 인증에 <br /> 필요한 시간 30초!
        </Subtitle>
      </Grid>

      <Grid
        item
        container
        xs={12}
        css={css`
          margin-top: 80px;
        `}
        alignItems="center"
      >
        <MailOutlineIcon fontSize="large" />
        <Grid
          item
          css={css`
            margin-left: 8px;
          `}
        >
          <Typography
            css={css`
              font-size: 18px;
              margin: auto;
            `}
          >
            홍익대학교 이메일을 입력해주세요.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        css={css`
          margin-top: 24px;
        `}
      >
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">@mail.hongik.ac.kr</InputAdornment>
          }
          css={css`
            width: 100%;
          `}
        />
      </Grid>

      <GreenButton>인증 메일 받기</GreenButton>
    </Grid>
  );
}
