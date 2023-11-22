/*
 * 展示error信息
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2023-10-31
 * @copyright Copyright (c) 2020, Tencent
 */

import React, {
  RefObject,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { HistoryProps } from "@/hooks/useHistory";
import {
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtTag,
} from "taro-ui";
import { Button, View } from "@tarojs/components";
import styles from "./ErrorResult.module.less";
import { roundNumber } from "@/utils/math";

export interface ErrorResultRefProps {
  show: (info: HistoryProps) => void;
  hide: () => void;
}

const Item = ({ label, value }) => {
  return (
    <View className={styles.item}>
      <AtTag>{label}</AtTag>
      {value}
    </View>
  );
};

const ErrorResult = forwardRef((props, ref: RefObject<ErrorResultRefProps>) => {
  const [visible, setVisible] = useState(false);
  const [errorInfo, setErrorInfo] = useState<HistoryProps>();

  useImperativeHandle(ref, () => {
    return {
      show(info) {
        setVisible(true);
        setErrorInfo(info);
      },
      hide() {
        setVisible(false);
      },
    };
  });

  return (
    <AtModal isOpened={visible} className={styles.modal}>
      <AtModalHeader>回答错误</AtModalHeader>
      <AtModalContent>
        <View className={styles.content}>
          <Item label="正确值" value={roundNumber(errorInfo?.timu)} />
          <Item label="你的值" value={roundNumber(errorInfo?.answer)} />
          <Item label="误差率" value={`${roundNumber(errorInfo?.error)} %`} />
        </View>
      </AtModalContent>
      <AtModalAction>
        <Button onClick={() => setVisible(false)}>确定</Button>
      </AtModalAction>
    </AtModal>
  );
});

export default ErrorResult;

/**
 *  modal模板
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AtModal } from "taro-ui";

const ErrorResult = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    };
  });

  return <AtModal isOpened={visible}>
    
  </AtModal>;
});

export default ErrorResult;
 */
