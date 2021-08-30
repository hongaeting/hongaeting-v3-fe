/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import SubtitleTypography from 'component/common/typography/SubtitleTypography';

interface ISubtitleProps {
  content: string[];
  minHeight?: number;
}

export default function Subtitle({ content, minHeight = 80 }: ISubtitleProps) {
  return (
    <Grid
      item
      xs={12}
      css={css`
        margin-top: 30px;
        min-height: ${minHeight}px;
      `}
    >
      {content.map((para, i) => (
        <SubtitleTypography key={i}>{para}</SubtitleTypography>
      ))}
    </Grid>
  );
}
