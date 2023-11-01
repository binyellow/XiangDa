import { View } from "@tarojs/components";
import { useRef } from "react";
import { AtTag } from "taro-ui";
import useRight from "@/hooks/useRight";
import { useTimer } from "@/hooks/useTime";
import { CanvasDrawingRef } from "@/components/Canvas";
import "./header.less";
import DrawingBoard from "@/components/Canvas/DrawingBoard";

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
  const [currentTime, onResetTime, stop, doTime] = useTimer();
  const canvasRef = useRef<CanvasDrawingRef>(null);


  const header = (
    <View className="header">
      <AtTag name="tag-1" type="primary" circle>
        {display}
      </AtTag>
      <View>{currentTime}</View>
      <DrawingBoard />
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
    time: currentTime,
    stopTime: stop,
    doTime,
  };
};

export default useHeader;
