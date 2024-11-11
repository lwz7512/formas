import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

// type Props = {
//   icon?: boolean;
// } & ButtonProps;

export const RefreshBtn = ({ icon, ...others }) => {
  return (
    <Button
      icon={icon ? <SyncOutlined /> : null}
      onClick={() => window.location.reload()}
      {...others}
    >
      Refresh page
    </Button>
  );
};
