<template>
  <div class="Radio">
    <el-radio-group v-model="radio">
      <el-radio v-for="(item, index) in options" :key="index" :label="item.label">{{item.text}}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: "Radio",
  props: ['index', 'currentOptions'],

  data() {
    return {
      options: [
        { text: '选项1', label: 'valeu1' },
        { text: '选项2', label: 'value2' },
      ],
      radio: '30',
    };
  },
  created() {
    this.currentOptions && (this.options = this.currentOptions)
  },
  methods: {
  },
  watch: {
    currentOptions: {
      handler: function () {
        this.options = this.currentOptions;
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
</style>


