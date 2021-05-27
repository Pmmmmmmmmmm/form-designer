<template>
  <div class="DatePicker">
    <div class="block">
      <span>{{setting.title+'：'}}</span>
      <el-date-picker
        v-model="setting.value"
        type="date"
        :placeholder="setting.props.placeholder"
        :picker-options="pickerOptions"
        :disabled="setting.props.disabled"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: ['currentOptions'],

  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      setting: {
        type: 'FD_DatePicker',
        field: 'section_day',
        title: '活动日期',
        value: ['2018-02-20', '2021-02-15'],
        props: {
          type: 'datetimerange',
          format: 'yyyy-MM-dd HH:mm:ss',
          placeholder: '请选择活动日期'
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
