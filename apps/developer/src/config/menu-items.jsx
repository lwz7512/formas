// import { Link } from 'react-router-dom';

import {
  AppstoreOutlined,
  BranchesOutlined,
  ClusterOutlined,
  // InfoCircleOutlined,
  // PieChartOutlined,
  // SettingOutlined,
} from '@ant-design/icons';

import { DICTIONARY_PATH, BIZTREE_PATH } from '@/constants';

/**
 * menu data from dashboard demos
 */
export const devloperMenuItems = [
  {
    label: 'Default Page',
    key: '/auth/welcome',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Dictionary Config',
    key: DICTIONARY_PATH,
    icon: <BranchesOutlined />,
  },
  {
    label: 'BizTree Config',
    key: BIZTREE_PATH,
    icon: <ClusterOutlined />,
  },
];
