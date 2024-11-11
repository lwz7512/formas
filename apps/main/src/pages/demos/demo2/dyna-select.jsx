import { Select } from 'antd';

const cascadeObject = {
  m: [
    { value: '1', label: '1AM' },
    { value: '2', label: '2AM' },
    { value: '3', label: '3AM' },
  ],
  a: [
    { value: '13', label: '1PM' },
    { value: '14', label: '2PM' },
    { value: '15', label: '3PM' },
  ],
  n: [
    { value: '18', label: '6AM' },
    { value: '19', label: '7AM' },
    { value: '20', label: '8AM' },
  ],
};

export const DynaOptionSelect = ({ addons }) => {
  const { dependValues, setValueByPath, getValues } = addons;
  const formData = getValues();

  const [timeSelect] = dependValues;
  const options = cascadeObject[timeSelect] || [];

  const handleChange = (value) => {
    setValueByPath('select_hour', value);
  };

  return (
    <Select
      style={{ width: 200 }}
      defaultValue={formData['select_hour']}
      onChange={handleChange}
      options={options}
      value={options[0]?.value}
    />
  );
};
