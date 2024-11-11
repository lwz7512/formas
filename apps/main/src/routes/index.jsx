import { createBrowserRouter } from 'react-router-dom';

import { GuestLayout, DashboardLayout } from '@/layouts';
import {
  ErrorPage,
  Error400Page,
  Error403Page,
  Error404Page,
  Error500Page,
  Error503Page,
  WelcomePage,
  SignInPage,
  SignUpPage,
  DefaultDashboardPage,
  Demo1,
  Demo2,
  Demo3,
  Demo4,
  Demo5,
  Demo6,
  Demo7,
  Demo8,
  Demo9,
  Demo10,
  Demo11,
  Demo12,
  Demo13,
  LogicFlowPage,
  FormDesigner,
} from '@/pages';

import { ScrollToTop } from './scroll-top';

// type PageProps = {
//   children: ReactNode;
// };

/**
 * Create an HOC to wrap your route components with ScrollToTop
 * @param {ReactNode} children
 * @returns
 */
const PageWrapper = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

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
      element: <PageWrapper children={<GuestLayout />} />,
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
      path: 'errors',
      errorElement: <ErrorPage />,
      children: [
        {
          path: '400',
          element: <Error400Page />,
        },
        {
          path: '403',
          element: <Error403Page />,
        },
        {
          path: '404',
          element: <Error404Page />,
        },
        {
          path: '500',
          element: <Error500Page />,
        },
        {
          path: '503',
          element: <Error503Page />,
        },
      ],
    },
    {
      path: '/designer',
      element: <PageWrapper children={<DashboardLayout />} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: '',
          element: <FormDesigner />,
        },
      ],
    },
    {
      path: '/demos',
      element: <PageWrapper children={<DashboardLayout />} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: 'default',
          element: <DefaultDashboardPage />,
        },
        {
          path: 'demo1',
          element: <Demo1 />,
        },
        {
          path: 'demo2',
          element: <Demo2 />,
        },
        {
          path: 'demo3',
          element: <Demo3 />,
        },
        {
          path: 'demo4',
          element: <Demo4 />,
        },
        {
          path: 'demo5',
          element: <Demo5 />,
        },
        {
          path: 'demo6',
          element: <Demo6 />,
        },
        {
          path: 'demo7',
          element: <Demo7 />,
        },
        {
          path: 'demo8',
          element: <Demo8 />,
        },
        {
          path: 'demo9',
          element: <Demo9 />,
        },
        {
          path: 'demo10',
          element: <Demo10 />,
        },
        {
          path: 'demo11',
          element: <Demo11 />,
        },
        {
          path: 'demo12',
          element: <Demo12 />,
        },
        {
          path: 'demo13',
          element: <Demo13 />,
        },
        {
          path: 'demo14',
          element: <LogicFlowPage />,
        },
        // {
        //   path: 'learning',
        //   element: <LearningDashboardPage />,
        // },
        // {
        //   path: 'logistics',
        //   element: <LogisticsDashboardPage />,
        // },
      ],
    },
    // {
    //   path: '/sitemap',
    //   element: <PageWrapper children={<DashboardLayout />} />,
    //   errorElement: <ErrorPage />,
    //   children: [
    //     {
    //       index: true,
    //       path: '',
    //       element: <SitemapPage />,
    //     },
    //   ],
    // },
    // {
    //   path: '/corporate',
    //   element: <PageWrapper children={<CorporateLayout />} />,
    //   errorElement: <ErrorPage />,
    //   children: [
    //     {
    //       index: true,
    //       path: 'about',
    //       element: <CorporateAboutPage />,
    //     },
    //     {
    //       path: 'team',
    //       element: <CorporateTeamPage />,
    //     },
    //     {
    //       path: 'faqs',
    //       element: <CorporateFaqPage />,
    //     },
    //     {
    //       path: 'contact',
    //       element: <CorporateContactPage />,
    //     },
    //     {
    //       path: 'pricing',
    //       element: <CorporatePricingPage />,
    //     },
    //     {
    //       path: 'license',
    //       element: <CorporateLicensePage />,
    //     },
    //   ],
    // },
    // {
    //   path: '/user-profile',
    //   element: <PageWrapper children={<UserAccountLayout />} />,
    //   errorElement: <ErrorPage />,
    //   children: [
    //     {
    //       index: true,
    //       path: 'details',
    //       element: <UserProfileDetailsPage />,
    //     },
    //     {
    //       path: 'preferences',
    //       element: <UserProfilePreferencesPage />,
    //     },
    //     {
    //       path: 'information',
    //       element: <UserProfileInformationPage />,
    //     },
    //     {
    //       path: 'security',
    //       element: <UserProfileSecurityPage />,
    //     },
    //     {
    //       path: 'activity',
    //       element: <UserProfileActivityPage />,
    //     },
    //     {
    //       path: 'actions',
    //       element: <UserProfileActionsPage />,
    //     },
    //     {
    //       path: 'help',
    //       element: <UserProfileHelpPage />,
    //     },
    //     {
    //       path: 'feedback',
    //       element: <UserProfileFeedbackPage />,
    //     },
    //   ],
    // },
    // {
    //   path: '/about',
    //   element: <PageWrapper children={<DashboardLayout />} />,
    //   errorElement: <ErrorPage />,
    //   children: [
    //     {
    //       index: true,
    //       path: '',
    //       element: <AboutPage />,
    //     },
    //   ],
    // },
  ],
  options
);
