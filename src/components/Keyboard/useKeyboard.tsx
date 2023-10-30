import React, { useState } from "react";
import Keyboard, { KeyboardProps } from "./index";

const defaultVal = "0.";
const useKeyboard = (props: Pick<KeyboardProps, "onRestart" | "onOk">) => {
  const [value, setValue] = useState(defaultVal);

  const onInput = (val) => {
    if (val === "." && value.includes(".")) {
      return;
    }
    setValue(value + val);
  };

  const onDelete = () => {
    let val = value.slice(0, -1);
    if (!val.length) {
      val = defaultVal;
    }
    setValue(val);
  };

  const memoKeyboard = (
    <Keyboard
      {...props}
      onClear={() => setValue(defaultVal)}
      onDelete={onDelete}
      onInput={onInput}
      style={{position: 'absolute', bottom: '50rpx'}}
    />
  );

  return {
    keyboard: memoKeyboard,
    value,
    onReset: () => setValue(defaultVal),
  };
};

export default useKeyboard;
