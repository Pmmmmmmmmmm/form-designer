<template>
  <div class="Fd_Input">
    <span>{{setting.title+'：'}}</span>
    <el-input v-model="setting.value"></el-input>
  </div>
</template>
<script>
export default {
  name: 'Fd_Input',
  props: ['currentOptions'],

  data() {
    return {
      setting: {
        title: '请输入标题',
        value: '10'
      }
    }
  },
  created() {
    // 如果传进来的currentOptions中包含设置参数则将其赋值到setting
    this.currentOptions.title && (this.setting = this.currentOptions)
  },
  methods: {},
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
.Fd_Input {
  display: flex;
  align-items: center;
  .el-input {
    min-width: 120px;
    max-width: 250px;
  }
}
</style>


