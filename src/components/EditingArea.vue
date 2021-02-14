<template>
  <div class="EditingArea">
    <dragging-container />
  </div>
</template>

<script>
import DraggingContainer from "./DraggingModel/DraggingContainer.vue";

export default {
  name: "EditingArea",
  data() {
    return {};
  },
  components: { DraggingContainer },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.EditingArea {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 0 0 10px 10px;
  height: calc(100% - 40px);
  overflow-y: scroll;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #c6e2ff;
}
</style>
