import Canvas, { CanvasDrawingRef } from "@/components/Canvas";
import Modal from "@/components/Modal";
import { View } from "@tarojs/components";
import React, { useRef, useState } from "react";
import { AtIcon } from "taro-ui";

const DrawingBoard = () => {
  const [drawVisible, setDrawVisible] = useState(false);
  const canvasRef = useRef<CanvasDrawingRef>(null);

  const handleReload = () => {
    canvasRef?.current?.clearCanvas();
  };
  return (
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
        onReload={handleReload}
      >
        <Canvas ref={canvasRef} />
      </Modal>
    </View>
  );
};

export default DrawingBoard;
