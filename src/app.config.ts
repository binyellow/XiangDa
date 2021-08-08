export default {
  pages: ["pages/index/index", "pages/found/index", "pages/mine/index"],
  tabBar: {
    list: [
      {
        iconPath: "assets/bottomTabs/tab.png",
        selectedIconPath: "assets/bottomTabs/tab-active.png",
        pagePath: "pages/index/index",
        text: "首页"
      },
      {
        iconPath: "assets/bottomTabs/tab1.png",
        selectedIconPath: "assets/bottomTabs/tab1-active.png",
        pagePath: "pages/found/index",
        text: "广场"
      },
      {
        iconPath: "assets/bottomTabs/tab2.png",
        selectedIconPath: "assets/bottomTabs/tab2-active.png",
        pagePath: "pages/mine/index",
        text: "我"
      }
    ],
    color: "#000",
    selectedColor: "#56abe4",
    backgroundColor: "#fff",
    borderStyle: "white"
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  }
};
