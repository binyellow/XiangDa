import React, { useMemo, useState } from "react";

interface useRightProps {
  total: number;
}

const useRight = (props: useRightProps) => {
  const { total } = props;
  const [rightNumber, setRightNumber] = useState(0);
  const [count, setcount] = useState(0);
  const [done, setDone] = useState(false);

  const display = useMemo(() => `${count}/${total}`, [total, count]);

  const beforeCal = () => {
    setcount(count + 1);
    if (count >= total - 1) {
      setDone(true);
    }
  };

  const onReset = () => {
    setRightNumber(0);
    setcount(0);
    setDone(false);
  };
  const onRight = () => {
    beforeCal();
    setRightNumber(rightNumber + 1);
  };
  const onError = () => {
    beforeCal();
  };

  return {
    done,
    right: rightNumber,
    error: total - rightNumber,
    display,
    onRight,
    onError,
    onReset,
  };
};

export default useRight;
