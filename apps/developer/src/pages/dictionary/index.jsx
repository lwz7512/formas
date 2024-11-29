import { Table, Typography } from 'antd';

import { dataSource, columns } from './columns';
import { NewDictionaryForm } from './forms';

/**
 * Dictionary Config Page
 * @returns
 */
export const DictionaryManager = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex flex-col gap-6 " style={{ height: '80vh' }}>
      <Typography.Title className="m-0 text-center">
        Dictionary Config
      </Typography.Title>
      <NewDictionaryForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      <Table dataSource={dataSource} columns={columns} size="small" />;
    </div>
  );
};
