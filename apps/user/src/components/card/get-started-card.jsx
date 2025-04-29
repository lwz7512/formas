import { Button, Image, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
// import { Card } from '../../../index';
import { Card } from './card-base';

// type Props = CardProps;
// : Props
export const GetStartedCard = ({ ...others }) => {
  return (
    <Card {...others}>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-6 justify-start">
          <Typography.Title level={4} style={{ margin: 0 }}>
            You have <CountUp end={2} /> projects to finish this week
          </Typography.Title>
          <Typography.Text>
            You have already completed 68% of your monthly target. Keep going to
            achieve your goal.
          </Typography.Text>
          <Button type="primary" size="middle">
            Get started <RightOutlined />
          </Button>
        </div>
        <Image
          src="/get-started.png"
          height={180}
          preview={false}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </Card>
  );
};
