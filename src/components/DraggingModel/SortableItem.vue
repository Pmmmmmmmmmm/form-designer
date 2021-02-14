<template>
  <li class="list-item FCC">
    <div :is="item"></div>
  </li>
</template>
<script>
import { ContainerMixin, ElementMixin } from "vue-slicksort";
import Cascader from "../FormComponents/Cascader.vue";
import Checkbox from "../FormComponents/Checkbox.vue";
import DatePicker from "../FormComponents/DatePicker.vue";
import Formswitch from "../FormComponents/Formswitch.vue";
import Input from "../FormComponents/Input.vue";
import InputNumber from "../FormComponents/InputNumber.vue";
import Radio from "../FormComponents/Radio.vue";
import Select from "../FormComponents/Select.vue";
import Slider from "../FormComponents/Slider.vue";
import TimePicker from "../FormComponents/TimePicker.vue";
export default {
  name: "",
  mixins: [ElementMixin],
  props: ["item"],
  computed: {},
  components: {
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
};
</script>
<style scoped>
.list-item {
  list-style: none;
  background: #ecf5ff;
  margin-bottom: 10px;
}
.FCC {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 2px dashed #909399;
  border-collapse: collapse;
  border-radius: 2px;
  margin-bottom: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: move;
}
</style>
