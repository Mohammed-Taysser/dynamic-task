import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes';
import theme from './Theme';

import '../assets/scss/app.scss';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LinearProgress />}>
        <RouterProvider router={routes} fallbackElement={<LinearProgress />} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
