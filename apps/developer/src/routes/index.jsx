import { createBrowserRouter } from 'react-router-dom';

import {
  DICTIONARY_PATH,
  BIZTREE_PATH,
  FORM_DEFINE_PATH,
  EXTERNAL_DATA_SOURCE_PATH,
  DATA_VIEW_PATH,
  MENU_MANAGE_PATH,
  HOME_AFTER_LOGIN,
} from '@/constants';
import { GuestLayout, HeaderFooterLayout } from '@/layouts';

import { WelcomePage, SignInPage, SignUpPage } from '../pages/auth';
import { ModuleManagement } from '../pages/module';
import { ErrorPage } from '../pages/errors/error-x';
import { DictionaryPage } from '../pages/dictionary';
import { BizTreeConfigPage } from '../pages/biztree';
import { FormDefinePage, FormSchemaDesigner } from '../pages/form';
import { DataSourcePage } from '../pages/datasource';
import { DataViewPage } from '../pages/dataview';
import { MenuManagePage } from '../pages/menu';

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
          element: <ModuleManagement />,
        },
      ],
    },
    {
      path: DICTIONARY_PATH,
      element: <HeaderFooterLayout />,
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
      element: <HeaderFooterLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <BizTreeConfigPage />,
        },
      ],
    },
    {
      path: FORM_DEFINE_PATH,
      element: <HeaderFooterLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <FormDefinePage />,
        },
        {
          path: 'designer',
          element: <FormSchemaDesigner />,
        },
      ],
    },
    {
      path: EXTERNAL_DATA_SOURCE_PATH,
      element: <HeaderFooterLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <DataSourcePage />,
        },
      ],
    },
    {
      path: DATA_VIEW_PATH,
      element: <HeaderFooterLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <DataViewPage />,
        },
      ],
    },
    {
      path: MENU_MANAGE_PATH,
      element: <HeaderFooterLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <MenuManagePage />,
        },
      ],
    },
  ],
  options
);
