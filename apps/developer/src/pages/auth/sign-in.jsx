import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Typography,
} from 'antd';
import {
  FacebookFilled,
  GoogleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';

import { Logo } from '@/components';
import { PATH_AUTH, DEMO_PATHS } from '@/constants';

import { useLogin } from '@/hooks/api-auth';

const { Title, Text, Link } = Typography;

// type FieldType = {
//   email?: string;
//   password?: string;
//   remember?: boolean;
// };
export const SignInPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();

  // to get uername and password from `onFormChange`
  const [username, setUsername] = useState('dev');
  const [password, setPassword] = useState('123456');

  // == api hook can only be used in direct root of component!! ==
  // hard-coded for now:
  // @2024/11/17
  const { error, loading, send } = useLogin(username, password);

  // get realtime username & password
  const onFormChange = (_, allFields) => {
    const emailField = allFields[0];
    const pswdField = allFields[1];
    // const rembField = allFields[2];
    setUsername(emailField.value);
    setPassword(pswdField.value);
  };

  const onFinish = async () => {
    // console.log('sending:', values);
    const result = await send();
    // console.log(result);
    // got error!
    if (result.errCode > 200) {
      return message.error(result.errMsg);
    }
    // got exception
    if (error || !result) {
      return message.error('Ops, login failed!');
    }
    // to: /demos/default
    navigate(DEMO_PATHS.default, { replace: true });
    message.open({
      type: 'success',
      content: 'Login successful',
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden' }}>
      <Col xs={24} lg={12}>
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ background: '#1890ff', height: '100%', padding: '1rem' }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Welcome back to Formas Console
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            A flexible low-code platform for lazy developers
          </Text>
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div
          className="flex flex-col items-start justify-center gap-4"
          style={{ height: '100%', padding: '2rem' }}
        >
          <Title className="m-0">Login</Title>
          <div className="flex gap-4">
            <Text>Don&apos;t have an account?</Text>
            <Link href={PATH_AUTH.signup}>Create an account here</Link>
          </div>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              email: 'dev',
              password: '123456',
              remember: true,
            }}
            onFieldsChange={onFormChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item
                  label="User"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <div className="flex items-center justify-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Log In
                </Button>
                <Link href={PATH_AUTH.passwordReset}>Forgot password?</Link>
              </div>
            </Form.Item>
          </Form>
          <Divider className="m-0">or</Divider>
          <div className="flex flex-wrap " style={{ width: '100%' }}>
            <Button icon={<GoogleOutlined />}>Sign in with Google</Button>
            <Button icon={<FacebookFilled />}>Sign in with Facebook</Button>
            <Button icon={<TwitterOutlined />}>Sign in with Twitter</Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
