import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { cutFile } from '../../hooks/upload';

// https://xrender.fun/form-render
export default function CyberFileUpload({
  action,
  value,
  onChange,
  uploadProps,
  buttonProps,
  schema,
}) {
  // console.log(schema);
  const props = {
    name: 'file',
    type: 'file',
    action, // 旧的兼容
    onChange(info) {
      if (info.file.percent === 100) {
        if (info.event?.type === "progress") {
          handleUpload(info.file.originFileObj);
        }
      }
    },
    onRemove() {
      onChange('');
    },
    ...uploadProps,
  };

  const defaultBtnProps = {
    icon: <UploadOutlined />,
    children: '上传',
  };

  const btnProps = {
    ...defaultBtnProps,
    ...buttonProps,
  };

  function handleUpload(file) {
    // const windowURL = window.URL || window.webkitURL;
    /* windowURL.createObjectURL 会根据传入的参数创建一个指向该参数对象的URL */
    // let imgSrc = windowURL.createObjectURL(file);
    /* TODO: 界面设置为本地文件 imgSrc */

    let index = file.name.lastIndexOf('.');
    let suffix = file.name.substr(index + 1);

    let filetype = 'file';
    if (suffix === 'png' || suffix === 'jpg' || suffix === 'jpeg' || suffix === 'gif') {
      filetype = 'image';
    } else if (
      suffix === 'mp4' ||
      suffix === 'rmvb' ||
      suffix === 'wmv' ||
      suffix === 'mpg' ||
      suffix === 'mpeg'
    ) {
      filetype = 'video';
    } else if (suffix === 'mp3' || suffix === 'wav' || suffix === 'wma' || suffix === 'm4a') {
      filetype = 'audio';
    }
    cutFile(filetype, file, uploadCallback, file.uid);
  };

  function uploadCallback(completedNum, blobTotalNum, imgUrl, filename, bizid, errCode){
    if (errCode === 200 && completedNum === blobTotalNum) {
      onChange(imgUrl);
      message.success(`上传文件 ${filename} 成功!`);
    }
  };

  return (
    <div className="fr-upload-mod">
      {(schema?.disable === undefined || schema?.disable === false) ?
      (
        <Upload {...props} className="fr-upload-file">
          <Button {...btnProps} />
        </Upload>
      ) : null}
      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="fr-upload-preview"
        >
          已上传地址
        </a>
      )}
    </div>
  );
}
