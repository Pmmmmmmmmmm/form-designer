<template>
  <div class="ComponentSelectionArea">
    <div class="basic">
      <h4>基础表单组件</h4>
      <FormComponentButton v-for="(item, index) in ButtonData" :key="index" :item="item" v-bind="$attrs" v-on="$listeners">
        <span slot="title">{{ item.name }}</span>
        <div slot="example" :is="item.id"></div>
      </FormComponentButton>
    </div>
  </div>
</template>

<script>
import FormComponentButton from "./Components/FormComponentButton";
import Cascader from "../../../components/FormComponents/Cascader";
import Checkbox from "../../../components/FormComponents/Checkbox";
import DatePicker from "../../../components/FormComponents/Cascader";
import Formswitch from "../../../components/FormComponents/Formswitch";
import Input from "../../../components/FormComponents/Input";
import InputNumber from "../../../components/FormComponents/InputNumber";
import Radio from "../../../components/FormComponents/Radio";
import Select from "../../../components/FormComponents/Select";
import Slider from "../../../components/FormComponents/Slider";
import TimePicker from "../../../components/FormComponents/TimePicker";
export default {
  name: "ComponentSelectionArea",
  data() {
    return {
      ButtonData: [
        { name: "单选框", id: "Radio" },
        { name: "多选框", id: "Checkbox" },
        { name: "输入框", id: "Input" },
        { name: "计数器", id: "InputNumber" },
        { name: "选择器", id: "Select" },
        { name: "级联选择器", id: "Cascader" },
        { name: "开关", id: "Formswitch" },
        { name: "滑块", id: "Slider" },
        { name: "时间选择", id: "TimePicker" },
        { name: "日期选择", id: "DatePicker" },
      ],
    };
  },
  props: [],
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

