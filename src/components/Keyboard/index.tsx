import { View } from "@tarojs/components";
import React from "react";
import styles from "./index.module.less";
import { AtButton } from "taro-ui";
import classNames from "classnames";
import { isH5 } from "@/utils/env";

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

  const cls = classNames(
    "at-col",
    {
      [styles["mobile-number-item"]]: isH5(),
    },
    styles["at-col-4"]
  );
  return (
    <View
      className={classNames("at-row", "at-row--wrap", styles["keyboard"])}
      style={style}
    >
      <AtButton className={cls} onClick={onRestart}>
        重开
      </AtButton>
      <AtButton className={cls} onClick={onClear}>
        清空
      </AtButton>
      <AtButton className={cls} onClick={onDelete}>
        退格
      </AtButton>
      {numbers.map((number) => {
        return (
          <AtButton
            className={cls}
            key={number}
            onClick={() => onInput(number)}
          >
            {number}
          </AtButton>
        );
      })}
      <AtButton className={cls} onClick={onOk}>
        确定
      </AtButton>
    </View>
  );
};

export default index;
