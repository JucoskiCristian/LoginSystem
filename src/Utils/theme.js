import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        light: '#e1ceff',
        main: '#af9dd6',
        dark: '#7f6fa4',
        contrastText: '#000',
      },
      secondary: {
        light: '#fdf4ff',
        main: '#cac1db',
        dark: '#9991a9',
        contrastText: '#000',
      },
    },
  });

export default theme