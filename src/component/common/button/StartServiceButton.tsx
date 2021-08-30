import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

const StartServiceButton = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
  bottom: 60px;
  position: absolute;

  width: 100%;
  height: 56px;

  font-weight: bold;
  font-size: 16px;
  text-align: center;

  border: 1px solid #cccccc;
`;

export default StartServiceButton;
