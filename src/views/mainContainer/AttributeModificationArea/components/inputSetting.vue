<template >
  <div class="input-setting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置：" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="inputSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="inputSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small " />
              <el-option label="迷你" value="mini" />
            </el-select>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="inputSetting.field"></el-input>
          </div>
          <div class="item">
            <span>预设值：</span>
            <el-input v-model="inputSetting.value"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选项设置：" name="second">
        <div class="input-options">
          <div class="item">
            <span>类型：</span>
            <el-input v-model="inputSetting.props.type"></el-input>
          </div>
          <div class="item">
            <span>最大输入长度：</span>
            <el-input v-model="inputSetting.props.maxlength"></el-input>
          </div>
          <div class="item">
            <span>最小输入长度：</span>
            <el-input v-model="inputSetting.props.minlength"></el-input>
          </div>
          <div class="item">
            <span>是否可清空：</span>
            <el-input v-model="inputSetting.props.clearable"></el-input>
          </div>
          <div class="item">
            <span>禁用：</span>
            <el-input v-model="inputSetting.props.disabled"></el-input>
          </div>
          <div class="item">
            <span>输入框占位文本：</span>
            <el-input v-model="inputSetting.props.placeholder"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'InputSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      inputSetting: {
        type: 'input',
        title: '请输入标题',
        field: 'is_postage',
        value: '1',
        props: {
          type: '',
          maxlength: '',
          minlength: '',
          placeholder: '',
          clearable: '',
          disabled: '',
          size: ''
        }
      }
    }
  },
  components: {},
  created() {
    // 组件内部的参数赋值为预先存在的参数
    Object.assign(this.inputSetting, this.currentItem)
  },
  mounted() {},
  methods: {
    // 删除确认
    confirm(index) {
      this.inputSetting.options.splice(index, 1)
    },
    //添加选项
    addOptions() {
      this.inputSetting.options.push({
        value: `value${this.inputSetting.options.length + 1}`,
        label: `选项${this.inputSetting.options.length + 1}`
      })
    }
  },
  watch: {
    inputSetting: {
      // 由于监听的是obj类型，所以newValue/oldValue都引用其地址，值相同
      handler(newValue, oldValue) {
        this.$emit('emitOpintions', newValue, this.currentItem.index, this.currentItem.innerIndex)
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.input-setting {
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
  .input-options {
    margin: 0 auto;
    padding: 10px;

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
}
/deep/.el-tabs__nav {
  width: 100%;
  .el-tabs__item {
    width: 50%;
    text-align: center;
  }
}
</style>
