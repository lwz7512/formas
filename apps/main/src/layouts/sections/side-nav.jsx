import React, { useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu } from 'antd';

import { Logo } from '@/components';
import { useNavigate } from 'react-router-dom';

import {
  COLOR,
  PATH_LANDING,
} from '@/constants';

import { mockTreeItems } from '@/config/menu-items';

const { Sider } = Layout;


// type SideNavProps = SiderProps;

const SideNav = ({ ...others }) => {
  const nodeRef = useRef(null);
  // const { pathname } = useLocation();
  const navigate = useNavigate();
  // save current menum item
  const [current, setCurrent] = useState('default');

  /**
   * Not working for `Link`
   * click handler: MenuProps['onClick']
   * @param {Event} e 
   */
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };


  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="blue"
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: '1rem 0' }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: COLOR['100'],
              itemHoverBg: COLOR['50'],
              itemSelectedColor: COLOR['600'],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={mockTreeItems}
          onClick={onClick}
          selectedKeys={[current]}
          defaultOpenKeys={['demos']}
          style={{ border: 'none' }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
