import Taro from "@tarojs/taro";
import { Canvas } from "@tarojs/components";
import {
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { isH5, isWeapp } from "@/utils/env";
import CanvasDraw from "react-canvas-draw";

interface CanvasDrawingProps {
  width?: string;
  height?: string;
}

export interface CanvasDrawingRef {
  clearCanvas: () => void;
}

function CanvasDrawing(
  props: CanvasDrawingProps,
  ref: RefObject<CanvasDrawingRef>
) {
  const [ctx, setCtx] = useState<any>();
  const lastPointRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<any>();

  useEffect(() => {
    const canvasContext = Taro.createCanvasContext("myCanvas");
    setCtx(canvasContext);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      clearCanvas,
    };
  });

  const getCanvasSize = (): Promise<[number, number]> => {
    return new Promise((resolve) => {
      let width = 0;
      let height = 0;
      const query = Taro.createSelectorQuery();
      query
        .select("#myCanvas")
        .boundingClientRect()
        .exec((res) => {
          width = res[0].width;
          height = res[0].height;
          resolve([width, height]);
        });
    });
  };

  const clearCanvas = async () => {
    if (isWeapp()) {
      const [width, height] = await getCanvasSize();
      ctx.clearRect(0, 0, width, height);
      ctx.draw();
    } else if (isH5()) {
      canvasRef?.current?.clear();
    }
  };

  const onTouchStart = (e) => {
    const { x, y } = e.touches[0];
    lastPointRef.current = { x, y };
  };

  const onTouchMove = (e) => {
    const { x, y } = e.touches[0];
    const { x: lastX, y: lastY } = lastPointRef.current;
    drawLine(lastX, lastY, x, y);
    lastPointRef.current = { x, y };
  };

  const drawLine = (x1, y1, x2, y2) => {
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.draw(true);
    }
  };

  if (isH5()) {
    return (
      <CanvasDraw
        // 笔宽
        brushRadius={1}
        brushColor={"black"}
        ref={canvasRef}
        style={{ width: "100%", height: "100%", background: "none" }}
        hideGrid
        // 延迟笔画
        lazyRadius={0}
        catenaryColor="transparent"
      />
    );
  }

  return (
    <Canvas
      id="myCanvas"
      canvasId="myCanvas"
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    ></Canvas>
  );
}

export default forwardRef(CanvasDrawing);
