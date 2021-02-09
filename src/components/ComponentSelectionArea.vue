<template>
  <div class="ComponentSelectionArea">
    <div class="basic">
      <h4>基础表单组件</h4>
      <FormComponentButton>
        <span slot="title">单选框</span>
        <div slot="example">
          <Radio />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">多选框</span>
        <div slot="example">
          <Checkbox />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">输入框</span>
        <div slot="example">
          <Input />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">计数器</span>
        <div slot="example">
          <InputNumber />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">选择器</span>
        <div slot="example">
          <Select />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">级联选择器</span>
        <div slot="example">
          <Cascader />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">开关</span>
        <div slot="example">
          <Formswitch />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">滑块</span>
        <div slot="example">
          <Slider />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">时间选择</span>
        <div slot="example">
          <TimePicker />
        </div>
      </FormComponentButton>
      <FormComponentButton>
        <span slot="title">日期选择</span>
        <div slot="example">
          <DatePicker />
        </div>
      </FormComponentButton>
    </div>
  </div>
</template>

<script>
import Cascader from "./Cascader.vue";
import FormComponentButton from "./FormComponentButton";
import Checkbox from "./FormComponents/Checkbox.vue";
import DatePicker from "./FormComponents/DatePicker.vue";
import Formswitch from "./FormComponents/Formswitch.vue";
import Input from "./FormComponents/Input.vue";
import InputNumber from "./FormComponents/InputNumber.vue";
import Radio from "./FormComponents/Radio.vue";
import Select from "./FormComponents/Select.vue";
import Slider from "./FormComponents/Slider.vue";
import TimePicker from "./FormComponents/TimePicker.vue";
export default {
  name: "ComponentSelectionArea",
  data() {
    return {};
  },
  components: {
    FormComponentButton,
    Radio,
    Checkbox,
    Input,
    InputNumber,
    Select,
    Cascader,
    Formswitch,
    Slider,
    TimePicker,
    DatePicker,
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.ComponentSelectionArea {
  height: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  background-color: #ecf5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  h4 {
    margin-left: 10px;
  }
}
</style>

