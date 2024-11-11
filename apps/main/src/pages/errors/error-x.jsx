import { useRouteError } from 'react-router-dom';
import { Result, Typography } from 'antd';
import { BackBtn, RefreshBtn } from '@/components';

const { Paragraph, Text } = Typography;

export const ErrorPage = () => {
  // type Error = unknown | any;
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="error"
      title="Oops!"
      subTitle="Sorry, an unexpected error has occurred."
      extra={[<BackBtn type="primary" />, <RefreshBtn />]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The page you tried to open has the following error:
          </Text>
        </Paragraph>
        <Paragraph copyable>{error.statusText || error.message}</Paragraph>
      </div>
    </Result>
  );
};
