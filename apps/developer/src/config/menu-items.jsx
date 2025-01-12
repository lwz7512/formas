// import { Link } from 'react-router-dom';

import {
  AppstoreOutlined,
  BranchesOutlined,
  ClusterOutlined,
  FormOutlined,
  // InfoCircleOutlined,
  // PieChartOutlined,
  // SettingOutlined,
} from '@ant-design/icons';

import { DICTIONARY_PATH, BIZTREE_PATH, FORM_DEFINE_PATH } from '@/constants';

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
    label: 'Dictionary',
    key: DICTIONARY_PATH,
    icon: <BranchesOutlined />,
  },
  {
    label: 'BizTree',
    key: BIZTREE_PATH,
    icon: <ClusterOutlined />,
  },
  {
    label: 'App Define',
    key: FORM_DEFINE_PATH,
    icon: <FormOutlined />,
  },
];
