<template>
  <div class="AttributeModificationArea">
    <!-- 单选框设置 -->
    <radio-setting v-if="currentItem.type=='radio'" v-bind="$attrs" v-on="$listeners" :currentItem="currentItem" />
  </div>
</template>

<script>
import RadioSetting from './components/radioSetting'
export default {
  name: 'AttributeModificationArea',
  props: ['currentItem'],
  data() {
    return {}
  },
  components: { RadioSetting },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.AttributeModificationArea {
  overflow: auto;
  height: 100%;
  border: 1px solid #dcdfe6;
  background-color: #ecf5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  min-width: 300px;
}
</style>
