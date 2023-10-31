/*
 * 3位数计算
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2023-10-30
 * @copyright Copyright (c) 2020, Tencent
 */

import { View } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { getRandomInt } from "@/utils/math";
import { CanvasDrawingRef } from "@/components/Canvas";
import { AtNoticebar } from "taro-ui";
import "./index.less";
import Taro from "@tarojs/taro";
import useHeader from "@/hooks/useHeader";
import ErrorResult, { ErrorResultRefProps } from "./components/ErrorResult";
import useHistory from "@/hooks/useHistory";
import Result, { ResultRef } from "./components/Result";

const Grade = () => {
  const params = Taro.getCurrentInstance()?.router?.params;
  const total = params?.number || 10;
  const canvasRef = useRef<CanvasDrawingRef>(null);
  const [fenmu, setFenmu] = useState(getRandomInt(101, 1000));
  const [fenzi, setFenzi] = useState(getRandomInt(100, fenmu));
  const errorResultRef = useRef<ErrorResultRefProps>(null);
  const resultRef = useRef<ResultRef>(null);

  const {
    header,
    onResetTime,
    onResetRight,
    onError,
    onRight,
    done,
    time,
    stopTime,
    doTime,
  } = useHeader({ total });

  useEffect(() => {
    if (done) {
      resultRef.current?.show();
      stopTime();
    }
  }, [done]);

  const onResetTimu = () => {
    const newFenmu = getRandomInt(101, 1000);
    setFenmu(newFenmu);
    setFenzi(getRandomInt(100, newFenmu));
  };

  const handleError = (error) => {
    onError();
    errorResultRef?.current?.show({
      timu: fenzi / fenmu,
      answer: +keyboardVal,
      error,
    });
  };

  const { keyboard, keyboardVal, history, onResetHistory } = useHistory({
    fenzi,
    fenmu,
    onRight,
    onError: handleError,
    onResetTime,
    onResetTimu,
  });

  function onRestart() {
    const newFenmu = getRandomInt(101, 1000);
    setFenmu(newFenmu);
    setFenzi(getRandomInt(100, newFenmu));
    onResetTime();
  }

  const onSure = () => {
    onRestart();
    onResetRight();
    onResetHistory();
    doTime();
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

      <Result ref={resultRef} onSure={onSure} history={history} time={time} />
      <ErrorResult ref={errorResultRef} />
    </View>
  );
};

export default Grade;
