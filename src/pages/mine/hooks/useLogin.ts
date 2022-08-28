import Taro from '@tarojs/taro';
import { getCookie } from "@/utils/cookie";
import { prefix } from '@/utils/constants';

const useLogin = () => {
  const cookie = getCookie();
  
  const onHandle = () => {
    console.log(cookie);


    Taro.login({
      success: function (res) {
        if (res.code) {
          const url = `${prefix}/api/v1/ping`;
          console.log(res, url);
          //发起网络请求
          Taro.request({
            url,
            data: res,
            method: 'GET',
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded',
            // }, 
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  };

  return [onHandle];
};

export default useLogin;