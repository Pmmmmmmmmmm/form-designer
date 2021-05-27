<template >
  <div class="select-setting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="selectSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="selectSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small " />
              <el-option label="迷你" value="mini" />
            </el-select>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="selectSetting.field"></el-input>
          </div>
          <div class="item">
            <span>预设值：</span>
            <el-input v-model="selectSetting.value"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选项设置：" name="second">
        <ul class="select-options">
          <li>
            <el-button type="primary" icon="el-icon-plus" :disabled="selectSetting.options.length == 4" @click="addOptions"></el-button>
          </li>
          <li v-for="(item, index) in selectSetting.options.length" :key="index">
            <div class="title">
              <span>项名：</span>
            </div>
            <el-input v-model="selectSetting.options[index].label"></el-input>
            <div class="title">
              <span>值：</span>
            </div>
            <el-input v-model="selectSetting.options[index].value"></el-input>
            <div class="del">
              <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
                <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
              </el-popconfirm>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="下拉框设置" name="third">
        <div class="common">
          <div class="item">
            <span>是否多选：</span>
            <el-input v-model="selectSetting.props.multiple"></el-input>
          </div>
          <div class="item">
            <span>是否禁用：</span>
            <el-switch v-model="selectSetting.props.disabled"></el-switch>
          </div>
          <div class="item">
            <span>是否可以清空选项：</span>
            <el-input v-model="selectSetting.props.clearable"></el-input>
          </div>
          <div class="item">
            <span>占位符：</span>
            <el-input v-model="selectSetting.props.placeholder"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'selectSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      selectSetting: {
        type: 'FD_Select',
        field: 'cate_id',
        title: '请输入标题',
        value: '',
        options: [
          { value: '104', label: '生态蔬菜' },
          { value: '105', label: '新鲜水果' }
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
  components: {},
  created() {
    // 组件内部的参数赋值为预先存在的参数
    Object.assign(this.selectSetting, this.currentItem)
  },
  mounted() {},
  methods: {
    // 删除确认
    confirm(index) {
      this.selectSetting.options.splice(index, 1)
    },
    //添加选项
    addOptions() {
      this.selectSetting.options.push({
        value: `value${this.selectSetting.options.length + 1}`,
        label: `选项${this.selectSetting.options.length + 1}`
      })
    }
  },
  watch: {
    selectSetting: {
      // 由于监听的是obj类型，所以newValue/oldValue都引用其地址，值相同
      handler(newValue, oldValue) {
        // 改为计数器后弃用
        // if (!isNaN(this.selectSetting.props.min) && !isNaN(this.selectSetting.props.max)) {
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
.select-setting {
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
  .select-options {
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
