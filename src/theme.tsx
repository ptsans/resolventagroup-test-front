import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6320EE',
    },
    secondary: {
      main: '#F7AF9D',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F8F0FB',
    },
  },
});

export default theme;
