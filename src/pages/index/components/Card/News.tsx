/*
 * 新闻Item
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2022-07-16
 * @copyright Copyright (c) 2020, Tencent
 */

import { View } from "@tarojs/components";
import { FC } from "react";
import { NewsEntity } from "../../type";
import { CNewsProps } from "./type";

const News: FC<CNewsProps> = props => {
  const { dataSource } = props;
  console.log(dataSource);
  const navigateTo = (newsEntity: NewsEntity) => {
    // wx.navigateTo(newsEntity.link);
  };
  return (
    <View>
      {dataSource?.map(newsEntity => {
        return (
          <View key={newsEntity?.id} className='news-row'>
            <View onClick={() => navigateTo(newsEntity)}>
              {newsEntity?.title}
            </View>
            <View className='extra'>{newsEntity?.extra}</View>
          </View>
        );
      })}
    </View>
  );
};

export default News;
