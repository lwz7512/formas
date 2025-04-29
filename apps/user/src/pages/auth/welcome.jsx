import { Typography } from 'antd';
// import { Link } from 'react-router-dom';

// import { PATH_DASHBOARD } from '@/constants';

export const WelcomePage = () => {
  return (
    <div
      className="flex flex-col gap-6 justify-center items-center"
      style={{ height: '80vh' }}
    >
      <Typography.Title className="m-0">Welcome to Formas</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        Formas - A highly flexible App Builder for lazy developers!
      </Typography.Text>
    </div>
  );
};
