import useFetchData from './use-fetch-data';
import usePostData from './use-post-data';
import usePutData from './use-put-data';
import useDeleteData from './use-delete-data';

/**
 * 获取文件列表
 */
export const fecthFilesList = (page, size, orders, searchs) => {
  const { data, error, loading } = usePostData('/api/sys/files', {
    currPage: page,
    pageSize: size,
    orders: orders,
    searchs: searchs,
  });
  return { data, error, loading };
};

/**
 * 删除文件
 */
export const deleteFile = (id) => {
  const { data, error, loading } = useDeleteData(`/api/sys/files/${id}`);
  return { data, error, loading };
};

/**
 * 下载外站链接文件
 */
export const downloadWeblink = (url) => {
  const { data, error, loading } = usePostData('/api/sys/files/download-weblink', {
    url: url
  });
  return { data, error, loading };
};

/**
 * 上传文件块
 */
export const uploadBolb = (tempcell) => {
  const { data, error, loading } = usePostData('/api/sys/files/upload-blob', {
    tempcell: tempcell
  });
  return { data, error, loading };
};

const LENGTH = 1024 * 512; // 512k
var start = 0;
var end = start + LENGTH;
var blobTotalNum = 1;

// 切割文件
// filetype: image, video, file, audio
export const cutFile = (filetype, file, callback, bizid) => {
  blobTotalNum = Math.ceil(file.size / LENGTH);
  for (let i = 0; i < blobTotalNum; i++) {
    start = i * LENGTH;
    end = start + LENGTH;
    if (i === blobTotalNum - 1) {
      end = file.size;
    }
    console.log(file.name + ' ' + i + '/' + blobTotalNum + ' (' + start + '-' + end + ')');
    let fileBlob = file.slice(start, end);
    let tempcell = {
      data: '',
      filetype: filetype,
      blobCurrNum: i,
      blobTotalNum: blobTotalNum,
      filename: file.name,
      size: file.size,
      start: start,
      end: end,
      bizid: bizid, //业务ID，业务逻辑配对使用，由业务自己定义和使用，后台只负责传输
    };
    var reader = new FileReader();
    reader.onload = function (e) {
      // e.target.result就是该文件的完整Base64 Data-URI
      // data:application/octet-stream;base64,iVBORw0KGgoAAAAN...
      var data_uri = e.target.result;
      var base64_str = data_uri.split(',')[1];
      tempcell.data = base64_str;

      //chunk块上传
      ajaxBlobUpload(tempcell, callback);
    };
    reader.readAsDataURL(fileBlob);
  }
};

const ajaxBlobUpload = (tempcell, callback) => {
  uploadBolb(tempcell).then((res) => {
    if (res) {
      switch (res.errCode) {
        case 200:
          console.log(res.errCode, '操作成功,整个文件传输完毕!');
          callback(
            res.completedNum,
            tempcell.blobTotalNum,
            res.url,
            res.cloudUrl,
            res.fileId,
            res.filename,
            res.bizid,
            res.errCode,
          );
          break;
        case 201:
          console.log(res.errCode, '操作成功,当前块传输完毕!');
          callback(
            res.completedNum,
            tempcell.blobTotalNum,
            res.url,
            res.filename,
            res.bizid,
            res.errCode,
          );
          break;
        case 400:
          console.log(res.errCode, '操作失败,命名格式错误!');
          callback(
            res.completedNum,
            tempcell.blobTotalNum,
            res.url,
            res.filename,
            res.bizid,
            res.errCode,
          );
          break;
        case 403:
          console.log(res.errCode, '操作失败,禁止的操作!');
          callback(
            res.completedNum,
            tempcell.blobTotalNum,
            res.url,
            res.filename,
            res.bizid,
            res.errCode,
          );
          break;
        case 500:
          console.log(res.errCode, '操作失败,未知服务器错误!');
          callback(
            res.completedNum,
            tempcell.blobTotalNum,
            res.url,
            res.filename,
            res.bizid,
            res.errCode,
          );
          break;
        default:
          break;
      }
    }
  });
};
