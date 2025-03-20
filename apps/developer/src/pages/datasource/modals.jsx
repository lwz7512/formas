import { Modal, Input, Select } from 'antd';

export const AddNewDSModal = ({
  isNewDSOpen,
  datasource,
  onDSFieldChange,
  handleDSCreation,
  handleDSModalClose,
}) => (
  <Modal
    title="Add New Data Source"
    width={350}
    open={isNewDSOpen}
    onOk={handleDSCreation}
    onCancel={handleDSModalClose}
  >
    <h2>Data source title:</h2>
    <Input
      name="title"
      placeholder="your datasource title"
      className=" mb-2"
      value={datasource.title}
      onChange={evt => onDSFieldChange('title', evt.target.value)}
    />

    <h2>Select Driver</h2>
    <Select
      name="driver"
      className="w-full mb-2"
      placeholder="Select a driver"
      value={datasource.driver}
      onChange={value => onDSFieldChange('driver', value)}
      options={[
        {
          label: 'MySQL',
          value: 'mysql',
        },
        {
          label: 'MariaDB',
          value: 'mariadb',
        },
        {
          label: 'SQL Server',
          value: 'sqlserver',
        },
      ]}
    />
    <h2>Select Default or Not</h2>
    <Select
      name="isDefault"
      className="mb-2 w-full"
      placeholder="Select as default"
      value={datasource.isDefault}
      onChange={value => onDSFieldChange('isDefault', value)}
      options={[
        {
          label: 'Yes',
          value: 1,
        },
        {
          label: 'No',
          value: 0,
        },
      ]}
    />
    <h2>Host</h2>
    <Input
      name="host"
      placeholder="your database host"
      className=" mb-2"
      value={datasource.host}
      onChange={evt => onDSFieldChange('host', evt.target.value)}
    />
    <h2>Port</h2>
    <Input
      name="port"
      placeholder="your database port"
      className=" mb-2"
      value={datasource.port}
      onChange={evt => onDSFieldChange('port', evt.target.value)}
    />
    <h2>Database</h2>
    <Input
      name="database"
      placeholder="your database name"
      className=" mb-2"
      value={datasource.database}
      onChange={evt => onDSFieldChange('database', evt.target.value)}
    />
    <h2>Instance</h2>
    <Input
      name="instance"
      placeholder="your database instance"
      className=" mb-2"
      value={datasource.instance}
      onChange={evt => onDSFieldChange('instance', evt.target.value)}
    />
    <h2>User</h2>
    <Input
      name="user"
      placeholder="your database user"
      className=" mb-2"
      value={datasource.user}
      onChange={evt => onDSFieldChange('user', evt.target.value)}
    />
    <h2>Password</h2>
    <Input
      name="password"
      placeholder="your database password"
      className=" mb-2"
      value={datasource.password}
      onChange={evt => onDSFieldChange('password', evt.target.value)}
    />
  </Modal>
);

export const ModifyDSModal = ({
  isModifyDSOpen,
  datasource,
  onDSFieldChange,
  handleDSUpdate,
  handleDSModalClose,
}) => (
  <Modal
    title="Modify Data Source"
    width={350}
    open={isModifyDSOpen}
    onOk={handleDSUpdate}
    onCancel={handleDSModalClose}
  >
    <h2>Data source title:</h2>
    <Input
      name="title"
      placeholder="your datasource title"
      className=" mb-2"
      value={datasource.title}
      onChange={evt => onDSFieldChange('title', evt.target.value)}
    />
    <h2>Select Driver</h2>
    <Select
      name="driver"
      className="w-full mb-2"
      placeholder="Select a driver"
      value={datasource.driver}
      onChange={value => onDSFieldChange('driver', value)}
      options={[
        {
          label: 'MySQL',
          value: 'mysql',
        },
        {
          label: 'MariaDB',
          value: 'mariadb',
        },
        {
          label: 'SQL Server',
          value: 'sqlserver',
        },
      ]}
    />
    <h2>Select Default or Not</h2>
    <Select
      name="isDefault"
      className="mb-2 w-full"
      placeholder="Select as default"
      value={datasource.isDefault}
      onChange={value => onDSFieldChange('isDefault', value)}
      options={[
        {
          label: 'Yes',
          value: 1,
        },
        {
          label: 'No',
          value: 0,
        },
      ]}
    />
    <h2>Host</h2>
    <Input
      name="host"
      placeholder="your database host"
      className=" mb-2"
      value={datasource.host}
      onChange={evt => onDSFieldChange('host', evt.target.value)}
    />
    <h2>Port</h2>
    <Input
      name="port"
      placeholder="your database port"
      className=" mb-2"
      value={datasource.port}
      onChange={evt => onDSFieldChange('port', evt.target.value)}
    />
    <h2>Database</h2>
    <Input
      name="database"
      placeholder="your database name"
      className=" mb-2"
      value={datasource.database}
      onChange={evt => onDSFieldChange('database', evt.target.value)}
    />
    <h2>Instance</h2>
    <Input
      name="instance"
      placeholder="your database instance"
      className=" mb-2"
      value={datasource.instance}
      onChange={evt => onDSFieldChange('instance', evt.target.value)}
    />
    <h2>User</h2>
    <Input
      name="user"
      placeholder="your database user"
      className=" mb-2"
      value={datasource.user}
      onChange={evt => onDSFieldChange('user', evt.target.value)}
    />
    <h2>Password</h2>
    <Input
      name="password"
      placeholder="your database password"
      className=" mb-2"
      value={datasource.password}
      onChange={evt => onDSFieldChange('password', evt.target.value)}
    />
  </Modal>
);
