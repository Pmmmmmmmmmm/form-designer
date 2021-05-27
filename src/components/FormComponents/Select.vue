<template>
  <div class="Fd_Select">
    <span>{{setting.title+'：'}}</span>
    <el-select v-model="setting.value" placeholder="请选择">
      <el-option
        v-for="item in setting.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="setting.props.disabled"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'Fd_Select',
  props: ['currentOptions'],

  data() {
    return {
      setting: {
        field: 'cate_id',
        title: '请输入标题',
        value: '',
        options: [
          { value: '104', label: '生态蔬菜', disabled: false },
          { value: '105', label: '新鲜水果', disabled: false }
        ],
        props: {
          disabled: '',
          multiple: '',
          size: '',
          clearable: '',
          placeholder: ''
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


