import { View, CoverImage } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { prefix } from "@/utils/constants";
import people from "@/assets/mine/person-circle.png";
import mail from "@/assets/mine/mail.png";
import wx from "@/assets/mine/wx.jpg";
import { AtMessage, AtModal, AtModalContent, AtModalHeader } from "taro-ui";
import { useState } from "react";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/message.scss";
import { setCookie } from "@/utils/cookie";

const UserInfo = () => {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("去登录");
  const [fans, setFans] = useState(0);

  const handleClick = () => {
    Taro.getSetting({
      success(res) {
        console.log(`授权列表：`, res);
        // if (!res.authSetting['scope.record']) {
        //   wx.authorize({
        //     scope: 'scope.record',
        //     success () {
        //       // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        //       wx.startRecord()
        //     }
        //   })
        // }
      }
    })
    return;
    Taro.login({
      success: function (res) {
        if (res.code) {
          // const url = `${prefix}/register?name=${res.code}`;
          // const url = `${prefix}/api/v1/ping`;
          const url = `https://api.weixin.qq.com/sns/jscode2session`;
          console.log(res, url);
          Taro.authorize({
            scope: "scope.userInfo",
            success(res) {
              console.log("授权成功", res);

              // 获取用户信息
              // wx.getUserInfo({
              //   success: (res) => {
              //     console.log(res.userInfo);
              //   },
              // });
            },
            fail() {
              console.log("授权失败");
            },
          });
          return;
          //发起网络请求
          Taro.request({
            url,
            data: {
              appid: "wx2d85a631bd35f8d1",
              secret: "ff5f95cdbbf20b8b63056b9c395c776c",
              js_code: res.code,
              grant_type: "authorization_code",
            },
            method: "GET",
          }).then((msg) => {
            Taro.atMessage({
              message: "登录成功",
              type: "success",
            });
            setCookie(res.code);
            setUserName(res.code);
            setFans(6);
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  };

  return (
    <View className="user-info">
      <View className="left">
        <CoverImage src={people} className="user-image" onClick={handleClick} />
        <View className="login">
          <View className="login-btn" onClick={handleClick}>
            {userName}
          </View>
          <View className="login-fans">
            <View>{fans} 粉丝</View>
          </View>
        </View>
      </View>
      <View className="right">
        <CoverImage
          src={mail}
          className="mail"
          onClick={() => setVisible(true)}
        />
      </View>
      <AtModal
        isOpened={visible}
        onClose={() => setVisible(false)}
        // onConfirm={() => {
        //   setVisible(false);
        //   setWxVisible(true);
        // }}
      >
        <AtModalHeader>联系作者</AtModalHeader>
        <AtModalContent>
          <image
            src={wx}
            show-menu-by-longpress="{{true}}"
            style={{ width: "480rpx", height: "580rpx" }}
          />
          <View>有建议和想法可以联系</View>
          <View>github：https://github.com/binyellow</View>
          <View>QQ：571704908</View>
          <View>WeChat：ayellowbin</View>
          <View>请注明：小程序</View>
          <View>工作繁忙，努力迭代中</View>
        </AtModalContent>
      </AtModal>

      <AtMessage />
    </View>
  );
};

export default UserInfo;
