import clsx from 'clsx';
import {
  Flex,
  Typography,
  Button,
  List,
  Divider,
  Tree,
  message,
  Dropdown,
  Space,
} from 'antd';

{
  /* <DeleteOutlined /> */
}
import {
  MoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { rootNodeMenuitems } from '@/config';
import { useBizTreeRoots } from '@/hooks/api-biztree';
import { useBizTreeState } from '@/hooks/use-biztree';

// import { treeData } from './tree-data';
import { AddRootNodeModal, AddChildNodeModal } from './modals';

/**
 * Business Tree Configuaration
 * @date 2024/12/07
 */
export const BizTreeConfigPage = () => {
  const { list, refresh } = useBizTreeRoots();

  const onRootNodeSuccess = () => {
    message.success('New Root Node Added to system!');
  };

  const onChildNodeSuccess = () => {
    message.success('A child node added to selected node!');
  };

  const {
    currentRoot,
    isRootModalOpen,
    isChildNodeModalOpen,
    newRootNode,
    newChildNode,
    subTreeStruc,
    showRootModal,
    onRootNodeMenuClick,
    closeCurrentModal,
    itemClickHandler,
    handleRootCreation,
    handleChildCreation,
    onRootNodeNameChange,
    onRootNodeDescChange,
    onChildNodeNameChange,
    onChildNodeDescChange,
  } = useBizTreeState(refresh, onRootNodeSuccess, onChildNodeSuccess);

  const onTreeNodeSelect = (selectedKeys, info) => {
    // console.log('selected', selectedKeys, info);
  };

  return (
    <>
      <Flex vertical gap="middle" style={{ minHeight: '100vh' }}>
        <Typography.Title className="m-0 text-center">
          BizTree Config
        </Typography.Title>
        {/* left-main-nodes definition | right-sub-nodes definition */}
        <Flex gap="middle" justify="space-between">
          <Flex className="left_part" vertical flex={1}>
            <div className="row-1 mb-4">
              <Divider
                orientation="left"
                style={{
                  borderColor: '#7cb305',
                }}
              >
                Root Node Creation:
              </Divider>
              <Button className="mb-4" type="primary" onClick={showRootModal}>
                Add Custom Node
              </Button>
              <List
                header={<div>Start of system nodes:</div>}
                footer={<div>End of system nodes</div>}
                bordered
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    className={clsx(
                      'select-none flex justify-between',
                      currentRoot == item.id ? 'bg-blue-100' : ''
                    )}
                    onClick={() => itemClickHandler(item)}
                  >
                    <Space>
                      <Typography.Text>{item.title}</Typography.Text>
                    </Space>
                    <Dropdown
                      menu={{
                        items: rootNodeMenuitems,
                        onClick: onRootNodeMenuClick,
                      }}
                      trigger={['click']}
                      placement="bottomRight"
                    >
                      <a
                        onClick={e => {
                          e.preventDefault();
                          // e.stopPropagation();
                        }}
                      >
                        <Space>
                          <MoreOutlined className=" text-2xl" />
                        </Space>
                      </a>
                    </Dropdown>
                  </List.Item>
                )}
              />
            </div>
          </Flex>
          <Flex className="right_part" vertical flex={1}>
            <div className="row-1 mb-4">
              <Divider
                orientation="left"
                style={{
                  borderColor: '#7cb305',
                }}
              >
                Tree Nodes Creation:
              </Divider>
              <Tree
                blockNode
                showLine={{
                  showLeafIcon: true,
                }}
                showIcon={false}
                onSelect={onTreeNodeSelect}
                treeData={subTreeStruc}
                titleRender={nodeData => (
                  <>
                    <span className="inline-block">{nodeData.title}</span>
                    <span className="inline-block opacity-10 hover:opacity-100">
                      <button type="button">
                        <PlusOutlined className="text-base mr-2" />
                      </button>
                      <button type="button">
                        <EditOutlined className="text-base mr-2" />
                      </button>
                      <button type="button">
                        <DeleteOutlined className="text-base mr-2" />
                      </button>
                    </span>
                  </>
                )}
              />
            </div>
          </Flex>
        </Flex>
      </Flex>
      {/* === Add root node modal === */}
      <AddRootNodeModal
        isRootModalOpen={isRootModalOpen}
        newRootNode={newRootNode}
        handleRootCreation={handleRootCreation}
        handleRootModalClose={closeCurrentModal}
        onRootNodeNameChange={onRootNodeNameChange}
        onRootNodeDescChange={onRootNodeDescChange}
      />
      {/* === Add Child Node === */}
      <AddChildNodeModal
        isChildNodeModalOpen={isChildNodeModalOpen}
        newChildNode={newChildNode}
        handleChildNodeCreation={handleChildCreation}
        onChildNodeNameChange={onChildNodeNameChange}
        onChildNodeDescChange={onChildNodeDescChange}
        handleChildNodeModalClose={closeCurrentModal}
      />
    </>
  );
};
