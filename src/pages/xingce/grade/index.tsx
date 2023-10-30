import { Button, View } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { getRandomInt } from "@/utils/math";
import { CanvasDrawingRef } from "@/components/Canvas";
import useKeyboard from "@/components/Keyboard/useKeyboard";
import { onPrecision } from "@/utils/math";
import useRight from "@/hooks/useRight";
import {
  AtCurtain,
  AtIcon,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtNoticebar,
  AtTag,
} from "taro-ui";
import Canvas from "@/components/Canvas";
import "./index.less";
import { useTimer } from "@/hooks/useTime";
import Taro from "@tarojs/taro";

const Grade = () => {
  const params = Taro.getCurrentInstance()?.router?.params;
  const total = params?.number || 10;
  console.log(total);
  const canvasRef = useRef<CanvasDrawingRef>(null);
  const [fenmu, setFenmu] = useState(getRandomInt(101, 1000));
  const [fenzi, setFenzi] = useState(getRandomInt(100, fenmu));
  const {
    done,
    display,
    onRight,
    onError,
    onReset: onResetRight,
    right,
  } = useRight({ total });
  const [drawVisible, setDrawVisible] = useState(false);
  const [currentTime, onResetTime] = useTimer();
  const [resultVisible, setResultVisible] = useState(false);

  useEffect(() => {
    if (done) {
      setResultVisible(true);
    }
  }, [done]);

  const onOk = () => {
    const ok = onPrecision(fenzi / fenmu, +keyboardVal);
    if (ok) {
      onRight();
    } else {
      onError();
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
  }

  const onSure = () => {
    setResultVisible(false);
    onRestart();
    onResetRight();
    onResetTime();
  };

  return (
    <View>
      <AtNoticebar>
        <View>建议写到小数后2~3位</View>
        <View>允许误差范围：±2%</View>
      </AtNoticebar>
      <View className="header">
        <AtTag name="tag-1" type="primary" circle>
          {display}
        </AtTag>
        <View>{currentTime}</View>
        <AtIcon
          onClick={() => setDrawVisible(true)}
          value="edit"
          color="#6686f7"
        ></AtIcon>
      </View>

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
      {keyboard}

      {/* 画板 */}
      <AtCurtain
        isOpened={drawVisible}
        onClose={() => setDrawVisible(false)}
        closeBtnPosition="bottom-right"
      >
        <View style={{ width: "100%", height: "500px" }}>
          <Canvas ref={canvasRef} />
        </View>
      </AtCurtain>
      {/* 结果 */}
      <AtModal isOpened={resultVisible}>
        <AtModalHeader>恭喜你做完了</AtModalHeader>
        <AtModalContent>
          正确率是：{right} / {total}
        </AtModalContent>
        <AtModalAction>
          <Button onClick={onSure}>确定</Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
};

export default Grade;
