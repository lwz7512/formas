export const SERVICE_GATE_API = 'http://localhost:8800';
/**
 * Node Name: 业务系统
 */
export const ROOT_BIZ_TREE_ID = '57dc25ba6f5511ee977638c9860954df';
export const ROOT_BIZ_TREE_NAME = '业务系统';

// user session valid time in days
export const USER_SESSION_VALID_TIME = 3;

export const MODAL_NAMES = {
  NEW_ROOT: 'add_root_node',
  NEW_CHILD: 'add_child_node',
};

export const bizNodeMenuitems = [
  {
    label: 'Add child node',
    key: 'add_child_node',
  },
  {
    label: 'Rename root node',
    key: 'rename_root_node',
  },
  {
    label: 'Delete root node',
    key: 'delete_root_node',
  },
];

export const userMenuOperationItems = [
  {
    label: 'Add Menu node',
    key: 'add_menu_node',
  },
  {
    label: 'Rename Menu node',
    key: 'rename_menu_node',
  },
  {
    label: 'Delete Menu node',
    key: 'delete_menu_node',
  },
];
