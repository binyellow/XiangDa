import { useEffect, useState } from "react";
import { CoverImage, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import titleBg from "@/assets/logo/titleBg.png";

import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/card.scss";
import "taro-ui/dist/style/components/fab.scss";
import "taro-ui/dist/style/components/icon.scss";
import "./index.less";
import Card from "./components/Card";
import { NewsRes } from "./type";
import { isWeapp } from "@/utils/env";

const Index = () => {
  const [dataSource, setDataSource] = useState<NewsRes["data"]>([]);

  useEffect(() => {
    if (isWeapp()) {
      Taro.setTabBarBadge({
        index: 0,
        text: "6",
      });
      queryList();
    }
  }, []);

  const queryList = () => {
    setTimeout(() => {
      Taro.request({
        method: "GET",
        url: "https://momoyu.cc/api/hot/list?type=0",
      }).then((res) => {
        setDataSource(res?.data?.data);
      });
    }, 1000 * 30);
  };

  return (
    <View className="dashboard">
      <CoverImage
        src={titleBg}
        className="title-bg"
        style="margin-bottom: 30rpx"
      />
      <View style="font-size:18px;text-align:center;height:100px;">
        {dataSource?.length ? (
          <Card dataSource={dataSource} />
        ) : (
          <View
            style={{
              height: "700rpx",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            xiangdaer
          </View>
        )}
      </View>
    </View>
  );
};

export default Index;
