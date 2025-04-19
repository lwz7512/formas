// hooks/use-child-node-list.js
import { useState, useEffect } from 'react';
import { fetchBiztreeChildNodes } from '@/api/biztree'; // 假设你有这个API

export const useChildNodeList = (rootNodeId, message) => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChildNodes = async (id) => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await fetchBiztreeChildNodes(id);
      setTreeData(response.datas);
    } catch (error) {
      message.error('获取子节点失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 当根节点变化时重新获取数据
  useEffect(() => {
    fetchChildNodes(rootNodeId);
  }, [rootNodeId]);

  const refresh = () => {
    fetchChildNodes(rootNodeId);
  };

  return {
    treeData,
    loading,
    refresh,
  };
};
