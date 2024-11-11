import { Link } from 'react-router-dom';

import {
  BranchesOutlined,
  InfoCircleOutlined,
  PieChartOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { PATH_ABOUT, PATH_SITEMAP } from '@/constants';

/**
 * Compose an item
 * @param {React.ReactNode} label
 * @param {React.Key} key
 * @param {React.ReactNode | undefined} icon
 * @param {MenuItem[] | undefined} children
 * @param {string} type
 * @returns {MenuItem}
 */
const getItem = (label, key, icon = null, children, type = 'group') => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

/**
 * menu data from dashboard demos
 */
export const mockTreeItems = [
  {
    label: 'Default Page',
    key: '/demos/default',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Form Designer',
    key: '/designer',
    icon: <BranchesOutlined />,
  },
  {
    label: 'Demos - Group',
    key: 'demos',
    icon: <SettingOutlined />,
    children: [
      { label: 'Form Sum', key: '/demos/demo1' },
      { label: 'Form Select Cascade', key: '/demos/demo2' },
      { label: 'Form Watch', key: '/demos/demo3' },
      { label: 'Dyna load script', key: '/demos/demo4' },
      { label: 'Dyna script from DB', key: '/demos/demo5' },
      { label: 'Demo 06:', key: '/demos/demo6' },
      { label: 'Demo 07:', key: '/demos/demo7' },
      { label: 'Demo 08:', key: '/demos/demo8' },
      { label: 'Two dates validation:', key: '/demos/demo9' },
      { label: '#10: Tree select', key: '/demos/demo10' },
      { label: '自定义校验:', key: '/demos/demo11' },
      { label: 'Table Demo', key: '/demos/demo12' },
      { label: 'Chart Demo', key: '/demos/demo13' },
      { label: 'Logic Flow', key: '/demos/demo14' },
    ],
  },
];

/**
 * @deprecated NOT IN USE ANYMORE!
 * type MenuItem = Required<MenuProps>['items'][number];
 * @type {MenuItem[]}
 */
const items = [
  getItem('Demos', 'demos', <PieChartOutlined />, [
    getItem('Default', 'default', null),
    getItem('Form Sum', 'demo1'),
    getItem('Form Select Cascade', 'demo2'),
    getItem('Form Watch', 'demo3'),
    getItem('Dyna load script', 'demo4'),
    getItem('Dyna script from DB', 'demo5'),
    getItem('Demo 06:', 'demo6'),
    getItem('Demo 07:', 'demo7'),
    getItem('Demo 08:', 'demo8'),
    getItem('Demo 09:', 'demo9'),
    getItem('自定义控件:', 'demo10'),
    getItem('自定义校验:', 'demo11'),
    getItem('Demo 12:', 'demo12'),
  ]),
  getItem(
    <Link to={PATH_ABOUT.root}>About</Link>,
    'about',
    <InfoCircleOutlined />
  ),
  getItem(
    <Link to={PATH_SITEMAP.root}>Sitemap</Link>,
    'sitemap',
    <BranchesOutlined />
  ),
];
