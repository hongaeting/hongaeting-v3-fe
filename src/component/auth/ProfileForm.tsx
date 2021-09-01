/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  FormControl,
  Grid,
  Select,
  TextField,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import HelpTypography from 'component/common/typography/HelpTypography';
import Subtitle from './Subtitle';

interface IProfileFormProps {
  subtitle?: string[];
}

export default function ProfileForm({ subtitle }: IProfileFormProps) {
  return (
    <Grid container>
      {subtitle && (
        <Grid item>
          <Subtitle content={subtitle} minHeight={34} />
        </Grid>
      )}

      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="닉네임"
          css={css`
            width: 100%;
            margin-top: 12px;
          `}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          variant="outlined"
          css={css`
            width: 100%;
            margin-top: 12px;
          `}
        >
          <InputLabel id="college-label">단과대학</InputLabel>
          <Select label="단과대학" labelId="college-label">
            <MenuItem>a</MenuItem>
            <MenuItem>b</MenuItem>
            <MenuItem>c</MenuItem>
            <MenuItem>d</MenuItem>
            <MenuItem>e</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl
          variant="outlined"
          css={css`
            width: 100%;
            margin-top: 12px;
          `}
        >
          <InputLabel id="gender-label">성별</InputLabel>
          <Select labelId="gender-label" label="성별">
            <MenuItem>남성</MenuItem>
            <MenuItem>여성</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <HelpTypography
          css={css`
            margin-top: 12px;
          `}
        >
          전화 매칭에 필요한 최소한의 정보만 받습니다.
        </HelpTypography>
      </Grid>
    </Grid>
  );
}
