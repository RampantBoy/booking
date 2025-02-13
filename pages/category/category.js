import {
    profix,
    getRequest,
    postRequest
} from '../../utils/request'
Page({
    /**
     * 页面的初始数据
     */
    data: {
      icon: '', // 当前选择的图标
      showIconSelector: false, // 是否显示图标选择器
      iconList: [
        {
          name: '娱乐',
          icons: ['icon_01', 'icon_02', 'icon_03', 'icon_04', 'icon_05', 'icon_06', 'icon_07', 'icon_08', 'icon_09', 'icon_10', 'icon_11', 'icon_12', 'icon_13']
        },
        {
          name: '饮食',
          icons: ['icon_14', 'icon_15', 'icon_16', 'icon_17', 'icon_18', 'icon_19', 'icon_20', 'icon_21', 'icon_22', 'icon_23', 'icon_24', 'icon_25', 'icon_26', 'icon_27', 'icon_28']
        },
        {
          name: '医疗',
          icons: ['icon_27', 'icon_28', 'icon_29', 'icon_30', 'icon_31', 'icon_32', 'icon_33', 'icon_34', 'icon_35', 'icon_36', 'icon_37', 'icon_38']
        },
        {
          name: '学习',
          icons: ['icon_39', 'icon_40', 'icon_41', 'icon_42', 'icon_43', 'icon_44', 'icon_45', 'icon_46', 'icon_47', 'icon_48']
        },
        {
          name: '交通',
          icons: ['icon_49', 'icon_50', 'icon_51', 'icon_52', 'icon_53', 'icon_54', 'icon_55', 'icon_56', 'icon_57', 'icon_58']
        },
        {
          name: '购物',
          icons: ['icon_59', 'icon_60', 'icon_61', 'icon_62', 'icon_63', 'icon_64', 'icon_65', 'icon_66', 'icon_67', 'icon_68', 'icon_69', 'icon_70', 'icon_71', 'icon_72', 'icon_73', 'icon_74', 'icon_75', 'icon_76', 'icon_77', 'icon_78', 'icon_79', 'icon_80', 'icon_81', 'icon_82', 'icon_83']
        },
        {
          name: '个人',
          icons: ['icon_84', 'icon_85', 'icon_86', 'icon_87', 'icon_88', 'icon_89', 'icon_90', 'icon_91', 'icon_92']
        },
        {
          name: '家居',
          icons: ['icon_93', 'icon_94', 'icon_95', 'icon_96', 'icon_97', 'icon_98', 'icon_99', 'icon_100', 'icon_101', 'icon_102', 'icon_103', 'icon_104', 'icon_105']
        },
        {
          name: '办公',
          icons: ['icon_106', 'icon_107', 'icon_108', 'icon_109', 'icon_110', 'icon_111', 'icon_112', 'icon_113']
        },
        {
          name: '收入',
          icons: ['icon_114', 'icon_115', 'icon_116', 'icon_117', 'icon_118']
        }
      ]
    },
    onRemoveImage() {
        this.setData({
            icon: ''
        })
    },
    // 图标上传
    onUploadImage() {
        const thiz = this
        wx.chooseMedia({
            count: 1,
            success: function (response) {
                if (response.tempFiles[0].size > (200 * 1024)) {
                    wx.showToast({
                        title: '图标不能大于200KB',
                        icon: 'none'
                    })
                    return
                }
                wx.getFileSystemManager().readFile({
                    filePath: response.tempFiles[0].tempFilePath, //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: readRes => { //成功的回调
                        thiz.setData({
                            icon: 'data:image/png;base64,' + readRes.data
                        })
                    },
                    fail: err => { //失败
                        wx.showToast({
                            title: '文件上传失败！',
                            icon: 'none'
                        })
                    }
                })

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            form: options
        })
    },
    formSubmit(e) {
        // 分类名称
        let name = e.detail.value.name
        let icon = this.data.icon
        if (!name) {
            wx.showToast({
                title: '请填写分类名称',
                icon: 'error'
            })
            return
        }
        if (name.lenth > 5) {
            wx.showToast({
                title: '分类名称长度为5字符以内',
            })
        }
        if (!icon) {
            wx.showToast({
                title: '请选择分类图标',
                icon: 'error'
            })
            return
        }
        if (!icon) {
            wx.showToast({
                title: '页面失效！',
                icon: 'error'
            })
            return
        }
        postRequest("/api/category/save", {
            ...this.data.form,
            name,
            icon
        }).then(res => {
            if (res.status == 0) {
                // 返回到上个页面
                let pages = getCurrentPages();
                let beforePage = pages[pages.length - 2];
                //getNoteDetail为上一个页面的刷新数据函数；
                beforePage.init({
                    bookId: this.data.form.bookId
                });
                wx.navigateBack({
                    delta: 1
                });
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'error'
                })
            }
        }).catch(err => {
            wx.showToast({
                title: err,
                icon: 'error'
            })
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },


    
     // 显示图标选择器
  onShowIconSelector() {
    this.setData({
      showIconSelector: true
    });
  },

  // 隐藏图标选择器
  onHideIconSelector() {
    this.setData({
      showIconSelector: false
    });
  },

  // 选择图标
  onSelectIcon(e) {
    const selectedIcon = e.currentTarget.dataset.icon; // 获取选中图标的路径
    this.setData({
      icon: selectedIcon, // 更新当前选择的图标
      showIconSelector: false // 关闭图标选择器
    });
  },

  // 移除图标
  onRemoveImage() {
    this.setData({
      icon: '' // 清空当前选择的图标
    });
  }
})