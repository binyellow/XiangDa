import { View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { AtIcon, AtMessage } from "taro-ui";
import Taro from "@tarojs/taro";

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onReload: () => void;
}
const index = (props: ModalProps) => {
  const { visible, children, onClose, onReload } = props;

  if (!visible) return null;
  return (
    <View className="modal" catchMove>
      <View className="content">{children}</View>
      <View className="operation">
        <AtIcon
          value="reload"
          size="30"
          color="#fff"
          onClick={() => {
            onReload();
          }}
        ></AtIcon>
        <AtIcon
          value="close-circle"
          size="30"
          color="#fff"
          onClick={() => {
            onClose();
          }}
        ></AtIcon>
      </View>
    </View>
  );
};

export default index;
