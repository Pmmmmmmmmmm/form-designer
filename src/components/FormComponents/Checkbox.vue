<template>
  <div class="Checkbox">
    <span>{{setting.title+'：'}}</span>
    <el-checkbox-group v-model="setting.value" :disabled="setting.props.disabled">
      <el-checkbox v-for="(item, index) in setting.options" :key="index" :value="item.value" :label="item.label"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: ['currentOptions'],
  data() {
    return {
      setting: {
        title: '请输入标题',
        options: [
          { label: '选项1', value: '22' },
          { label: '选项2', value: '11' }
        ],
        value: [],
        props: { disabled: false }
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
        this.setting = newValue
        this.$forceUpdate()
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.Checkbox {
  display: flex;
}
</style>