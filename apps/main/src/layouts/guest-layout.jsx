import {
  Button,
  Drawer,
  // Flex,
  // FloatButton,
  Layout,
  // theme,
  Tooltip,
} from 'antd';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  AppstoreAddOutlined,
  GithubOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

import { Logo, NProgress } from '@/components';
import {
  DEMO_PATHS,
  PATH_DASHBOARD,
  PATH_DOCS,
  PATH_GITHUB,
  PATH_LANDING,
} from '@/constants';

const { Header, Content, Footer } = Layout;

export const GuestLayout = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const nodeRef = useRef(null);
  const [navFill, setNavFill] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Layout
        className="layout"
        style={{
          minHeight: '100vh',
          // backgroundColor: 'white',
        }}
      >
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            // background: navFill ? 'rgba(255, 255, 255, .5)' : 'none',
            backdropFilter: navFill ? 'blur(8px)' : 'none',
            boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
            gap: 12,
            position: 'sticky',
            top: 0,
            padding: isMobile ? '0 1rem' : '0 2rem',
            zIndex: 1,
          }}
        >
          <Logo color="white" asLink href={PATH_LANDING.root} />
          {!isMobile ? (
            <>
              <div className="flex gap-1">
                <Link to={PATH_LANDING.root}>
                  <Button
                    icon={<ProductOutlined />}
                    type="link"
                    color="default"
                    variant="solid"
                  >
                    Product Preview
                  </Button>
                </Link>
                <Link to={DEMO_PATHS.default}>
                  <Button
                    icon={<AppstoreAddOutlined />}
                    type="link"
                    color="default"
                    variant="solid"
                  >
                    Demos
                  </Button>
                </Link>
                {/* <Link to={PATH_GITHUB.repo} target="_blank">
                  <Button icon={<GithubOutlined />} type="link">
                    Give us a star
                  </Button>
                </Link> */}
                {/* <Link to={PATH_AUTH.signin}>
                  <Button icon={<LoginOutlined />} type="primary">
                    Live Preview
                  </Button>
                </Link> */}
              </div>
            </>
          ) : (
            <Tooltip title={`${open ? 'Expand' : 'Collapse'} Sidebar`}>
              <Button
                type="text"
                icon={open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={showDrawer}
                style={{
                  fontSize: '16px',
                  width: 48,
                  height: 48,
                }}
              />
            </Tooltip>
          )}
        </Header>
        <Content
          style={{
            // background: 'rgba(255, 255, 255, 1)',
            borderRadius: 1,
            transition: 'all .25s',
            paddingBottom: '10rem',
          }}
        >
          <TransitionGroup>
            <SwitchTransition>
              <CSSTransition
                key={`css-transition-${location.key}`}
                nodeRef={nodeRef}
                onEnter={() => {
                  setIsLoading(true);
                }}
                onEntered={() => {
                  setIsLoading(false);
                }}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                {() => (
                  <div
                    ref={nodeRef}
                    className="site-layout-content"
                    style={{ background: 'none' }}
                  >
                    <Outlet />
                  </div>
                )}
              </CSSTransition>
            </SwitchTransition>
          </TransitionGroup>
          {/* <FloatButton.BackTop /> */}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
          }}
        >
          AntD Dashboard &copy; {new Date().getFullYear()} Created by Design
          Sparx
        </Footer>
      </Layout>
      <Drawer title="Menu" placement="left" onClose={onClose} open={open}>
        <>
          <div className="flex gap-1 flex-col">
            <Link to={PATH_DOCS.productRoadmap} target="_blank">
              <Button icon={<ProductOutlined />} type="link">
                Roadmap
              </Button>
            </Link>
            <Link to={PATH_DASHBOARD.default}>
              <Button icon={<LoginOutlined />} type="text">
                Live Preview
              </Button>
            </Link>
            <Link to={PATH_DOCS.components} target="_blank">
              <Button icon={<AppstoreAddOutlined />} type="text">
                Components
              </Button>
            </Link>
            <Link to={PATH_GITHUB.repo} target="_blank">
              <Button icon={<GithubOutlined />} type="text">
                Github
              </Button>
            </Link>
          </div>
        </>
      </Drawer>
    </>
  );
};
