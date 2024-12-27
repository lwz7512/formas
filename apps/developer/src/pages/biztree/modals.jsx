import { Modal, Input } from 'antd';

const { TextArea } = Input;

export const AddRootNodeModal = ({
  isRootModalOpen,
  newRootNode,
  handleRootCreation,
  handleRootModalClose,
  onRootNodeNameChange,
  onRootNodeDescChange,
}) => (
  <Modal
    title="Add Root Node"
    width={350}
    open={isRootModalOpen}
    onOk={handleRootCreation}
    onCancel={handleRootModalClose}
  >
    <h2>Node Name:</h2>
    <Input
      placeholder="New Node label"
      className=" mb-2"
      value={newRootNode.title}
      onChange={onRootNodeNameChange}
    />
    <h2>Node Description(optional)</h2>
    <TextArea
      placeholder="New Node description"
      autoSize={{
        minRows: 2,
        maxRows: 6,
      }}
      value={newRootNode.description}
      onChange={onRootNodeDescChange}
    />
  </Modal>
);

export const AddChildNodeModal = ({
  isChildNodeModalOpen,
  newChildNode,
  handleChildNodeCreation,
  handleChildNodeModalClose,
  onChildNodeNameChange,
  onChildNodeDescChange,
}) => (
  <Modal
    title="Add Child Node"
    width={350}
    open={isChildNodeModalOpen}
    onOk={() => handleChildNodeCreation(newChildNode.pid)}
    onCancel={handleChildNodeModalClose}
  >
    <h2>Node Name:</h2>
    <Input
      placeholder="New Node label"
      className=" mb-2"
      value={newChildNode.title}
      onChange={onChildNodeNameChange}
    />
    <h2>Node Description(optional)</h2>
    <TextArea
      placeholder="New Node description"
      autoSize={{
        minRows: 2,
        maxRows: 6,
      }}
      value={newChildNode.description}
      onChange={onChildNodeDescChange}
    />
  </Modal>
);
