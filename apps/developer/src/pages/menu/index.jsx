import clsx from 'clsx';

import {
  // App,
  Flex,
  Typography,
  Button,
  List,
  Divider,
  Tree,
  Dropdown,
  Space,
} from 'antd';

import {
  MoreOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { userMenuOperationItems } from '@/config';

import { AddRootMenuModal } from './modals/create-root-menu';
import { AddChildMenuModal } from './modals/create-child-menu';
import { useUserMenu } from './hooks/use-user-menu';

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
  const {
    menuList,
    rootMenuObject,
    isRootMenuModalOpen,
    isChildMenuModalOpen,
    childMenuObject,
    treeSelectData,
    showRootMenuModal,
    closeRootMenuModal,
    closeChildMenuModal,
    handleRootMenuCreation,
    handleMenuObjectChange,
    onRootMenuOperationClick,
    rootMenuItemClickHandler,
    handleChildMenuCreation,
    handleChildMenuObjectChange,
  } = useUserMenu();

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
              dataSource={menuList}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  className={clsx('select-none flex justify-between')}
                  onClick={() => rootMenuItemClickHandler(item)}
                >
                  <Space>
                    <Typography.Text>{item.title}</Typography.Text>
                  </Space>
                  <Dropdown
                    menu={{
                      items: userMenuOperationItems,
                      onClick: event => {
                        onRootMenuOperationClick(event, item.id);
                      },
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
            {/* ==== sub-menu tree ==== */}
            <Tree
              blockNode
              showLine={{
                showLeafIcon: true,
              }}
              showIcon={false}
              onSelect={() => null}
              treeData={treeSelectData}
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
                        onClick={() => null}
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
          </Flex>
        </Flex>
      </Flex>
      {/* ==== add new menu modal ==== */}
      <AddRootMenuModal
        rootMenuObject={rootMenuObject}
        isRootModalOpen={isRootMenuModalOpen}
        handleRootModalClose={closeRootMenuModal}
        handleRootCreation={handleRootMenuCreation}
        handleMenuObjectChange={handleMenuObjectChange}
      />
      {/* ==== add new menu modal ==== */}
      <AddChildMenuModal
        childMenuObject={childMenuObject}
        isChildMenuOpen={isChildMenuModalOpen}
        handleChildMenuCreation={handleChildMenuCreation}
        handleChildModalClose={closeChildMenuModal}
        handleMenuObjectChange={handleChildMenuObjectChange}
      />
    </>
  );
};
