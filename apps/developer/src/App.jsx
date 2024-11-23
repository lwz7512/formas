import React from 'react';
import { Button, Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const App = () => (
  <div className="App">
    <Title level={2}>Formas - developer portal</Title>
    <Button type="primary">Lets Go!</Button>
    <h1 className="text-3xl font-bold underline">Hello Formas Developers!</h1>
  </div>
);

export default App;
