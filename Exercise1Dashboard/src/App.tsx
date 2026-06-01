import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserTable } from './components/UserTable';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    background: {
      default: '#f8fafc',
    },
    primary: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserTable />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
