<template >
  <div class="checkboxSetting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置：" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="checkboxSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="checkboxSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small" />
              <el-option label="迷你" value="mini" />
            </el-select>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="checkboxSetting.field"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选项设置：" name="second">
        <ul class="radio-options">
          <li>
            <el-button type="primary" icon="el-icon-plus" :disabled="checkboxSetting.options.length == 5" @click="addOptions"></el-button>
          </li>
          <li v-for="(item, index) in checkboxSetting.options.length" :key="index">
            <div class="title">
              <span>项名：</span>
            </div>
            <el-input v-model="checkboxSetting.options[index].label"></el-input>
            <div class="title">
              <span>值：</span>
            </div>
            <el-input v-model="checkboxSetting.options[index].value"></el-input>
            <div class="del">
              <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
                <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
              </el-popconfirm>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'checkboxSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      checkboxSetting: {
        type: 'checkbox',
        title: '请输入标题',
        field: 'is_postage',
        value: [],
        options: [
          { label: '选项1', value: '10' },
          { label: '选项2', value: '20' }
        ],
        props: {
          size: ''
        }
      }
    }
  },
  components: {},
  created() {
    // 组件内部的参数赋值为预先存在的参数
    Object.assign(this.checkboxSetting, this.currentItem)
  },
  mounted() {},
  methods: {
    // 删除确认
    confirm(index) {
      this.checkboxSetting.options.splice(index, 1)
    },
    //添加选项
    addOptions() {
      this.checkboxSetting.options.push({
        label: '选项' + (this.checkboxSetting.options.length + 1),
        value: this.checkboxSetting.options.length + 1
      })
    }
  },
  watch: {
    checkboxSetting: {
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
.checkboxSetting {
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
  .radio-options {
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
  .el-tabs__item {
    width: 50%;
    text-align: center;
  }
}
</style>
