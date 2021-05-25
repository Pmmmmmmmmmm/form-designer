<template>
  <div class="AttributeModificationArea">
    <!-- 单选框设置 -->
    <radio-setting v-if="currentItem.type==='Fd_Radio'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 多选框设置 -->
    <checkbox-setting v-else-if="currentItem.type==='Fd_Checkbox'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 输入框设置 -->
    <input-setting v-else-if="currentItem.type==='Fd_Input'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 计数器设置 -->
    <input-number-setting
      v-else-if="currentItem.type==='Fd_InputNumber'"
      v-bind="$attrs"
      v-on="$listeners"
      :currentItem="currentItem"
    />
    <!-- 选择器设置 -->
    <select-setting v-else-if="currentItem.type==='Fd_Select'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 级联选择器设置 -->
    <cascader-setting v-else-if="currentItem.type==='Fd_Cascader'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 开关设置 -->
    <switch-setting v-else-if="currentItem.type==='Fd_Switch'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 滑块设置 -->
    <slider-setting v-else-if="currentItem.type==='Fd_Slider'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 滑块设置 -->
    <timePicker-setting
      v-else-if="currentItem.type==='Fd_TimePicker'"
      v-bind="$attrs"
      v-on="$listeners"
      :currentItem="currentItem"
    />
    <!-- 滑块设置 -->
    <datePicker-setting
      v-else-if="currentItem.type==='Fd_DatePicker'"
      v-bind="$attrs"
      v-on="$listeners"
      :currentItem="currentItem"
    />
    <div class="other" v-else>请选择具体组件</div>
  </div>
</template>

<script>
import RadioSetting from './components/radioSetting'
import CheckboxSetting from './components/checkboxSetting'
import InputSetting from './components/inputSetting'
import InputNumberSetting from './components/inputNumberSetting'
import SelectSetting from './components/selectSetting'
import cascaderSetting from './components/cascaderSetting'
import switchSetting from './components/switchSetting'
import sliderSetting from './components/sliderSetting'
import timePickerSetting from './components/timePickerSetting'
import datePickerSetting from './components/datePickerSetting'
export default {
  name: 'AttributeModificationArea',
  props: ['currentItem'],
  data() {
    return {}
  },
  components: {
    RadioSetting,
    CheckboxSetting,
    InputSetting,
    InputNumberSetting,
    SelectSetting,
    cascaderSetting,
    switchSetting,
    sliderSetting,
    timePickerSetting,
    datePickerSetting
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.AttributeModificationArea {
  position: relative;
  overflow: auto;
  height: 100%;
  border: 1px solid #dcdfe6;
  background-color: #ecf5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  min-width: 300px;
  .other {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 25px;
    text-align: center;
    width: 100%;
    color: #c0c4cc;
  }
}
</style>
