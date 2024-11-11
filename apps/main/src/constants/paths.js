function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_LANDING = '/';
const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_SITEMAP = '/sitemap';
const ROOTS_LAYOUT = '/layouts';
const ROOTS_CORPORATE = '/corporate';
const ROOTS_PROFILE = '/user-profile';
const ROOTS_SOCIAL = '/social';
const ROOTS_BLOG = '/blog';
const ROOTS_CAREERS = '/careers';
const ROOTS_ACCOUNT = '/account';
const ROOTS_AUTH = '/auth';
const ROOTS_PROJECTS = '/projects';
const ROOTS_CONTACTS = '/contacts';
const ROOTS_USER_MGMT = '/user-management';
const ROOTS_SUBSCRIPTION = '/subscription';
const ROOTS_INVOICE = '/invoice';
const ROOTS_FILE_MGMT = '/file-manager';
const ROOTS_INBOX = '/inbox';
const ROOTS_CALENDAR = '/calendar';
const ROOTS_ERRORS = '/errors';
const ROOTS_ABOUT = '/about';

export const DEMO_PATHS = {
  default: '/demos/default',
  demo1: '/demos/demo1',
  demo2: '/demos/demo2',
  demo3: '/demos/demo3',
  demo4: '/demos/demo4',
  demo5: '/demos/demo5',
  demo6: '/demos/demo6',
  demo7: '/demos/demo7',
  demo8: '/demos/demo8',
  demo9: '/demos/demo9',
  demo10: '/demos/demo10',
  demo11: '/demos/demo11',
  demo12: '/demos/demo12',
};

export const PATH_ERROR = {
  root: ROOTS_ERRORS,
  error400: path(ROOTS_ERRORS, '/400'),
  error403: path(ROOTS_ERRORS, '/403'),
  error404: path(ROOTS_ERRORS, '/404'),
  error500: path(ROOTS_ERRORS, '/500'),
  error503: path(ROOTS_ERRORS, '/503'),
};

export const ERROR_ITEMS = [
  { title: '400', path: PATH_ERROR.error400 },
  { title: '403', path: PATH_ERROR.error403 },
  { title: '404', path: PATH_ERROR.error404 },
  { title: '500', path: PATH_ERROR.error500 },
  { title: '503', path: PATH_ERROR.error503 },
];

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  projects: path(ROOTS_DASHBOARD, '/projects'),
  ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  marketing: path(ROOTS_DASHBOARD, '/marketing'),
  social: path(ROOTS_DASHBOARD, '/social'),
  bidding: path(ROOTS_DASHBOARD, '/bidding'),
  learning: path(ROOTS_DASHBOARD, '/learning'),
  logistics: path(ROOTS_DASHBOARD, '/logistics'),
};

export const DASHBOARD_ITEMS = [
  { title: 'default', path: PATH_DASHBOARD.default },
  { title: 'projects', path: PATH_DASHBOARD.projects },
  { title: 'ecommerce', path: PATH_DASHBOARD.ecommerce },
  { title: 'marketing', path: PATH_DASHBOARD.marketing },
  { title: 'social', path: PATH_DASHBOARD.social },
  { title: 'bidding', path: PATH_DASHBOARD.bidding },
  { title: 'learning', path: PATH_DASHBOARD.learning },
  { title: 'logistics', path: PATH_DASHBOARD.logistics },
];

export const PATH_CORPORATE = {
  root: ROOTS_CORPORATE,
  about: path(ROOTS_CORPORATE, '/about'),
  team: path(ROOTS_CORPORATE, '/team'),
  faqs: path(ROOTS_CORPORATE, '/faqs'),
  contact: path(ROOTS_CORPORATE, '/contact'),
  pricing: path(ROOTS_CORPORATE, '/pricing'),
  license: path(ROOTS_CORPORATE, '/license'),
};

export const CORPORATE_ITEMS = [
  { title: 'about', path: PATH_CORPORATE.about },
  { title: 'team', path: PATH_CORPORATE.team },
  { title: 'faq', path: PATH_CORPORATE.faqs },
  { title: 'contact us', path: PATH_CORPORATE.contact },
  { title: 'pricing', path: PATH_CORPORATE.pricing },
  { title: 'license', path: PATH_CORPORATE.license },
];

export const PATH_USER_PROFILE = {
  root: ROOTS_PROFILE,
  details: path(ROOTS_PROFILE, '/details'),
  preferences: path(ROOTS_PROFILE, '/preferences'),
  personalInformation: path(ROOTS_PROFILE, '/personal-information'),
  security: path(ROOTS_PROFILE, '/security'),
  activity: path(ROOTS_PROFILE, '/activity'),
  action: path(ROOTS_PROFILE, '/actions'),
  help: path(ROOTS_PROFILE, '/help'),
  feedback: path(ROOTS_PROFILE, '/feedback'),
};

export const USER_PROFILE_ITEMS = [
  { title: 'details', path: PATH_USER_PROFILE.details },
  { title: 'preferences', path: PATH_USER_PROFILE.preferences },
  { title: 'information', path: PATH_USER_PROFILE.personalInformation },
  { title: 'security', path: PATH_USER_PROFILE.security },
  { title: 'activity', path: PATH_USER_PROFILE.activity },
  { title: 'actions', path: PATH_USER_PROFILE.action },
  { title: 'help', path: PATH_USER_PROFILE.help },
  { title: 'feedback', path: PATH_USER_PROFILE.feedback },
];

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
  passwordConfirm: path(ROOTS_AUTH, '/password-confirmation'),
  welcome: path(ROOTS_AUTH, '/welcome'),
  verifyEmail: path(ROOTS_AUTH, '/verify-email'),
  accountDelete: path(ROOTS_AUTH, '/account-delete'),
};

export const AUTHENTICATION_ITEMS = [
  { title: 'sign in', path: PATH_AUTH.signin },
  { title: 'sign up', path: PATH_AUTH.signup },
  { title: 'welcome', path: PATH_AUTH.welcome },
  { title: 'verify email', path: PATH_AUTH.verifyEmail },
  { title: 'password reset', path: PATH_AUTH.passwordReset },
  { title: 'account deleted', path: PATH_AUTH.accountDelete },
];

export const PATH_ACCOUNT = {
  root: ROOTS_ACCOUNT,
  settings: path(ROOTS_ACCOUNT, '/settings'),
  security: path(ROOTS_ACCOUNT, '/security'),
  activity: path(ROOTS_ACCOUNT, '/activity'),
  billing: path(ROOTS_ACCOUNT, '/billing'),
  statements: path(ROOTS_ACCOUNT, '/statements'),
  referral: path(ROOTS_ACCOUNT, '/referral'),
  api: path(ROOTS_ACCOUNT, '/api-keys'),
  logs: path(ROOTS_ACCOUNT, '/logs'),
};

export const PATH_DOCS = {
  help: 'https://github.com/design-sparx/antd-multipurpose-dashboard/blob/main/README.md',
  components: 'https://6546507b657a74164abf2db6-oniqlpqtfs.chromatic.com/',
  productRoadmap:
    'https://kelvink96.notion.site/1af2c000eb4f4b1688684cb2d88d5ee4?v=eb14f3050b7d4357821dbcb4bb61b636&p=752cacbf390f4d1cbc0e625550391d9b&pm=s',
};

export const PATH_GITHUB = {
  org: 'https://github.com/design-sparx',
  personal: 'https://github.com/kelvink96',
  repo: 'https://github.com/design-sparx/antd-multipurpose-dashboard',
};

export const PATH_LANDING = {
  root: ROOTS_LANDING,
  why: '/why-us',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

export const PATH_ABOUT = {
  root: ROOTS_ABOUT,
};

export const PATH_SITEMAP = {
  root: ROOTS_SITEMAP,
};

export const PATH_SOCIAL = {
  root: ROOTS_SOCIAL,
  feed: path(ROOTS_SOCIAL, '/feed'),
  activity: path(ROOTS_SOCIAL, '/activity'),
  followers: path(ROOTS_SOCIAL, '/followers'),
  settings: path(ROOTS_SOCIAL, '/settings'),
};

export const PATH_BLOG = {
  root: ROOTS_BLOG,
  details: (id) => path(ROOTS_BLOG, `/view/${id}`),
};

export const PATH_CAREERS = {
  root: ROOTS_CAREERS,
  new: path(ROOTS_CAREERS, `/new`),
};
