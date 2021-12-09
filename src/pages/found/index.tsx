import { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { AtCard, AtFab, AtTabs, AtTabsPane, AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";

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
      <AtTabs
        current={current}
        scroll
        tabList={[
          { title: "学习打卡" },
          { title: "开黑" },
          { title: "交友表白" },
          { title: "Xiang分享" },
        ]}
        onClick={setCurrent}
      >
        <AtTabsPane current={current} index={0}>
          <View style='font-size:18px;text-align:center;height:100px;'>
            <AtCard
              note='小Tips'
              extra='额外信息'
              title='这是个标题'
              thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
            >
              这也是内容区 可以随意定义功能
            </AtCard>
          </View>
          {/* <Button onClick={this.handleEvent.bind(this)}>试试</Button> */}
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='font-size:18px;text-align:center;height:100px;'>
            标签页二的内容
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View style='font-size:18px;text-align:center;height:100px;'>
            标签页三的内容
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <View style='font-size:18px;text-align:center;height:100px;'>
            标签页四的内容
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          <View style='font-size:18px;text-align:center;height:100px;'>
            标签页五的内容
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={5}>
          <View style='font-size:18px;text-align:center;height:100px;'>
            标签页六的内容
          </View>
        </AtTabsPane>
      </AtTabs>

      {/* <View className='fab'>
        <AtFab size='small'>
          <AtIcon
            className='at-fab__icon'
            onClick={handleAdd}
            value='add'
            color='#ccc'
          />
        </AtFab>
      </View> */}
    </View>
  );
};

export default Index;
