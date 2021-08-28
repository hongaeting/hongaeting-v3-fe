import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

const GreenButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  bottom: 60px;
  position: absolute;

  width: calc(100% - 64px);
  height: 56px;

  font-weight: 700;
  font-size: 18px;
  color: white;

  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export default GreenButton;
