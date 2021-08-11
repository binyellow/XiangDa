import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtCard, AtFab, AtTabs, AtTabsPane, AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/card.scss";
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "./index.less";

// #01a8ec
export default class Index extends Component {
  state = {
    current: 0
  };

  componentWillMount() {}

  componentDidMount() {
    Taro.setTabBarBadge({
      index: 0,
      text: "5"
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  handleAdd() {
    Taro.login().then(console.log);
    Taro.getUserInfo().then(console.log);
  }

  render() {
    return (
      <View className="dashboard">
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: "标签页1" },
            { title: "标签页2" },
            { title: "标签页3" },
            { title: "标签页4" },
            { title: "标签页5" },
            { title: "标签页6" }
          ]}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View style="font-size:18px;text-align:center;height:100px;">
              <AtCard
                note="小Tips"
                extra="额外信息"
                title="这是个标题"
                thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
              >
                这也是内容区 可以随意定义功能
              </AtCard>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style="font-size:18px;text-align:center;height:100px;">
              标签页二的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style="font-size:18px;text-align:center;height:100px;">
              标签页三的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style="font-size:18px;text-align:center;height:100px;">
              标签页四的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View style="font-size:18px;text-align:center;height:100px;">
              标签页五的内容
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={5}>
            <View style="font-size:18px;text-align:center;height:100px;">
              标签页六的内容
            </View>
          </AtTabsPane>
        </AtTabs>

        <View className="fab">
          <AtFab size="small">
            <AtIcon
              className="at-fab__icon"
              onClick={this.handleAdd.bind(this)}
              value="add"
              color="#ccc"
            />
          </AtFab>
        </View>
      </View>
    );
  }
}
