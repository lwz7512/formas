import React from 'react';
// import FR from './index';

/**
 * 渲染子元素
 * @date 2025-05-09 do not use FR, use custom component instead! to eliminate circular dependency complaining!
 *
 * @param {Array} children 子元素
 * @param {Boolean} preview 是否为预览模式
 * @param {Object} FR 表单渲染组件
 * @returns {React.ReactNode} 渲染后的子元素
 */
const RenderChildren = ({ children = [], preview, FR }) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          id: child,
          preview,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderChildren;
