import { useEffect, useState } from "react";
import { CoverImage, View } from "@tarojs/components";
import { AtCard, AtTabs, AtTabsPane } from "taro-ui";
import Taro from "@tarojs/taro";
import titleBg from "@/assets/logo/titleBg.png";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/card.scss";
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "./index.less";

const Index = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    Taro.setTabBarBadge({
      index: 0,
      text: "5"
    });
  }, []);

  const handleAdd = () => {
    Taro.login().then(console.log);
    Taro.getUserInfo().then(console.log);
  };
  return (
    <View className='dashboard'>
      <CoverImage
        src={titleBg}
        className='title-bg'
        style='margin-bottom: 12px'
      />
      <View style='font-size:18px;text-align:center;height:100px;'>
        <AtCard
          // note='小Tips'
          title='这里是树洞'
          // thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
        >
          <view>说你Xiang说</view>
          <view>做你Xiang做</view>
        </AtCard>
      </View>
    </View>
  );
};

export default Index;
