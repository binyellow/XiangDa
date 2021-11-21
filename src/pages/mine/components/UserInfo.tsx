import React from "react";
import { View, Image, Button } from "@tarojs/components";
import logo from "@/assets/logo/logo.png";
import Taro from "@tarojs/taro";

const UserInfo = () => {

  const handleClick = ()=> {
    Taro.login({
      success: function (res) {
        if (res.code) {
          console.log(res);
          //发起网络请求
          Taro.request({
            url: 'http://localhost:9090/user/login',
            data: {
              username: 'admin',
              password: 123456,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            }, 
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  };
  return (
    <View>
      1<Image src={logo}></Image>
      <Button openType='getPhoneNumber' onGetPhoneNumber={handleClick}>点击登录</Button>
    </View>
  );
};

export default UserInfo;
