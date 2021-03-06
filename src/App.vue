<template>
  <div id="app">
    <header>
      <h3>Form Designer</h3>
    </header>
    <div class="container">
      <div class="leftAside">
        <ComponentSelectionArea :mouseChangeFlag="mouseChangeFlag" @emitbtnid="pushComponents" />
      </div>
      <div class="main">
        <EditingArea
          @mouseover.native="mouseover"
          @mouseout.native="mouseout"
          @getSettingId="changeCurrentId"
          :currentOptions="currentOptions"
        />
      </div>
      <div class="rightAside">
        <AttributeModificationArea :currentId="currentId" @emitOpintions="emitOpintions" />
      </div>
    </div>
  </div>
</template>

<script>
// 引入主体的三块区域
import ComponentSelectionArea from "./components/ComponentSelectionArea";
import EditingArea from "./components/EditingArea";
import AttributeModificationArea from "./components/AttributeModificationArea";
//引入表单组件
export default {
  name: "app",
  data() {
    return {
      //鼠标进入编辑区域
      mouseChangeFlag: false,
      //最近加入拖动列表的元素
      currentId: '',
      //当前操作的配置参数
      currentOptions: {}
    };
  },
  components: {
    ComponentSelectionArea,
    EditingArea,
    AttributeModificationArea,
  },
  methods: {
    mouseover() {
      this.mouseChangeFlag = true;
    },
    mouseout() {
      this.mouseChangeFlag = false;
    },
    pushComponents(item) {
      this.$children[1].listdata.push(
        {
          id: item.id,
          settingOptions: {
            value: 'pm'
          }
        });
      this.currentId = item.id;
    },
    changeCurrentId(index) {
      this.currentId = this.$children[1].listdata[index].id;
    },
    emitOpintions(options) {
      this.currentOptions = options;
    }

  },
};
</script>

<style lang="less" scoped>
#app {
  position: fixed;
  width: 100vw;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  header {
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    background-color: #409eff;
    color: #ecf5ff;
    border-bottom: 1px solid #dcdfe6;
    h3 {
      margin: 0;
      margin-left: 15px;
    }
  }
  .container {
    position: relative;
    display: flex;
    height: calc(100% - 40px);
    .leftAside {
      width: 280px;
    }
    .main {
      min-width: 500px;
      flex: 1;
      background-color: #ecf5ff;
    }
    .rightAside {
      width: 300px;
    }
  }
}
</style>

