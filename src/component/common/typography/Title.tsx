import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 36px;
  font-weight: bold;
`;

export default Title;
