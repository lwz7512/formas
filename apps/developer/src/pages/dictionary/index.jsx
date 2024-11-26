import { Typography } from 'antd';
// import { Link } from 'react-router-dom';

// import { PATH_DASHBOARD } from '@/constants';

/**
 * Dictionary Config Page
 * @returns
 */
export const DictionaryManager = () => {
  return (
    <div className="flex flex-col gap-6 " style={{ height: '80vh' }}>
      <Typography.Title className="m-0">Dictionary Config</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        Formas - a flexible low-code platform for lazy developers!
      </Typography.Text>
    </div>
  );
};
