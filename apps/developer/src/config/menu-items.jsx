import {
  AppstoreOutlined,
  BranchesOutlined,
  ClusterOutlined,
  FormOutlined,
  DatabaseOutlined,
  MenuOutlined,
  // InfoCircleOutlined,
  // PieChartOutlined,
  // SettingOutlined,
} from '@ant-design/icons';

import {
  DICTIONARY_PATH,
  BIZTREE_PATH,
  FORM_DEFINE_PATH,
  EXTERNAL_DATA_SOURCE_PATH,
  MENU_MANAGE_PATH,
} from '@/constants';

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
    label: 'Data Source',
    key: EXTERNAL_DATA_SOURCE_PATH,
    icon: <DatabaseOutlined />,
  },
  {
    label: 'Menu Manage',
    key: MENU_MANAGE_PATH,
    icon: <MenuOutlined />,
  },
];
