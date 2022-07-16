/*
 * 新闻卡片
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2022-07-16
 * @copyright Copyright (c) 2020, Tencent
 */

import { View } from "@tarojs/components";
import { FC, useMemo } from "react";
import { AtCard } from "taro-ui";
import News from "./News";
import { CCardProps } from "./type";
import "./index.less";

const Card: FC<CCardProps> = props => {
  const { dataSource } = props;

  const syntheticData = useMemo(() => {
    return dataSource?.reduce((pre, cur) => {
      if (cur?.id === 3) {
        return [cur, ...pre];
      }
      return [...pre, cur];
    }, []);
  }, [dataSource]);

  return (
    <View className='card'>
      {syntheticData?.map(news => {
        const { id, name, data } = news;
        return (
          <AtCard key={id} title={name}>
            <News dataSource={data} />
          </AtCard>
        );
      })}
    </View>
  );
};

export default Card;
