import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Ubuntu', 'sans-serif'`,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#12b886',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976D2',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: '20px',
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
          borderColor: 'RGB(229, 234, 242)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'RGB(229, 234, 242)',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
          display: 'flex',
        },
      },
    },
  },
});

export default theme;
