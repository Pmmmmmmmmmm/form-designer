<template>
  <div class="Radio">
    <span>{{setting.title+'：'}}</span>
    <el-radio-group v-model="setting.value">
      <el-radio v-for="(item, index) in setting.options" :key="index" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  props: ['currentOptions'],

  data() {
    return {
      setting: {
        title: '请输入标题',
        options: [
          { label: '选项1', value: '10' },
          { label: '选项2', value: '20' }
        ],
        value: '10'
      }
    }
  },
  created() {
    // 如果传进来的currentOptions中包含设置参数则将其赋值到setting
    this.currentOptions.options && (this.setting = this.currentOptions)
  },
  methods: {},
  watch: {
    // 检查到currentOptions改变则立即赋值给setting
    currentOptions: {
      handler: function(oldValue, newValue) {
        // console.log(oldValue, newValue)

        this.setting = newValue
        this.$forceUpdate()

        // console.log('change')
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.radio {
  display: flex;
}
</style>


