import { View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { AtButton } from "taro-ui";

export interface KeyboardProps {
  onRestart: () => void;
  onClear: () => void;
  onDelete: () => void;
  onInput: (value: string | number) => void;
  onOk: () => void;
  style?: React.CSSProperties;
}

export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0];
const index = (props: KeyboardProps) => {
  const { onRestart, onClear, onDelete, onInput, onOk, style } = props;
  return (
    <View className="at-row at-row--wrap keyboard" style={style}>
      <AtButton className="at-col at-col-4" onClick={onRestart}>
        重开
      </AtButton>
      <AtButton className="at-col at-col-4" onClick={onClear}>
        清空
      </AtButton>
      <AtButton className="at-col at-col-4" onClick={onDelete}>
        退格
      </AtButton>
      {numbers.map((number) => {
        return (
          <AtButton
            className="at-col at-col-4"
            key={number}
            onClick={() => onInput(number)}
          >
            {number}
          </AtButton>
        );
      })}
      <AtButton className="at-col at-col-4" onClick={onOk}>
        确定
      </AtButton>
    </View>
  );
};

export default index;
