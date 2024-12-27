import clsx from 'clsx';
import {
  App,
  Flex,
  Typography,
  Button,
  List,
  Divider,
  Tree,
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
  const { message } = App.useApp();
  const { list, refresh } = useBizTreeRoots();

  const onRootNodeSuccess = () => {
    message.success('New Root Node Added to system!');
  };

  const onChildNodeSuccess = () => {
    message.success('A child node added to selected node!');
  };

  const {
    /** root node object */
    currentRoot,
    isRootModalOpen,
    /** child node object */
    newChildNode,
    isChildNodeModalOpen,
    newRootNode,
    subTreeStruc,
    showRootModal,
    showChildModal,
    onRootNodeMenuClick,
    closeCurrentModal,
    rootItemClickHandler,
    handleRootCreation,
    handleChildCreation,
    onTreeNodeSelect,
    onRootNodeNameChange,
    onRootNodeDescChange,
    onChildNodeNameChange,
    onChildNodeDescChange,
  } = useBizTreeState(refresh, onRootNodeSuccess, onChildNodeSuccess);

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
                      currentRoot.id == item.id ? 'bg-blue-100' : ''
                    )}
                    onClick={() => rootItemClickHandler(item)}
                  >
                    <Space>
                      <Typography.Text>{item.title}</Typography.Text>
                    </Space>
                    <Dropdown
                      menu={{
                        items: rootNodeMenuitems,
                        onClick: event => onRootNodeMenuClick(event, item.id),
                      }}
                      trigger={['click']}
                      placement="bottomRight"
                    >
                      <a
                        onClick={e => {
                          e.preventDefault();
                          // NOTE: prevent click event propagate to parent item
                          e.stopPropagation();
                        }}
                        className="hover:bg-white"
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
                titleRender={nodeData => {
                  // console.log(`>>> node data:`);
                  // console.log(nodeData);
                  return (
                    <>
                      <span className="inline-block">{nodeData.title}</span>
                      <span
                        className={clsx(
                          'opacity-10 hover:opacity-100',
                          nodeData.depth > 0 ? 'inline-block' : 'hidden'
                        )}
                      >
                        <button
                          type="button"
                          className="px-2 hover:bg-blue-200 mr-2"
                          onClick={showChildModal}
                        >
                          <PlusOutlined className="text-base" />
                        </button>
                        <button
                          type="button"
                          className="px-2 hover:bg-blue-200 mr-2"
                        >
                          <EditOutlined className="text-base " />
                        </button>
                        <button
                          type="button"
                          className="px-2 hover:bg-blue-200 mr-2"
                        >
                          <DeleteOutlined className="text-base " />
                        </button>
                      </span>
                    </>
                  );
                }}
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
      {/* === Add Child Node of parent node === */}
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
