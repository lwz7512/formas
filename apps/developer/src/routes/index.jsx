import { createBrowserRouter } from 'react-router-dom';

import { DICTIONARY_PATH, BIZTREE_PATH } from '@/constants';
import { GuestLayout, DashboardLayout } from '@/layouts';

import { WelcomePage, SignInPage, SignUpPage } from '../pages/auth';
import { ErrorPage } from '../pages/errors/error-x';
import { DictionaryPage } from '../pages/dictionary';
import { BizTreeConfigPage } from '../pages/biztree';

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
    {
      path: '/auth',
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'signup',
          element: <SignUpPage />,
        },
        {
          path: 'signin',
          element: <SignInPage />,
        },
      ],
    },
    {
      path: '/auth/welcome',
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <WelcomePage />,
        },
      ],
    },
    {
      path: DICTIONARY_PATH,
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <DictionaryPage />,
        },
      ],
    },
    {
      path: BIZTREE_PATH,
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <BizTreeConfigPage />,
        },
      ],
    },
  ],
  options
);
