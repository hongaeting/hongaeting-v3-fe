/** @jsxImportSource @emotion/react */
import { Container, Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import TitleTypography from 'component/common/typography/TitleTypography';
import SubtitleTypography from 'component/common/typography/SubtitleTypography';
import StartServiceButton from 'component/common/button/StartServiceButton';

const IndexPageContainer = styled(Container)`
  position: relative;
  background-color: white;
  max-width: 600px;
  height: 100vh;
  padding: 0px 32px;
`;

export default function IndexContainer() {
  return (
    <IndexPageContainer>
      <Grid
        css={css`
          position: relative;
          height: 100%;
        `}
      >
        <TitleTypography
          css={css`
            padding-top: 110px;
            width: 100%;
          `}
        >
          홍개팅
        </TitleTypography>
        <SubtitleTypography
          css={css`
            padding-top: 30px;
            width: 100%;
          `}
        >
          학교에서
          <br />
          나와 잘 맞는
          <br />
          대화 상대 찾아볼까요?
        </SubtitleTypography>
        <StartServiceButton>홍익대 이메일로 시작하기</StartServiceButton>
      </Grid>
    </IndexPageContainer>
  );
}
