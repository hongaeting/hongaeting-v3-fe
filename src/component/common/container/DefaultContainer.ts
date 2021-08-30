import styled from '@emotion/styled';
import { Container } from '@material-ui/core';

const DefaultContainer = styled(Container)`
  position: relative;
  background-color: white;
  max-width: 600px;
  height: calc(100vh - 56px);
  padding: 0px 32px;
`;

export default DefaultContainer;
