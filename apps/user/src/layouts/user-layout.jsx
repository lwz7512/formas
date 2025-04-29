import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  Col,
  ConfigProvider,
  Descriptions,
  Image,
  Row,
  Tabs,
  Typography,
} from 'antd';

import { useStylesContext } from '@/context';
import { Card } from '@/components';
import { PATH_USER_PROFILE } from '@/constants';

import { AppLayout } from './app-layout';

const { Link } = Typography;

import './styles.css';

// DescriptionsProps['items']
const DESCRIPTION_ITEMS = [
  {
    key: 'full-name',
    label: 'Name',
    children: <span>Kelvin Kiptum Kiprop</span>,
  },
  {
    key: 'job-title',
    label: 'Job title',
    children: <span>Software Engineer</span>,
  },
  {
    key: 'email',
    label: 'Email',
    children: (
      <Link href="mailto:kelvin.kiprop96@gmail.com">
        kelvin.kiprop96@gmail.com
      </Link>
    ),
  },
  {
    key: 'telephone',
    label: 'Phone',
    children: <Link href="tel:+254706094433">+254 706 094 4433</Link>,
  },
  {
    key: 'github',
    label: 'Github',
    children: (
      <Link href="https://github.com/kelvink96" target="_blank">
        kelvink96
      </Link>
    ),
  },
  {
    key: 'twitter',
    label: 'Twitter',
    children: (
      <Link href="https://twitter.com/kelvink_96" target="_blank">
        @kelvink_96
      </Link>
    ),
  },
];
// TabsProps['items']
const TAB_ITEMS = PATH_USER_PROFILE.map(u => ({
  key: u.title,
  label: u.title,
}));

export const UserAccountLayout = () => {
  const navigate = useNavigate();
  const stylesContext = useStylesContext();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(TAB_ITEMS[0].key);

  const onChange = key => {
    navigate(key);
  };

  useEffect(() => {
    // console.log(location);
    const k = TAB_ITEMS.find(d => location.pathname.includes(d.key))?.key || '';

    // console.log(k);
    setActiveKey(k);
  }, [location]);

  return (
    <>
      <AppLayout>
        <Card
          className="user-profile-card-nav card"
          actions={[
            <ConfigProvider
              key="tabs"
              theme={{
                components: {
                  Tabs: {
                    colorBorderSecondary: 'none',
                  },
                },
              }}
            >
              <Tabs
                defaultActiveKey={activeKey}
                activeKey={activeKey}
                items={TAB_ITEMS}
                onChange={onChange}
                style={{ textTransform: 'capitalize' }}
              />
            </ConfigProvider>,
          ]}
        >
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} sm={8} lg={4}>
              <Image
                src="/me.jpg"
                alt="user profile image"
                height="100%"
                width="100%"
                style={{ borderRadius: 1 }}
              />
            </Col>
            <Col xs={24} sm={16} lg={20}>
              <Descriptions
                title="User Info"
                items={DESCRIPTION_ITEMS}
                column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              />
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: '1.5rem' }}>
          <Outlet />
        </div>
      </AppLayout>
    </>
  );
};
