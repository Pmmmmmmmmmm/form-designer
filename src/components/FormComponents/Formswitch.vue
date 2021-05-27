<template>
  <div class="Formswitch">
    <span>{{setting.title+'：'}}</span>
    <el-switch v-model="setting.value" active-color="#409EFF" inactive-color="#c0c4cc" :disabled="setting.props.disabled"></el-switch>
  </div>
</template>

<script>
export default {
  name: 'Formswitch',
  props: ['currentOptions'],
  data() {
    return {
      setting: {
        title: '请输入标题',
        value: true,
        props: {
          disabled: false
        }
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
        this.setting = newValue
        this.$forceUpdate()
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.Formswitch {
  display: flex;
}
</style>