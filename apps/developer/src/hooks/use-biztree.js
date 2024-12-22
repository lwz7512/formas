import { useState } from 'react';

import { useBizTreeRootCreate } from './api-biztree';

export const useBizTreeState = (rootNodesRefresh, onRootNodeSuccess) => {
  const [currentRoot, setCurrentRoot] = useState('');
  const [isRootModalOpen, setIsRootModalOpen] = useState(false);

  const { doRootNodeAdd } = useBizTreeRootCreate(onRootNodeSuccess);

  const [newRootNode, setNewRootNode] = useState({
    title: '',
    description: '',
  });

  const itemClickHandler = item => {
    setCurrentRoot(item.id);
  };

  const showRootModal = () => {
    setIsRootModalOpen(true);
  };

  /**
   * Add New Node
   */
  const handleRootCreation = async () => {
    setIsRootModalOpen(false);
    const { title, description } = newRootNode;
    await doRootNodeAdd(title, description);
    if (rootNodesRefresh) rootNodesRefresh();
  };

  const handleRootModalClose = () => {
    setIsRootModalOpen(false);
  };

  /**
   * Update new root node input
   * @param {string} field new root node field: title | description
   * @param {*} value input value
   */
  const handleNewRootNodeChange = (field, value) => {
    setNewRootNode({ ...newRootNode, [field]: value });
  };

  return {
    currentRoot,
    isRootModalOpen,
    newRootNode,
    itemClickHandler,
    showRootModal,
    handleRootCreation,
    handleRootModalClose,
    handleNewRootNodeChange,
  };
};
