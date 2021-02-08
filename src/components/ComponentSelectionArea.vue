<template>
  <div class="ComponentSelectionArea">
    <div class="basic">
      <h4>基础表单组件</h4>
      <FormComponentButton>
        <span slot="title">单选框</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">多选框</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">输入框</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">计数器</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">选择器</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">级联选择器</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">开关</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">滑块</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">时间选择</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">日期选择</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
    </div>
    <div class="advance">
      <h4>进阶表单组件</h4>
      <FormComponentButton>
        <span slot="title">文件上传</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">评分</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">穿梭框</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">日期时间选择</span>
        <div slot="example">
          <el-radio>备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
          <el-radio :label="0">备选项</el-radio>
        </div>
      </FormComponentButton>
    </div>
  </div>
</template>

<script>
import FormComponentButton from "./FormComponentButton";
export default {
  name: "ComponentSelectionArea",
  data() {
    return {
      show: false,
      mousemoveflag: false,
    };
  },
  components: {
    FormComponentButton,
  },
  methods: {
    buttondown() {
      console.log(1);
      this.show = true;
      this.mousemoveflag = true;
    },
    buttonup() {
      console.log(2);
      if (this.show) {
        this.show = false;
        this.mousemoveflag = false;
      }
    },
    mousemove() {
      console.log(3);
    },
  },
};
</script>
<style lang="less" scoped>
.ComponentSelectionArea {
  padding: 10px;
  height: 100%;
  border: 1px solid #dcdfe6;
  background-color: #ecf5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  h4 {
    margin-left: 10px;
  }
}
</style>

