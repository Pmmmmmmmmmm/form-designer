<template>
  <div class="AttributeModificationArea">
    <!-- 单选框设置 -->
    <template v-if="currentId=='Radio'">
      <div>
        <h4>选项设置：</h4>
        <ul class="radioOptions">
          <li>
            <el-button type="primary" icon="el-icon-plus" :disabled="radioOptions.contentOptions.length == 4" @click="addOptions"></el-button>
          </li>
          <li v-for="(item, index) in radioOptions.contentOptions.length" :key="index">
            <div class="title">
              <span>项名：</span>
            </div>
            <el-input v-model="radioOptions.contentOptions[index].text"></el-input>
            <div class="title">
              <span>值：</span>
            </div>
            <el-input v-model="radioOptions.contentOptions[index].label"></el-input>
            <div class="del">
              <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
                <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
              </el-popconfirm>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "AttributeModificationArea",
  props: ['currentId'],
  data() {
    return {
      //单选框
      radioOptions: {
        contentOptions: [
          { label: '', text: '' },
          { label: '', text: '' }
        ]
      }



    };
  },
  components: {},
  created() { },
  mounted() { },
  methods: {
    // 删除确认
    confirm(index) {
      this.radioOptions.contentOptions.splice(index, 1)
    },
    //添加选项
    addOptions() {
      this.radioOptions.contentOptions.push({ label: '', text: '' });
    }
  },
  watch: {
    radioOptions: {
      handler(oldValue, newValue) {
        this.$emit('emitOpintions', newValue.contentOptions)
      },
      deep: true
    }


  }
};
</script>
<style lang="less" scoped>
.AttributeModificationArea {
  height: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  background-color: #ecf5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow-y: scroll;
  min-width: 220px;

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
}
</style>
