import { View } from "@tarojs/components";
import React, { useRef, useState } from "react";
import { AtIcon, AtTag } from "taro-ui";
import Modal from "@/components/Modal";
import useRight from "@/hooks/useRight";
import { useTimer } from "@/hooks/useTime";
import Canvas from "@/components/Canvas";
import { CanvasDrawingRef } from "@/components/Canvas";
import './header.less';

const useHeader = (props) => {
  const { total } = props;
  const {
    done,
    display,
    onRight,
    onError,
    onReset: onResetRight,
    right,
  } = useRight({ total });
  const [currentTime, onResetTime] = useTimer();
  const [drawVisible, setDrawVisible] = useState(false);
  const canvasRef = useRef<CanvasDrawingRef>(null);

  const header = (
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
        <Modal visible={drawVisible} onClose={() => setDrawVisible(false)}>
          <Canvas ref={canvasRef} />
        </Modal>
      </View>
    </View>
  );

  return {
    header,
    onResetTime,
    right,
    onResetRight,
    onError,
    onRight,
    done,
  }
};

export default useHeader;
