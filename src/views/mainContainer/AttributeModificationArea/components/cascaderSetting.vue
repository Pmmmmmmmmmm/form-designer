<template >
  <div class="cascader-setting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="cascaderSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-cascader v-model="cascaderSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small " />
              <el-option label="迷你" value="mini" />
            </el-cascader>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="cascaderSetting.field"></el-input>
          </div>
          <div class="item">
            <span>预设值：</span>
            <el-input v-model="cascaderSetting.value"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选项设置：" name="second">
        <div class="block"></div>

        <ul class="cascader-options">
          <li>
            <el-button type="primary" icon="el-icon-plus" :disabled="cascaderSetting.options.length == 4" @click="addOptions"></el-button>
          </li>
          <li v-for="(item, index) in cascaderSetting.options.length" :key="index">
            <div class="title">
              <span>项名：</span>
            </div>
            <el-input v-model="cascaderSetting.options[index].label"></el-input>
            <div class="title">
              <span>值：</span>
            </div>
            <el-input v-model="cascaderSetting.options[index].value"></el-input>
            <div class="toolbar">
              <div class="set">
                <el-button type="primary" icon="el-icon-setting" @click="showDetail(index)"></el-button>
              </div>
              <div class="del">
                <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
                  <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
                </el-popconfirm>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="下拉框设置" name="third">
        <div class="common">
          <div class="item">
            <span>是否多选：</span>
            <el-switch v-model="cascaderSetting.props.multiple"></el-switch>
          </div>
          <div class="item">
            <span>是否禁用：</span>
            <el-switch v-model="cascaderSetting.props.disabled"></el-switch>
          </div>
          <div class="item">
            <span>是否可以清空选项：</span>
            <el-switch v-model="cascaderSetting.props.clearable"></el-switch>
          </div>
          <div class="item">
            <span>占位符：</span>
            <el-input v-model="cascaderSetting.props.placeholder"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'cascaderSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      currentItemIndex: '',
      cascaderSetting: {
        type: 'FD_cascader',
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
    Object.assign(this.cascaderSetting, this.currentItem)
  },
  mounted() {},
  methods: {
    append(node, data) {
      // const newChild = { label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  },
  watch: {
    cascaderSetting: {
      // 由于监听的是obj类型，所以newValue/oldValue都引用其地址，值相同
      handler(newValue, oldValue) {
        // 改为计数器后弃用
        // if (!isNaN(this.cascaderSetting.props.min) && !isNaN(this.cascaderSetting.props.max)) {
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
.cascader-setting {
  min-height: 100%;
  /deep/.el-tabs__header {
    margin: 0;
  }
  .el-tabs__content {
    .common {
      box-sizing: border-box;
      width: 100%;
      min-height: calc(100vh - 91px);
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
    .block {
      box-sizing: border-box;
      display: block;
      width: 100%;

      /deep/.el-tree {
        padding: 10px;
        min-height: calc(100vh - 91px);
        .el-tree-node__content {
          position: relative;
          display: block;
          height: fit-content;
          margin: 2px;
          padding: 2px;
          border: #4aa2bd 1px solid;
          border-radius: 6px;

          .setting-window {
            display: inline-block;
            .item {
              margin-bottom: 2px;
              .el-input {
                // height: 20px;
                width: 100px;
              }
            }
          }
          .toolbar {
            display: flex;
            position: absolute;
            top: 2px;
            right: 2px;
            .el-button {
              width: 25px;
              height: 25px;
              padding: 0;
              margin: 2px;
            }
          }
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
