<template >
  <div class="sliderSetting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用设置：" name="first">
        <div class="common">
          <div class="item">
            <span>标题：</span>
            <el-input v-model="sliderSetting.title"></el-input>
          </div>
          <div class="item">
            <span>尺寸：</span>
            <el-select v-model="sliderSetting.props.size" placeholder="请选择尺寸">
              <el-option label="普通尺寸" value="medium" />
              <el-option label="小尺寸" value="small" />
              <el-option label="迷你" value="mini" />
            </el-select>
          </div>
          <div class="item">
            <span>字段名：</span>
            <el-input v-model="sliderSetting.field"></el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="滑块设置：" name="second">
        <div class="common">
          <div class="item">
            <span>最小值</span>
            <el-input v-model="sliderSetting.props.min"></el-input>
          </div>
          <div class="item">
            <span>最大值</span>
            <el-input v-model="sliderSetting.props.max"></el-input>
          </div>
          <div class="item">
            <span>是否禁用</span>
            <el-input v-model="sliderSetting.props.disabled"></el-input>
          </div>
          <div class="item">
            <span>步长</span>
            <el-input v-model="sliderSetting.props.step"></el-input>
          </div>
          <div class="item">
            <span>是否为范围选择</span>
            <el-input v-model="sliderSetting.props.range"></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'sliderSetting',
  props: ['currentItem'],
  data() {
    return {
      activeName: 'first',
      sliderSetting: {
        type: 'Fd_slider',
        title: '请输入标题',
        field: 'is_postage',
        value: [],
        props: {
          min: '',
          max: '',
          disabled: '',
          step: '',
          // 是否为范围选择
          range: '',

          size: ''
        }
      }
    }
  },
  components: {},
  created() {
    // 组件内部的参数赋值为预先存在的参数
    Object.assign(this.sliderSetting, this.currentItem)
  },
  mounted() {},
  methods: {},
  watch: {
    sliderSetting: {
      // 由于监听的是obj类型，所以newValue/oldValue都引用其地址，值相同
      handler(newValue, oldValue) {
        console.log(arguments)
        this.$emit('emitOpintions', newValue, this.currentItem.index, this.currentItem.innerIndex)
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.sliderSetting {
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
