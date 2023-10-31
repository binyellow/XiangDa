/*
 * 处理计算、下一道、记录错题等
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2023-10-31
 * @copyright Copyright (c) 2020, Tencent
 */

import useKeyboard from "@/components/Keyboard/useKeyboard";
import { onPrecision } from "@/utils/math";
import { useState } from "react";

export interface HistoryProps {
  originTimu?: string; // 原题  "1/2"
  timu: number; // 题目结果
  answer: number; // 用户答案
  error: number; // 精度差
  ok?: boolean; // 是否正确
}

const useHistory = ({
  fenzi,
  fenmu,
  onRight,
  onError,
  onResetTime,
  onResetTimu,
}) => {
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const onOk = () => {
    const [ok, error] = onPrecision(fenzi / fenmu, +keyboardVal);
    setHistory([
      ...history,
      {
        originTimu: `${fenzi}/${fenmu}`,
        timu: fenzi / fenmu,
        answer: +keyboardVal,
        error,
        ok,
      },
    ]);
    if (ok) {
      onRight();
    } else {
      onError(error);
    }
    onReset();
    onResetTimu();
  };
  const {
    keyboard,
    value: keyboardVal,
    onReset,
  } = useKeyboard({ onRestart, onOk });

  function onRestart() {
    onResetTimu();
    onResetTime();
  }

  return {
    history,
    keyboard,
    keyboardVal,
    onResetHistory: () => setHistory([]),
  };
};

export default useHistory;
