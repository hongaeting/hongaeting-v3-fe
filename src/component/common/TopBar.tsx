import styled from '@emotion/styled';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';

const TopAppBar = styled(AppBar)`
  height: 56px;
  width: calc(100%);
  max-width: ${({ theme }) => `${theme.breakpoints.values.sm}px`};

  margin: 0 auto;

  background-color: white;

  box-shadow: none;
`;

const TopAppBarIconButton = styled(IconButton)`
  padding: 16px;
`;

const CustomToolbar = styled(Toolbar)`
  padding: 0px;
`;

export default function TopBar() {
  return (
    <TopAppBar position="sticky">
      <CustomToolbar>
        <TopAppBarIconButton>
          <KeyboardArrowLeftIcon fontSize="large" />
        </TopAppBarIconButton>
      </CustomToolbar>
    </TopAppBar>
  );
}
