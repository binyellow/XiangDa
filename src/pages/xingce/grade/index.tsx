import { Button, View } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { getRandomInt } from "@/utils/math";
import { CanvasDrawingRef } from "@/components/Canvas";
import useKeyboard from "@/components/Keyboard/useKeyboard";
import { onPrecision } from "@/utils/math";
import useRight from "@/hooks/useRight";
import {
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
import Modal from "@/components/Modal";

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
          <View className="header">
            <AtTag name="tag-1" type="primary" circle>
              {display}
            </AtTag>
            <View>{currentTime}</View>
            <View>
              <AtIcon
                onClick={() => setDrawVisible(true)}
                value="edit"
                color="#6686f7"
              ></AtIcon>
              {/* 画板 */}
              <Modal
                visible={drawVisible}
                onClose={() => setDrawVisible(false)}
              >
                <Canvas ref={canvasRef} />
              </Modal>
            </View>
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
    </View>
  );
};

export default Grade;
