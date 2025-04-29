import { Outlet } from 'react-router-dom';
import { AppLayout } from './app-layout';
import { HCFLayout } from './hcf-layout';

export const DashboardLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const HeaderFooterLayout = () => {
  return (
    <HCFLayout>
      <Outlet />
    </HCFLayout>
  );
};
