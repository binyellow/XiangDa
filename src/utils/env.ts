// env.js
const isWeapp = () => process.env.TARO_ENV === "weapp";
const isH5 = () => process.env.TARO_ENV === "h5";

export { isWeapp, isH5 };
