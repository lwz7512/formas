/**
 * user menu management
 * @date 2025/04/10
 */

import { useState } from 'react';

export const useUserMenu = () => {
  const [isRootMenuModalOpen, setIsRootMenuModalOpen] = useState(false);

  const showRootMenuModal = () => {
    setIsRootMenuModalOpen(true);
  };

  const closeRootMenuModal = () => {
    setIsRootMenuModalOpen(false);
  };

  return {
    isRootMenuModalOpen,
    showRootMenuModal,
    closeRootMenuModal,
  };
};
