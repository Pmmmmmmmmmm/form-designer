<template >
  <div class="switchSetting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置：" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="switchSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="switchSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small" />
              <el-option label="迷你" value="mini" />
            </el-select>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="switchSetting.field"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选项设置：" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'switchSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      switchSetting: {
        type: 'Fd_switch',
        title: '请输入标题',
        field: 'is_postage',
        value: true,
        props: {
          size: ''
        }
      }
    }
  },
  components: {},
  created() {
    // 组件内部的参数赋值为预先存在的参数
    Object.assign(this.switchSetting, this.currentItem)
  },
  mounted() {},
  methods: {},
  watch: {
    switchSetting: {
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
.switchSetting {
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
}
/deep/.el-tabs__nav {
  width: 100%;
  .el-tabs__item {
    width: 50%;
    text-align: center;
  }
}
</style>
