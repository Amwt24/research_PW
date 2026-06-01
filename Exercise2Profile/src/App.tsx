import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { ProfileEditor } from './components/ProfileEditor';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
        }}
      >
        <ProfileEditor />
      </Box>
    </ThemeProvider>
  );
}

export default App;
