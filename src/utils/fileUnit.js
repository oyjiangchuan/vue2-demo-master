/**
 * 导出文件
 * @param res 下载响应体
 */
export default function (res) {
  const disposition = res.headers['content-disposition'];
  if (!disposition) {
    alert('导出数据失败');
    return;
  }
  let fileName = disposition.split(';')[1].split('filename=')[1];
  fileName = decodeURIComponent(fileName);
  if ('msSaveOrOpenBlob' in navigator) { // IE导出
    window.navigator.msSaveOrOpenBlob(res.data, fileName);
    return;
  }
  const link = document.createElement('a');
  link.download = fileName;
  link.style.display = 'none';
  link.href = URL.createObjectURL(res.data);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('导数数据成功');
}
