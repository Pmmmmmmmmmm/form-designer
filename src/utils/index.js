// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}
// 返回值类型boolean
export function ObjectEquel(obj1, obj2) {
  let a = Array.from(new Map(Object.entries(obj1)))
  let b = Array.from(new Map(Object.entries(obj2)))
  let i = 0
  a.forEach((item, index) => {
    if (b[index][0] !== item[0] || b[index][1] !== item[1]) {
      i++
    }
  })
  return i !== 0
}