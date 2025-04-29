import { createBrowserRouter } from 'react-router-dom';

import { HOME_AFTER_LOGIN } from '@/constants';
import { GuestLayout, HeaderFooterLayout } from '@/layouts';

import { WelcomePage, SignInPage, SignUpPage } from '../pages/auth';
import { ErrorPage } from '../pages/errors/error-x';

import { HomePage } from '../pages/home';

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
    // == 登录成功后跳转的页面 ==
    {
      path: HOME_AFTER_LOGIN,
      element: <HeaderFooterLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <HomePage />,
        },
      ],
    },
  ],
  options
);
