import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { App, Breadcrumb, Layout, Menu } from 'antd';

import { devloperMenuItems } from '@/config/menu-items';
import {
  EXTERNAL_DATA_SOURCE_PATH as DSRoute,
  FORM_DEFINE_PATH as FMRoute,
} from '@/constants';

import './styles.css';

const { Header, Content, Footer } = Layout;

/**
 * == Header-Content-Footer structure ==
 */
export const HCFLayout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [, path_1, path_2, path_3] = pathname.split('/');
  const bcgen = title => ({ title });
  const dynaBreadcrumbs = path_3
    ? [bcgen(path_2), bcgen(path_3)]
    : [bcgen(path_2)];

  // save current menum item
  const [current, setCurrent] = useState('');

  // select the menu if user refreshed
  useEffect(() => {
    // keep the app define menu selected!
    const variantPath = pathname == DSRoute ? FMRoute : pathname;
    setCurrent(variantPath);
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
              ...dynaBreadcrumbs,
            ]}
          />
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Formas-Devtools ©2025 Created by Formas team
        </Footer>
      </Layout>
    </App>
  );
};
