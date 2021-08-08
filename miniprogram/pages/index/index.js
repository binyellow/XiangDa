//index.js
const app = getApp();

Page({
  data: {
    avatarUrl: "./user-unlogin.png",
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: "",
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse("open-data.type.userAvatarUrl"), // 如需尝试获取用户信息可改为false
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: "../chooseLib/chooseLib",
      });
      return;
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      });
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: "login",
      data: {
        name: "huangbin",
      },
      success: (res) => {
        console.log("[云函数] [login] user openid: ", res.result.openid);
        app.globalData.openid = res.result.openid;
        wx.navigateTo({
          url: "../userConsole/userConsole",
        });
      },
      fail: (err) => {
        console.error("[云函数] [login] 调用失败", err);
        wx.navigateTo({
          url: "../deployFunctions/deployFunctions",
        });
      },
    });
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        wx.showLoading({
          title: "上传中",
        });

        const filePath = res.tempFilePaths[0];

        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`;
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: (res) => {
            console.log("[上传文件] 成功：", res);

            app.globalData.fileID = res.fileID;
            app.globalData.cloudPath = cloudPath;
            app.globalData.imagePath = filePath;

            wx.navigateTo({
              url: "../storageConsole/storageConsole",
            });
          },
          fail: (e) => {
            console.error("[上传文件] 失败：", e);
            wx.showToast({
              icon: "none",
              title: "上传失败",
            });
          },
          complete: () => {
            wx.hideLoading();
          },
        });
      },
      fail: (e) => {
        console.error(e);
      },
    });
  },

  openDoor() {
    wx.request({
      url: "https://pabaspmj.szxhdz.com:18000/xhapp/service/iacs/info/house/host/commandByHouseHostId?token=eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6Ik5vIHBlcm1pc3Npb24iLCJzdWIiOiIxMzYzODQyNTk5MiIsImV4cCI6MTYyOTU1Mzc4Nn0.0DuSgBweODoWxh7Zl3a30Zq9ls4j448U1P7BPLoubmSF_RESHG4S-iPeOAAIV2F3LdFxP-6ZNR_CaDxCQGsHiw",
      method: "POST",
      data: {
        houseHostId: "3151e0bf-fd02-48f3-bc29-e53fcebfb3dc",
        peopleId: "80edb5b6-9fda-42e2-9d3d-bf5ee0de9353",
        roleType: "0",
      },
      success(res) {
        console.log(res.data);
      },
    });
  },

  getPhone(e) {
    wx.showToast({
      title: "成功",
      icon: "success",
      duration: 2000,
    });

    wx.showModal({
      title: "提示",
      content: "这是一个模态弹窗",
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定");
          console.log(e);
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      },
    });
  },
});
