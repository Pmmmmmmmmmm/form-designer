<template>
  <div class="slider">
    <span>{{setting.title+'：'}}</span>
    <el-slider v-model="setting.value"></el-slider>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: ['currentOptions'],
  data() {
    return {
      setting: {
        title: '请输入标题',
        value: 20
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
.slider {
  display: flex;
  align-items: center;
  .el-slider {
    flex: 1;
    min-width: 100px;
  }
}
</style>