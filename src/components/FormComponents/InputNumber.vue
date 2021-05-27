<template>
  <div class="Fd_InputNumber">
    <span>{{setting.title+'：'}}</span>

    <el-input-number
      v-model="setting.value"
      :min="setting.props.min"
      :max="setting.props.max"
      :step="setting.props.step"
      :disabled="setting.props.disabled"
    ></el-input-number>
  </div>
</template>
<script>
export default {
  name: 'Fd_InputNumber',
  props: ['currentOptions'],

  data() {
    return {
      setting: {
        title: '请输入标题',
        value: '',
        props: {
          min: 0,
          max: 10,
          step: 1,
          disabled: '',
          size: ''
        }
      }
    }
  },
  created() {
    // 如果传进来的currentOptions中包含设置参数则将其赋值到setting
    this.currentOptions.title && (this.setting = this.currentOptions)

    // //设置页中，input组件输出为字符串类型，最大值与最小值需要转化为数字类型
    // (改为计数器后弃用)
    // this.setting.props.min -= 0
    // this.setting.props.max -= 0
  },

  watch: {
    // 检查到currentOptions改变则立即赋值给setting
    currentOptions: {
      handler: function(oldValue, newValue) {
        // console.log(oldValue, newValue)

        this.setting = newValue

        // console.log('change')
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.Fd_InputNumber {
  display: flex;
  align-items: center;
}
</style>


