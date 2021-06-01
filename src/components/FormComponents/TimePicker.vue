<template>
  <div class="TimePicker">
    <span>{{setting.title+'：'}}</span>
    <el-time-select
      v-model="setting.value"
      :picker-options="setting.props.pickerOptions"
      placeholder="选择时间"
      :disabled="setting.props.disabled"
    ></el-time-select>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: ['currentOptions'],
  data() {
    return {
      setting: {
        title: '请输入标题',
        value: '',
        props: {
          isRange: false,
          disabled: false,
          size: ''
        }
      }
    }
  },
  components: {},
  created() {
    // 如果传进来的currentOptions中包含设置参数则将其赋值到setting
    this.currentOptions.title && (this.setting = this.currentOptions)
  },
  methods: {},
  watch: {
    // 检查到currentOptions改变则立即赋值给setting
    currentOptions: {
      handler: function(oldValue, newValue) {
        this.setting = newValue
        this.$forceUpdate()
      },
      deep: true
    }
  }
}
</script>
<style scoped>
</style>
