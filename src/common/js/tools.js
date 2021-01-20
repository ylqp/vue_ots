export const getBrowser = () => {
  const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  const isIe= userAgent.indexOf('MSIE') > -1; //判断是否IE浏览器
  const isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  const isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
  if (isIe) {
    return 'Ie';
  }
  if (isOpera) {
    return "Opera";
  }
  if (isEdge) {
    return "Edge";
  }
  if (isFF) {
    return "FF";
  }
  if (isSafari) {
    return "Safari";
  }
  if (isChrome) {
    return "Chrome";
  }
}
