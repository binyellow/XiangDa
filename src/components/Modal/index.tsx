import { View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { AtIcon, AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}
const index = (props: ModalProps) => {
  const { visible, children, onClose } = props;

  if (!visible) return null;
  return (
    <View className="modal" catchMove>
      <View className="content">{children}</View>
      <AtIcon
        value="close-circle"
        size="30"
        color="#fff"
        onClick={() => {
          onClose();
        }}
      ></AtIcon>
    </View>
  );
};

export default index;
