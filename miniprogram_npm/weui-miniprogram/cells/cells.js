var globalThis = this,
  self = this;
module.exports = require("../_commons/0.js")([{
  ids: [4],
  modules: {
    6: function (t, e, s) {
      t.exports = s(79)
    },
    79: function (t, e) {
      Component({
        options: {
          addGlobalClass: !0,
          multipleSlots: !0
        },
        properties: {
          titleRight: {
            type: String,
            value: ""
          },
          title: {
            type: String,
            value: ""
          },
          extClass: {
            type: String,
            value: ""
          },
          footer: {
            type: String,
            value: ""
          },
          ariaRole: {
            type: String,
            value: ""
          }
        },
        data: {
          firstItem: null,
          checkboxCount: 0,
          checkboxIsMulti: !1,
          outerClass: "",
          childClass: ""
        },
        relations: {
          "../cell/cell": {
            type: "descendant",
            linked: function (t) {
              this.data.firstItem || (this.data.firstItem = t), t !== this.data.firstItem && t.setOuterClass("weui-cell_wxss")
            }
          },
          "../form-page/form-page": {
            type: "ancestor"
          },
          "../checkbox-group/checkbox-group": {
            type: "descendant",
            linked: function (t) {
              this.setData({
                checkboxCount: this.data.checkboxCount + 1,
                checkboxIsMulti: t.data.multi
              })
            },
            unlinked: function (t) {
              this.setData({
                checkboxCount: this.data.checkboxCount - 1,
                checkboxIsMulti: t.data.multi
              })
            }
          }
        },
        methods: {
          setCellMulti: function (t) {
            this.setData({
              checkboxIsMulti: t
            })
          },
          setCellsClass: function (t) {
            this.setData({
              childClass: t
            })
          },
          setOuterClass: function (t) {
            this.setData({
              outerClass: t
            })
          }
        }
      })
    }
  },
  entries: [
    [6, 0]
  ]
}]);