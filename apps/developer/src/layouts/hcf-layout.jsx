import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { App, Breadcrumb, Layout, Menu } from 'antd';

import { devloperMenuItems } from '@/config/menu-items';

import './styles.css';

const { Header, Content, Footer } = Layout;

/**
 * == Header-Content-Footer structure ==
 */
export const HCFLayout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [, path_1, path_2] = pathname.split('/');

  // save current menum item
  const [current, setCurrent] = useState('');

  // select the menu if user refreshed
  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  /**
   * Not working for `Link`
   * click handler: MenuProps['onClick']
   * @param {Event} e
   */
  const onMenuItemClick = e => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <App>
      <Layout className="layout">
        <Header>
          <div className="logo">Formas Lowcode</div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[current]}
            items={devloperMenuItems}
            onClick={onMenuItemClick}
          />
        </Header>
        <Content
          style={{
            padding: '0 50px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
            items={[
              {
                title: 'Home',
              },
              {
                title: path_1,
              },
              {
                title: path_2,
              },
            ]}
          />
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </App>
  );
};
