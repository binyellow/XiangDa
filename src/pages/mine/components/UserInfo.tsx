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
    Taro.login({
      success: function(res) {
        if (res.code) {
          const url = `${prefix}/api/v1/ping`;
          console.log(res, url);
          //发起网络请求
          Taro.request({
            url,
            data: res,
            method: "GET"
          }).then(msg => {
            Taro.atMessage({
              message: "登录成功",
              type: "success"
            });
            setCookie(res.code);
            setUserName(res.code);
            setFans(6);
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  };

  return (
    <View className='user-info'>
      <View className='left'>
        <CoverImage src={people} className='user-image' onClick={handleClick} />
        <View className='login'>
          <View className='login-btn' onClick={handleClick}>
            {userName}
          </View>
          <View className='login-fans'>
            <View>{fans} 粉丝</View>
          </View>
        </View>
      </View>
      <View className='right'>
        <CoverImage
          src={mail}
          className='mail'
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
            show-menu-by-longpress='{{true}}'
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
