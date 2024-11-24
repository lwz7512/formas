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
];
