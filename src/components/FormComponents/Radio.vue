<template>
  <div class="Radio">
    <el-radio-group v-model="radio">
      <button @click="test()" lable="aaa"></button>
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: "Radio",
  props:['item','index'],
  data() {
    return {
      radio: 3,
    };
  },
  methods: {
    test() {
      console.log(this.index);
    },
  },
};
</script>
<style lang="less" scoped>
</style>


