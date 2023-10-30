export enum xingCeTypeEnum {
  "ziliao" = "ziliao", // 资料
  "yanyu" = "yanyu", //言语
  "panduan" = "panduan", //判断
  "shuliang" = "shuliang", //数量
  "changshi" = "changshi", //常识
}

export const defaultOpenMap = {
  [xingCeTypeEnum.ziliao]: true,
  [xingCeTypeEnum.yanyu]: false,
  [xingCeTypeEnum.panduan]: false,
  [xingCeTypeEnum.shuliang]: false,
  [xingCeTypeEnum.changshi]: false,
};
