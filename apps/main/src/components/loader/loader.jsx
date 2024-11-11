import { Spin, theme } from 'antd';

import './styles.css';

export const Loader = () => {

  return (
    <div className="loader-container" style={{ borderRadius: 1 }}>
      <Spin tip="Loading">
        <div className="content" />
      </Spin>
    </div>
  );
};
