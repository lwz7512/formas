import clsx from 'clsx';
import {
  Flex,
  Typography,
  Button,
  Input,
  List,
  Divider,
  Tree,
  Modal,
  message,
} from 'antd';

import { treeData } from './tree-data';

import { useBizTreeRoots } from '@/hooks/api-biztree';
import { useBizTreeState } from '@/hooks/use-biztree';

const { TextArea } = Input;

/**
 * Business Tree Configuaration
 * @date 2024/12/07
 */
export const BizTreeConfigPage = () => {
  const { list, refresh } = useBizTreeRoots();

  const onRootNodeSuccess = () => {
    message.success('New Root Node Added to system!');
  };
  const {
    currentRoot,
    isRootModalOpen,
    newRootNode,
    showRootModal,
    itemClickHandler,
    handleRootCreation,
    handleRootModalClose,
    handleNewRootNodeChange,
  } = useBizTreeState(refresh, onRootNodeSuccess);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onRootNodeNameChange = event => {
    handleNewRootNodeChange('title', event.target.value);
  };

  const onRootNodeDescChange = event => {
    handleNewRootNodeChange('description', event.target.value);
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
                      'select-none',
                      currentRoot == item.id ? 'bg-blue-100' : ''
                    )}
                    onClick={() => itemClickHandler(item)}
                  >
                    <Typography.Text></Typography.Text> {item.title}
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
                showLine={{
                  showLeafIcon: true,
                }}
                showIcon={false}
                onSelect={onSelect}
                treeData={treeData}
              />
            </div>
          </Flex>
        </Flex>
      </Flex>
      {/* === Add root node modal === */}
      <Modal
        title="Add Root Node"
        width={350}
        open={isRootModalOpen}
        onOk={handleRootCreation}
        onCancel={handleRootModalClose}
      >
        <h2>Node Name:</h2>
        <Input
          placeholder="New Node label"
          className=" mb-2"
          value={newRootNode.title}
          onChange={onRootNodeNameChange}
        />
        <h2>Node Description(optional)</h2>
        <TextArea
          placeholder="New Node description"
          autoSize={{
            minRows: 2,
            maxRows: 6,
          }}
          value={newRootNode.description}
          onChange={onRootNodeDescChange}
        />
      </Modal>
    </>
  );
};
