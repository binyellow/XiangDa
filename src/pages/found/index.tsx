import { useContext, useEffect, useMemo, useState } from "react";
import { Picker, View } from "@tarojs/components";
import { AtAccordion, AtIcon, AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.less";
import { defaultOpenMap, xingCeTypeEnum } from "./constants";
import { FoundContext } from "./Context";
import { isWeapp } from "@/utils/env";

const range = ["10", "5", "15", "20"];
const Index = () => {
  const [open, setOpen] = useState(defaultOpenMap);
  const foundContext = useContext(FoundContext);
  const [questionNum, setQuestionNum] = useState(0);
  const memoFoundContext = useMemo(() => {
    return {
      ...foundContext,
    };
  }, [foundContext]);
  const [menuInfo, setMenuInfo] = useState<
    undefined | { height: number; top: number }
  >();

  useEffect(() => {
    if (isWeapp()) {
      setBadge();
      getSystemInfoSync();
    }
  }, []);

  // 设置首页的徽标数
  const setBadge = () => {
    Taro.setTabBarBadge({
      index: 0,
      text: "5",
    });
  };

  // 获取操作按钮的属性
  const getSystemInfoSync = () => {
    const info = Taro.getMenuButtonBoundingClientRect();
    setMenuInfo(info);
    console.log(info);
  };

  const handleClick = (open, type) => {
    setOpen({
      ...open,
      [type]: open,
    });
  };

  return (
    <FoundContext.Provider value={memoFoundContext}>
      <View className="dashboard">
        <View
          style={{
            marginTop: menuInfo?.top,
            height: menuInfo?.height,
          }}
          className="menu-wrapper"
        >
          <Picker
            mode="selector"
            range={range}
            value={questionNum}
            onChange={(e) => setQuestionNum(+e?.detail?.value)}
          >
            <View className="at-icon at-icon-settings"></View>
          </Picker>
          <View>上岸</View>
        </View>
        <AtIcon value="setting" size="30" color="#F00"></AtIcon>
        <AtAccordion
          open={open[xingCeTypeEnum.ziliao]}
          onClick={(open) => handleClick(open, xingCeTypeEnum.ziliao)}
          title="资料分析"
        >
          <AtList hasBorder={false}>
            <AtListItem
              title="分数计算（分子<分母）"
              arrow="right"
              thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/xingce/grade/index?number=${range[questionNum]}`,
                });
              }}
            />
            <AtListItem
              title="分数计算（分母<分子）"
              arrow="right"
              thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/xingce/grade-surpass/index?number=${range[questionNum]}`,
                });
              }}
            />
          </AtList>
        </AtAccordion>
      </View>
    </FoundContext.Provider>
  );
};

export default Index;
