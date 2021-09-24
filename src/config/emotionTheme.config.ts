import { Theme as MuiTheme } from '@material-ui/core';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    bgColor: string;
    fontColor: string;
  }
}
