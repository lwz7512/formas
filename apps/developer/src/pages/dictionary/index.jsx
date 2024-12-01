import { Typography } from 'antd';

import { NewDictionaryForm } from './forms';
import { EdiTable } from './editable';

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
    <div className="flex flex-col gap-6 " style={{ minHeight: '100vh' }}>
      <Typography.Title className="m-0 text-center">
        Dictionary Config
      </Typography.Title>
      <NewDictionaryForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      {/* <Table dataSource={dataSource} columns={columns} size="small" />; */}
      <EdiTable />
    </div>
  );
};
