<template>
  <div class="ComponentSelectionArea">
    <div class="basic">
      <h4>基础表单组件</h4>
      <el-button id="RadioButton" @mousedown.native="buttonclick"
        >单选框</el-button
      >
      <el-button>多选框</el-button>
      <el-button>输入框</el-button>
      <el-button>计数器</el-button>
      <el-button>选择器</el-button>
      <el-button>级联选择</el-button>
      <el-button>开关</el-button>
      <el-button>滑块</el-button>
      <el-button>时间选择</el-button>
      <el-button>日期选择</el-button>
    </div>
    <div class="advance">
      <h4>进阶表单组件</h4>
      <el-button>日期时间选择</el-button>
      <el-button>文件上传</el-button>
      <el-button>评分</el-button>
      <el-button>穿梭框</el-button>
    </div>
    <div class="template">
      <h4>预设模板</h4>
      <el-button>事件申请</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentSelectionArea",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    buttonclick() {
      console.log(10);
    },
  },
};
</script>
<style lang="less" scoped>
.ComponentSelectionArea {
  padding: 10px;
  border: 1px solid #dcdfe6;
  background-color: #ecf5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  .basic,
  .advance {
    .el-button {
      width: 120px;
      margin: 0 0 5px 5px;
    }
  }
  h4 {
    margin-left: 10px;
  }
}
</style>

