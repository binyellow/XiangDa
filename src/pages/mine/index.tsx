import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import UserInfo from "./components/UserInfo";
import useLogin from "./hooks/useLogin";
import "./index.less";

const Mine = () => {
  const [onLogin] = useLogin();

  const handleClick = () => {
    onLogin();
  };
  return (
    <View className='mine'>
      <UserInfo />
    </View>
  );
};

export default Mine;
