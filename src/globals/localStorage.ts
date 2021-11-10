/* 
封装一个对localstorage快速操作的方法
1. setLocalCache(key):获取key对应的value值，并且已经帮转化成js中对应的类型
2. getLocalCache(key,value):设置key对应的value值，如果value为null会报警告，并且不会存入到localstorage中
*/

export function getLocalCache(key: string): any {
  let value = "";
  try {
    value = JSON.parse(localStorage.getItem(key) ?? "");
  } catch {
    value = localStorage.getItem(key) as string;
  }
  return value;
}

export function setLocalCache(key: string, value: any) {
  if (typeof value == "string") {
    localStorage.setItem(key, value);
  } else if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    console.warn("value的值不正确");
  }
}
