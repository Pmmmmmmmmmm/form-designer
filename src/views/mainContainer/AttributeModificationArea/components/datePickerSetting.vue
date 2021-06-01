<template >
  <div class="datePicker-setting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="datePickerSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="datePickerSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="large" />
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
      <el-tab-pane label="日期选择器" name="second">
        <div class="common">
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
            <span>占位符</span>
            <el-input v-model="datePickerSetting.props.placeholder"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
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
        type: 'FD_DatePicker',
        field: 'section_day',
        title: '活动日期',
        value: '',
        props: {
          placeholder: '请选择活动日期'
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
