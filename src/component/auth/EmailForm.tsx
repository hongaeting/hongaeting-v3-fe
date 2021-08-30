/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Grid,
  Typography,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function EmailForm() {
  return (
    <Grid item container>
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
          <Typography variant="h6">
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
    </Grid>
  );
}
