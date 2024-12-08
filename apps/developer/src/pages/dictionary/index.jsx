import { Typography, message } from 'antd';

import { EdiTable } from './editable';
import { NewDictionaryForm } from './forms';

import { createDictionaryItem, useDictionaryList } from '@/hooks';

/**
 * Dictionary Config Page
 * @returns
 */
export const DictionaryPage = () => {
  const { dicItems, memRefreshDictionaryItems } = useDictionaryList();

  const onItemCreate = async values => {
    // console.log('Save Dictionary:', values);
    await createDictionaryItem(values);
    message.success(`Dictionary item added!`);
    // refresh all dictionary ...
    memRefreshDictionaryItems();
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error(`Dictionary item addition failed!`);
  };

  return (
    <div className="flex flex-col gap-6 " style={{ minHeight: '100vh' }}>
      <Typography.Title className="m-0 text-center">
        Dictionary Config
      </Typography.Title>
      {/* new dictionary item */}
      <NewDictionaryForm
        onFinish={onItemCreate}
        onFinishFailed={onFinishFailed}
      />
      {/* dictionaly table */}
      <EdiTable list={dicItems} />
    </div>
  );
};
