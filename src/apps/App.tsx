import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from '../redux/store';
import routes from './Routes';
import theme from './Theme';

import '../assets/css/app.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<LinearProgress />}>
          <RouterProvider
            router={routes}
            fallbackElement={<LinearProgress />}
          />
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
