import { Flex, Typography, Button, List, Divider, Tree } from 'antd';

// import { listData } from './list-data';
import { treeData } from './tree-data';

import { useBizTreeRoots } from '@/hooks/api-biztree';

/**
 * Business Tree Configuaration
 * @date 2024/12/07
 */
export const BizTreeConfigPage = () => {
  const { list } = useBizTreeRoots();
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
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
            <Button className="mb-4" type="primary">
              Add Custom Node
            </Button>
            <List
              header={<div>Start of system nodes:</div>}
              footer={<div>End of system nodes</div>}
              bordered
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <Typography.Text mark></Typography.Text> {item.title}
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
  );
};
