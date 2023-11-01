/*
 * 所有的做题结果
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2023-10-31
 * @copyright Copyright (c) 2020, Tencent
 */

import { HistoryProps } from "@/hooks/useHistory";
import { Button, View } from "@tarojs/components";
import React, {
  RefObject,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtProgress,
} from "taro-ui";
import classnames from "classnames";
import "./Result.less";
import { percent, roundNumber } from "@/utils/math";
import DrawingBoard from "@/components/Canvas/DrawingBoard";

interface ResultProps {
  onSure: () => void;
  history: HistoryProps[];
  time: string;
}

export interface ResultRef {
  show: () => void;
  hide: () => void;
}

const Result = forwardRef(
  ({ onSure, history, time }: ResultProps, ref: RefObject<ResultRef>) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        show() {
          setVisible(true);
        },
        hide() {
          setVisible(false);
        },
      };
    });

    const rightNumber = history?.filter((v) => v.ok)?.length;

    return (
      <AtModal isOpened={visible}>
        <AtModalHeader>恭喜你做完了</AtModalHeader>
        <AtModalContent>
          <View className="content">
            <View className="title">
              <View>耗时: {time}</View>
              <DrawingBoard />
            </View>
            <View className="at-row at-row--wrap result">
              <View className="at-col at-col-4">题目</View>
              <View className="at-col at-col-4">答案</View>
              <View className="at-col at-col-4">你的值</View>
              {history?.map((entity) => {
                const { timu, answer, ok, originTimu } = entity;
                return [
                  <View className="at-col at-col-4">{originTimu}</View>,
                  <View className="at-col at-col-4">{roundNumber(timu)}</View>,
                  <View
                    className={classnames(
                      "at-col at-col-4",
                      `${ok ? "ok" : "error"}`
                    )}
                  >
                    {answer}
                  </View>,
                ];
              })}
            </View>
            <View>
              正确率: {rightNumber}/{history?.length}
              <AtProgress
                percent={percent(rightNumber / history?.length)}
                status="success"
              />
            </View>
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button
            onClick={() => {
              onSure();
              setVisible(false);
            }}
          >
            确定
          </Button>
        </AtModalAction>
      </AtModal>
    );
  }
);

export default Result;
