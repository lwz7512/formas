import { Typography } from 'antd';
import { Link } from 'react-router-dom';

import { PATH_DASHBOARD } from '@/constants';

export const WelcomePage = () => {
  return (
    <div
      className="flex flex-col gap-6 justify-center items-center"
      style={{ height: '80vh' }}
    >
      <Typography.Title className="m-0">Welcome to Formas</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        Formas - a flexible low-code platform for lazy developers!
      </Typography.Text>
      <Link to={PATH_DASHBOARD.default}>
        {/* <Button type="primary" size="middle">
          Go to Homepage
        </Button> */}
      </Link>
    </div>
  );
};
