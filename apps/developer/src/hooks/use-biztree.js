import { useState } from 'react';

import { MODAL_NAMES as MDL } from '@/config';

import { useBizTreeRootCreate, useBizTreeQuery } from './api-biztree';

export const useBizTreeState = (
  rootNodesRefresh,
  onRootNodeSuccess,
  onChildNodeSuccess
) => {
  // API interactions
  const { doRootNodeAdd, doChildNodeAdd } = useBizTreeRootCreate(
    onRootNodeSuccess,
    onChildNodeSuccess
  );

  // sub - tree - loading
  const { loadTreeBy, subTreeStruc } = useBizTreeQuery();

  // tree node interations
  const [currentRoot, setCurrentRoot] = useState({}); // object
  // modal open|close state switching
  const [currentModalName, setCurrentModalName] = useState('');
  const [newRootNode, setNewRootNode] = useState({
    title: '',
    description: '',
  });
  const [newChildNode, setNewChildNode] = useState({
    pid: '', // to set by node select
    title: '',
    description: '',
  });

  // == root node item click handler ==
  const rootItemClickHandler = item => {
    // save root object
    setCurrentRoot(item);
    // save `parent id` as root node selected
    setNewChildNode({ ...newChildNode, pid: item.id });
    // load tree
    loadTreeBy(item.id, item.title);
  };

  const closeCurrentModal = () => {
    setCurrentModalName('');
  };

  const showRootModal = () => {
    setCurrentModalName(MDL.NEW_ROOT);
  };

  const showChildModal = () => {
    setCurrentModalName(MDL.NEW_CHILD);
  };

  /**
   * handle root node menu click
   * @param {object} event drop down item click event
   * @param {*} rootId root id from item
   */
  const onRootNodeMenuClick = (event, rootId) => {
    // save `parent id` as drop-down menu item selected
    setNewChildNode({ ...newChildNode, pid: rootId });

    if (event.key == 'add_child_node') {
      showChildModal();
    }
    // TODO: 'rename_root_node'

    // TODO: 'delete_root_node'
  };

  /**
   * Sub tree node select handler
   * exclude root-node of the sub-tree
   * @param {array} selectedKeys
   * @param {object} info
   */
  const onTreeNodeSelect = (selectedKeys, { node }) => {
    if (!node.depth) return; // root node
    // console.log(node);
    const [pid] = selectedKeys;
    // console.log(`>>> node clicked: ${nodeId}`);
    // remember selected parent node
    setNewChildNode({ ...newChildNode, pid });
  };

  /**
   * Add Root Node to backend
   */
  const handleRootCreation = async () => {
    closeCurrentModal();
    const { title, description } = newRootNode;
    await doRootNodeAdd(title, description);
    if (rootNodesRefresh) rootNodesRefresh();
  };

  /**
   * Add First Level Child Node to root
   * need to select root id: `pid`
   */
  const handleChildCreation = async () => {
    closeCurrentModal();
    const { title, description, pid } = newChildNode;
    if (!pid) return console.warn(`## no parent node to create child node!`);
    if (!title) return console.warn(`## no title field for child node!`);
    // save new child
    await doChildNodeAdd(pid, title, description || '...');
    console.log(`>>> refresh tree by: ${currentRoot.id}`);
    // refresh tree by root id
    loadTreeBy(currentRoot.id, currentRoot.title);
  };

  /**
   * Update new root node input
   * @param {string} field new root node field: title | description
   * @param {string} value input value
   */
  const handleRootNodeChange = (field, value) => {
    setNewRootNode({ ...newRootNode, [field]: value });
  };

  /**
   * Update child node input
   * @param {string} field
   * @param {*} value
   */
  const handleChildNodeChange = (field, value) => {
    setNewChildNode({ ...newChildNode, [field]: value });
  };

  const onRootNodeNameChange = event => {
    handleRootNodeChange('title', event.target.value);
  };

  const onRootNodeDescChange = event => {
    handleRootNodeChange('description', event.target.value);
  };

  const onChildNodeNameChange = event => {
    handleChildNodeChange('title', event.target.value);
  };

  const onChildNodeDescChange = event => {
    handleChildNodeChange('description', event.target.value);
  };

  return {
    currentRoot,
    isRootModalOpen: currentModalName == MDL.NEW_ROOT,
    isChildNodeModalOpen: currentModalName == MDL.NEW_CHILD,
    newRootNode,
    newChildNode,
    subTreeStruc,
    rootItemClickHandler,
    showRootModal,
    showChildModal,
    closeCurrentModal,
    handleRootCreation,
    onTreeNodeSelect,
    onRootNodeNameChange,
    onRootNodeDescChange,
    onChildNodeNameChange,
    onChildNodeDescChange,
    onRootNodeMenuClick,
    handleChildCreation,
  };
};
