<template>
  <div class="AttributeModificationArea">
    <!-- 单选框设置 -->
    <radio-setting v-if="currentItem.type==='radio'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 多选框设置 -->
    <checkbox-setting v-if="currentItem.type==='checkbox'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <!-- 输入框设置 -->
    <input-setting v-if="currentItem.type==='Fd_Input'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
    <div class="other" v-else>请选择具体组件</div>
  </div>
</template>

<script>
import RadioSetting from './components/radioSetting'
import CheckboxSetting from './components/checkboxSetting'
import InputSetting from './components/inputSetting'
export default {
  name: 'AttributeModificationArea',
  props: ['currentItem'],
  data() {
    return {}
  },
  components: { RadioSetting, CheckboxSetting, InputSetting },
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
