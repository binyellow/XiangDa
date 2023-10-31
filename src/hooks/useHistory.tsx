/*
 * 历史做题记录
 * @author: branhuang <branhuang@tencent.com>
 * @version: 0.0.1
 * @date: 2023-10-31
 * @copyright Copyright (c) 2020, Tencent
 */

import React, { useState } from "react";

export interface HistoryProps {
  timu: number; // 题目
  answer: number; // 用户答案
  precision: number; // 精度差
}

const useHistory = () => {
  const [history, setHistory] = useState<HistoryProps[]>([]);
};

export default useHistory;
