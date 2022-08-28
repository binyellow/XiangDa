import Taro from "@tarojs/taro";

/**
 * 设置cookie
 * @export
 * @param {string} val
 */
export function setCookie(val: string) {
  Taro.setStorageSync("cookie", val);
}

/**
 * 获取cookie
 * @export
 * @param {string} val
 */
export function getCookie() {
  Taro.getStorageSync("cookie");
}

/**
 * 清除cookie
 * @export
 * @param {string} val
 */
export function rmCookie() {
  Taro.removeStorageSync("cookie");
}
