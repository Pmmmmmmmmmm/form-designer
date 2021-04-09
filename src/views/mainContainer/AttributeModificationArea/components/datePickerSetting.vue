<template >
  <div class="datePicker-setting">
    <!-- <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="datePickerSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="datePickerSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small " />
              <el-option label="迷你" value="mini" />
            </el-select>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="datePickerSetting.field"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时间选择器" name="second">
        <div class="common">
          <div class="item">
            <span>完全只读：</span>
            <el-switch v-model="datePickerSetting.props.readonly"></el-switch>
          </div>
          <div class="item">
            <span>禁用</span>
            <el-switch v-model="datePickerSetting.props.disabled"></el-switch>
          </div>
          <div class="item">
            <span>文本框可输入</span>
            <el-switch v-model="datePickerSetting.props.editable"></el-switch>
          </div>
          <div class="item">
            <span>是否显示清除按钮</span>
            <el-switch v-model="datePickerSetting.props.clearable"></el-switch>
          </div>

          <div class="item">
            <span>是否为时间范围选择</span>
            <el-switch v-model="datePickerSetting.props.isRange"></el-switch>
          </div>
          <div class="item">
            <span>选择范围时的分隔符</span>
            <el-input v-model="datePickerSetting.props.rangeSeparator"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="特有选项" name="third">
        <div class="common">
          <div class="item">
            <span>开始时间</span>
            <el-input v-model="datePickerSetting.props.pickerOptions.start"></el-input>
          </div>
          <div class="item">
            <span>结束时间</span>
            <el-input v-model="datePickerSetting.props.pickerOptions.end"></el-input>
          </div>
          <div class="item">
            <span>间隔时间</span>
            <el-input v-model="datePickerSetting.props.pickerOptions.step"></el-input>
          </div>
          <div class="item">
            <span>最小时间，小于该时间的时间段将被禁用</span>
            <el-input v-model="datePickerSetting.props.pickerOptions.mindate"></el-input>
          </div>
          <div class="item">
            <span>最大时间，大于该时间的时间段将被禁用</span>
            <el-input v-model="datePickerSetting.props.pickerOptions.maxdate"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>-->
    datePickeer
  </div>
</template>

<script>
export default {
  name: 'datePickerSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      datePickerSetting: {
        type: 'FD_datePicker',
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
          // 是否为时间范围选择，仅对<el-date-picker>有效
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
            mindate: '',
            // 最大时间，大于该时间的时间段将被禁用
            maxdate: ''
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
    Object.assign(this.datePickerSetting, this.currentItem)
  },
  mounted() {},
  methods: {
    // 删除确认
    confirm(index) {
      this.datePickerSetting.options.splice(index, 1)
    },
    //添加选项
    addOptions() {
      this.datePickerSetting.options.push({
        value: `value${this.datePickerSetting.options.length + 1}`,
        label: `选项${this.datePickerSetting.options.length + 1}`
      })
    }
  },
  watch: {
    datePickerSetting: {
      // 由于监听的是obj类型，所以newValue/oldValue都引用其地址，值相同
      handler(newValue, oldValue) {
        // 改为计数器后弃用
        // if (!isNaN(this.datePickerSetting.props.min) && !isNaN(this.datePickerSetting.props.max)) {
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
.datePicker-setting {
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
  .datePicker-options {
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
