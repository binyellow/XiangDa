import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = (): [string, () => void, () => void] => {
  const [time, setTime] = useState(0);
  const timeRef = useRef(time); // 新增timeRef来存储time值
  const intervalRef = useRef(0);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => {
        timeRef.current = prevTime + 1; // 更新timeRef的值
        return timeRef.current;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (time): string => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const reset = useCallback(() => {
    setTime(0);
    timeRef.current = 0; // 重置timeRef的值
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  return [formatTime(timeRef.current), reset, stop];
};