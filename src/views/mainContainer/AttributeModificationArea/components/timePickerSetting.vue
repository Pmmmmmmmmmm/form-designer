<template >
  <div class="timePicker-setting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="timePickerSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="timePickerSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small " />
              <el-option label="迷你" value="mini" />
            </el-select>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="timePickerSetting.field"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时间选择器" name="second">
        <div class="common">
          <div class="item">
            <span>完全只读：</span>
            <el-switch v-model="timePickerSetting.props.readonly"></el-switch>
          </div>
          <div class="item">
            <span>禁用</span>
            <el-switch v-model="timePickerSetting.props.disabled"></el-switch>
          </div>
          <div class="item">
            <span>文本框可输入</span>
            <el-switch v-model="timePickerSetting.props.editable"></el-switch>
          </div>
          <div class="item">
            <span>是否显示清除按钮</span>
            <el-switch v-model="timePickerSetting.props.clearable"></el-switch>
          </div>

          <div class="item">
            <span>是否为时间范围选择</span>
            <el-switch v-model="timePickerSetting.props.isRange"></el-switch>
          </div>
          <div class="item">
            <span>选择范围时的分隔符</span>
            <el-input v-model="timePickerSetting.props.rangeSeparator"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="特有选项" name="third">
        <div class="common">
          <div class="item">
            <span>开始时间</span>
            <el-input v-model="timePickerSetting.props.pickerOptions.start"></el-input>
          </div>
          <div class="item">
            <span>结束时间</span>
            <el-input v-model="timePickerSetting.props.pickerOptions.end"></el-input>
          </div>
          <div class="item">
            <span>间隔时间</span>
            <el-input v-model="timePickerSetting.props.pickerOptions.step"></el-input>
          </div>
          <div class="item">
            <span>最小时间，小于该时间的时间段将被禁用</span>
            <el-input v-model="timePickerSetting.props.pickerOptions.minTime"></el-input>
          </div>
          <div class="item">
            <span>最大时间，大于该时间的时间段将被禁用</span>
            <el-input v-model="timePickerSetting.props.pickerOptions.maxTime"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'timePickerSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      timePickerSetting: {
        type: 'FD_timePicker',
        field: 'cate_id',
        title: '请输入标题',
        value: '',
        props: {
          // 完全只读
          readonly: '',
          // 禁用
          disabled: '',
          // 文本框可输入
          editable: '',
          // 是否显示清除按钮
          clearable: '',
          // 输入框尺寸
          size: '',
          // 是否为时间范围选择，仅对<el-time-picker>有效
          isRange: '',

          // 当前时间日期选择器特有的选项
          pickerOptions: {
            // 开始时间
            start: '',
            // 结束时间
            end: '',
            // 间隔时间
            step: '',
            // 最小时间，小于该时间的时间段将被禁用
            minTime: '',
            // 最大时间，大于该时间的时间段将被禁用
            maxTime: ''
          },
          // 选择范围时的分隔符
          rangeSeparator: ''
        }
      }
    }
  },
  components: {},
  created() {
    // 组件内部的参数赋值为预先存在的参数
    Object.assign(this.timePickerSetting, this.currentItem)
  },
  mounted() {},
  methods: {
    // 删除确认
    confirm(index) {
      this.timePickerSetting.options.splice(index, 1)
    },
    //添加选项
    addOptions() {
      this.timePickerSetting.options.push({
        value: `value${this.timePickerSetting.options.length + 1}`,
        label: `选项${this.timePickerSetting.options.length + 1}`
      })
    }
  },
  watch: {
    timePickerSetting: {
      // 由于监听的是obj类型，所以newValue/oldValue都引用其地址，值相同
      handler(newValue, oldValue) {
        // 改为计数器后弃用
        // if (!isNaN(this.timePickerSetting.props.min) && !isNaN(this.timePickerSetting.props.max)) {
        //   this.$emit('emitOpintions', newValue, this.currentItem.index, this.currentItem.innerIndex)
        // }

        this.$emit('emitOpintions', newValue, this.currentItem.index, this.currentItem.innerIndex)
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.timePicker-setting {
  min-height: 100%;
  .common {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      flex-direction: column;
      align-items: left;
      span {
        font-size: 15px;
        margin: 15px 10px 5px 5px;
      }
    }
  }
  .timePicker-options {
    margin: 0 auto;
    padding: 10px;

    li {
      position: relative;
      list-style: none;
      background-color: #ecf5ff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      margin: 10px 0;
      border: 1px solid #909399;
      border-radius: 4px;
      &:first-child {
        .el-button {
          width: 100%;
          height: 50px;
          font-size: 25px;
        }
      }
      .title {
        padding-left: 10px;
        height: 34px;
        line-height: 34px;
        margin: 0;
      }
      .del {
        position: absolute;
        top: 2px;
        right: 2px;
        .el-button {
          width: 30px;
          height: 30px;
          padding: 0;
        }
      }
    }
  }
}
/deep/.el-tabs__nav {
  width: 100%;
  display: flex;
  .el-tabs__item {
    flex: 1;
    padding: 0 !important ;
    text-align: center;
  }
}
</style>
