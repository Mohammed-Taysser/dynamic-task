import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function Base() {
  return (
    <div>
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default Base;
