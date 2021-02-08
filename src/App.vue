<template>
  <div id="app">
    <header>
      <h3>Form Designer</h3>
    </header>
    <div class="container">
      <div class="leftAside"><ComponentSelectionArea /></div>
      <div class="main"><EditingArea /></div>
      <div class="rightAside"><AttributeModificationArea /></div>
    </div>
  </div>
</template>

<script>
// 引入主体的三块区域
import ComponentSelectionArea from "./components/ComponentSelectionArea";
import EditingArea from "./components/EditingArea";
import AttributeModificationArea from "./components/AttributeModificationArea";
import Radio from "./components/FormComponents/Radio.vue";
//引入表单组件
export default {
  name: "app",
  components: {
    ComponentSelectionArea,
    EditingArea,
    AttributeModificationArea,
  },
};
</script>

<style lang="less" scoped>
#app {
  position: fixed;
  width: 100vw;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
    height: calc(100% - 50px);
    .leftAside {
      width: 280px;
    }
    .main {
      flex: 1;
      background-color: #ecf5ff;
    }
    .rightAside {
      width: 300px;
      background-color: cornflowerblue;
    }
  }
}
</style>

