import { useEffect, useRef, useState } from 'react';

import { Button, Drawer, Space } from 'antd';

import LogicFlow from '@logicflow/core';
// import '@logicflow/core/dist/index.css';
import { DndPanel, SelectionSelect } from '@logicflow/extension';
import '@logicflow/core/lib/style/index.css';
// import "@logicflow/core/dist/style/index.css"; // 2.0版本前的引入方式
import '@logicflow/extension/lib/style/index.css';
import { Control } from '@logicflow/extension';
import { Menu } from '@logicflow/extension';
import { BPMNAdapter } from '@logicflow/extension';

import {
  getPatternItems,
  navPlayItem,
  navSaveItem,
  menuCfg,
  data,
} from './config';

import './style.css';

export const LogicFlowPage = () => {
  const refContainer = useRef(null);

  LogicFlow.use(DndPanel);
  LogicFlow.use(SelectionSelect);
  LogicFlow.use(Control);
  LogicFlow.use(Menu);
  LogicFlow.use(BPMNAdapter);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const lf = new LogicFlow({
      container: refContainer.current,
      grid: true,
      height: 500,
      // plugins: [DndPanel, SelectionSelect]
    });
    lf.extension.dndPanel.setPatternItems(getPatternItems(lf));
    lf.extension.control.addItem(navSaveItem);
    lf.extension.control.addItem(navPlayItem);
    lf.extension.menu.addMenuConfig(menuCfg);
    lf.render(data);
    lf.translateCenter();

    const { eventCenter } = lf.graphModel;
    eventCenter.on('node:click', (args) => {
      console.log('node:click', args.position);
      showDrawer();
    });
    eventCenter.on('element:click', (args) => {
      console.log('element:click', args.e.target);
    });
  }, []);

  return (
    <div>
      <div className="logicflow" ref={refContainer}></div>
      <Drawer
        title="Basic Drawer"
        onClose={onClose}
        open={open}
        size="large"
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};
