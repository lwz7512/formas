import { createBrowserRouter } from 'react-router-dom';

import { GuestLayout, DashboardLayout } from '@/layouts';

import { ErrorPage } from '../pages/errors/error-x';
import { WelcomePage } from '../pages/auth/welcome';

const options = {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
};

// Create the router
export const Routers = createBrowserRouter(
  [
    {
      path: '/',
      element: <GuestLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <WelcomePage />,
        },
      ],
    },
    // {
    //   path: '/dictionaries',
    //   element: <DashboardLayout />,
    //   errorElement: <ErrorPage />,
    //   children: [
    //     {
    //       index: true,
    //       path: '',
    //       element: <DictionaryManager />,
    //     },
    //   ],
    // },
  ],
  options
);
