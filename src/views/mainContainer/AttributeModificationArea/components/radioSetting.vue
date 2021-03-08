<template>
  <div class="radioSetting">
    <h4>选项设置：</h4>
    <ul class="radioOptions">
      <li>
        <el-button type="primary" icon="el-icon-plus" :disabled="options.contentOptions.length == 4" @click="addOptions"></el-button>
      </li>
      <li v-for="(item, index) in options.contentOptions.length" :key="index">
        <div class="title">
          <span>项名：</span>
        </div>
        <el-input v-model="options.contentOptions[index].text"></el-input>
        <div class="title">
          <span>值：</span>
        </div>
        <el-input v-model="options.contentOptions[index].label"></el-input>
        <div class="del">
          <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
            <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
          </el-popconfirm>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'radioSetting',
  props: ['currentItem'],
  data() {
    return { //单选框
      options: {
        contentOptions: [
          { label: 'value1', text: '选项1' },
          { label: 'value2', text: '选项2' }
        ]
      }
    }
  },
  components: {},
  created() {
    this.$emit('emitOpintions', this.options.contentOptions, this.currentItem.index)
  },
  mounted() { },
  methods: { // 删除确认
    confirm(index) {
      this.options.contentOptions.splice(index, 1)
    },
    //添加选项
    addOptions() {
      this.options.contentOptions.push(
        {
          label: `value${this.options.contentOptions.length + 1}`,
          text: `选项${this.options.contentOptions.length + 1}`
        });
      console.log(this.currentItem);
    }
  },
  watch: {
    radioOptions: {
      handler(oldValue, newValue) {
        this.$emit('emitOpintions', newValue.contentOptions, this.currentItem.index)
      },
      deep: true
    }

  }
}
</script>
<style lang="less" scoped>
.radioOptions {
  width: 90%;
  margin: 0 auto;
  padding: 0;
  margin-bottom: 150px;
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
</style>
