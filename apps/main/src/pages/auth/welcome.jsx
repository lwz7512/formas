import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import { Logo } from '@/components';
import { PATH_DASHBOARD } from '@/constants';

export const WelcomePage = () => {
  return (
    <div
      className="flex flex-col gap-6 justify-center items-center"
      style={{ height: '80vh' }}
    >
      <Typography.Title className="m-0">Welcome to Antd</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        A dynamic and versatile multipurpose dashboard utilizing Ant Design,
        React, TypeScript, and Vite.
      </Typography.Text>
      <Link to={PATH_DASHBOARD.default}>
        {/* <Button type="primary" size="middle">
          Go to Homepage
        </Button> */}
      </Link>
    </div>
  );
};
