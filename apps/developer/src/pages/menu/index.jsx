import clsx from 'clsx';

import {
  // App,
  Flex,
  Typography,
  Button,
  List,
  Divider,
  // Tree,
  Dropdown,
  Space,
} from 'antd';

import { MoreOutlined } from '@ant-design/icons';

import { userMenuOperationItems } from '@/config';

import { AddRootMenuModal } from './modals';
import { useUserMenu } from '@/hooks/use-user-menu';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

/**
 * Menu Manage Page
 * @date 2025/04/08
 * @returns
 */
export const MenuManagePage = () => {
  const { isRootMenuModalOpen, showRootMenuModal, closeRootMenuModal } =
    useUserMenu();

  return (
    <>
      <Flex vertical gap="middle" style={{ minHeight: '100vh' }}>
        <Typography.Title className="m-0 text-center">
          User Menu Tree Management
        </Typography.Title>
        {/* left-main-nodes definition | right-sub-nodes definition */}
        <Flex gap="middle" justify="space-between">
          {/* left-main-nodes definition */}
          <Flex className="left_part" vertical flex={1}>
            <Divider
              orientation="left"
              style={{
                borderColor: '#7cb305',
              }}
            >
              Root Menu Creation:
            </Divider>
            {/* == put button inside of div to limit its width */}
            <div className="row-1 mb-4">
              <Button
                className="mb-4"
                type="primary"
                onClick={showRootMenuModal}
              >
                Add Root Menu
              </Button>
            </div>
            <List
              header={<div>Header</div>}
              bordered
              dataSource={data}
              renderItem={item => (
                <List.Item
                  className={clsx('select-none flex justify-between')}
                  onClick={() => null}
                >
                  <Space>
                    <Typography.Text>{item}</Typography.Text>
                  </Space>
                  <Dropdown
                    menu={{
                      items: userMenuOperationItems,
                      onClick: event => null,
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
          </Flex>
          {/* right-sub-nodes definition */}
          <Flex className="right_part" vertical flex={1}>
            <Divider
              orientation="left"
              style={{
                borderColor: '#7cb305',
              }}
            >
              Sub Menu Tree Creation:
            </Divider>
          </Flex>
        </Flex>
      </Flex>
      {/* add new menu modal */}
      <AddRootMenuModal
        isRootModalOpen={isRootMenuModalOpen}
        handleRootModalClose={closeRootMenuModal}
      />
    </>
  );
};
