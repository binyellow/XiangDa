/*
 * 3位数计算
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2023-10-30
 * @copyright Copyright (c) 2020, Tencent
 */

import { Button, View } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { getRandomInt } from "@/utils/math";
import { CanvasDrawingRef } from "@/components/Canvas";
import useKeyboard from "@/components/Keyboard/useKeyboard";
import { onPrecision } from "@/utils/math";
import {
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtNoticebar,
} from "taro-ui";
import "./index.less";
import Taro from "@tarojs/taro";
import useHeader from "@/hooks/useHeader";
import ErrorResult, { ErrorResultRefProps } from "./components/ErrorResult";

const Grade = () => {
  const params = Taro.getCurrentInstance()?.router?.params;
  const total = params?.number || 10;
  const canvasRef = useRef<CanvasDrawingRef>(null);
  const [fenmu, setFenmu] = useState(getRandomInt(101, 1000));
  const [fenzi, setFenzi] = useState(getRandomInt(100, fenmu));
  const errorResultRef = useRef<ErrorResultRefProps>(null);

  const [resultVisible, setResultVisible] = useState(false);
  const { header, onResetTime, right, onResetRight, onError, onRight, done } =
    useHeader({ total });

  useEffect(() => {
    if (done) {
      setResultVisible(true);
    }
  }, [done]);

  const onOk = () => {
    const [ok, precision] = onPrecision(fenzi / fenmu, +keyboardVal);
    if (ok) {
      onRight();
    } else {
      onError();
      errorResultRef?.current?.show({ timu: fenzi / fenmu, answer: keyboardVal, precision })
    }
    onReset();
    onRestart();
  };
  const {
    keyboard,
    value: keyboardVal,
    onReset,
  } = useKeyboard({ onRestart, onOk });

  function onRestart() {
    const newFenmu = getRandomInt(101, 1000);
    setFenmu(newFenmu);
    setFenzi(getRandomInt(100, newFenmu));
    onResetTime();
  }

  const onSure = () => {
    setResultVisible(false);
    onRestart();
    onResetRight();
  };

  return (
    <View>
      <View className="content">
        <View>
          <AtNoticebar>
            <View>建议写到小数后2~3位</View>
            <View>允许误差范围：±2%</View>
          </AtNoticebar>
          {header}

          <View className="cal-content">
            <View
              className="cal-content-left"
              onClick={() => canvasRef?.current?.clearCanvas()}
            >
              <View>{fenzi}</View>
              <View>——</View>
              <View>{fenmu}</View>
            </View>
            <View>≈</View>
            <View>{keyboardVal}</View>
          </View>
        </View>
        {keyboard}
      </View>

      {/* 结果 */}
      {resultVisible && (
        <AtModal isOpened={resultVisible}>
          <AtModalHeader>恭喜你做完了</AtModalHeader>
          <AtModalContent>
            正确率是：{right} / {total}
          </AtModalContent>
          <AtModalAction>
            <Button onClick={onSure}>确定</Button>
          </AtModalAction>
        </AtModal>
      )}

      <ErrorResult ref={errorResultRef} />
    </View>
  );
};

export default Grade;
