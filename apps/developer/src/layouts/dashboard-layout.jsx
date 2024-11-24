import { Outlet } from 'react-router-dom';
import { AppLayout } from './app-layout';

export const DashboardLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
