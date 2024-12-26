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
  const [currentRoot, setCurrentRoot] = useState('');
  // modal open|close state
  const [currentModalName, setCurrentModalName] = useState('');

  const [newRootNode, setNewRootNode] = useState({
    title: '',
    description: '',
  });

  const [newChildNode, setNewChildNode] = useState({
    pid: '', // ??
    title: '',
    description: '',
  });

  // == root node item click handler ==
  const itemClickHandler = item => {
    // save root id
    setCurrentRoot(item.id);
    // save parent id by root id
    setNewRootNode({ ...newRootNode, pid: item.id });
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

  // TODO: popup more modals....
  const onRootNodeMenuClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    if (key == 'add_child_node') {
      showChildModal();
    }
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
   * Add Child Node to backend
   * need to select root id: `pid`
   */
  const handleChildCreation = async () => {
    closeCurrentModal();
    console.log(newChildNode);
    const { title, description } = newChildNode;
    console.log(`>>>> currentRoot: ${currentRoot}`);
    if (!currentRoot) return console.warn(`## no root node!`);

    await doChildNodeAdd(currentRoot, title, description);
    // TODO: refresh one tree root?
    // if (rootNodesRefresh) rootNodesRefresh();
  };

  /**
   * Update new root node input
   * @param {string} field new root node field: title | description
   * @param {string} value input value
   */
  const handleNewRootNodeChange = (field, value) => {
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
    handleNewRootNodeChange('title', event.target.value);
  };

  const onRootNodeDescChange = event => {
    handleNewRootNodeChange('description', event.target.value);
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
    itemClickHandler,
    showRootModal,
    showChildModal,
    closeCurrentModal,
    handleRootCreation,
    onRootNodeNameChange,
    onRootNodeDescChange,
    onChildNodeNameChange,
    onChildNodeDescChange,
    onRootNodeMenuClick,
    handleChildCreation,
  };
};
