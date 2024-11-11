import { Card as AntdCard } from 'antd';
// import { ReactNode } from 'react';

import './styles.css';

// type Props = { children: ReactNode } & CardProps;
// : Props
export const Card = ({ children, ...others }) => {
  return (
    <AntdCard className="card" {...others}>
      {children}
    </AntdCard>
  );
};
