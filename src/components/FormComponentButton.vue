<template>
  <div class="FormComponentButton">
    <el-button @mousedown.native="drag($event)">
      <slot name="title"></slot>
      <div
        :class="{ FCC: mouseChangeFlag, example: !mouseChangeFlag }"
        v-show="show"
      >
        <div class="style" ref="dragTarget">
          <slot name="example"></slot>
        </div>
      </div>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "FormComponentButton",
  data() {
    return {
      show: false,
    };
  },
  components: {},
  props: ["item", "mouseChangeFlag"],
  methods: {
    drag(eo) {
      let dragTarget = this.$refs.dragTarget;
      let x = eo.clientX;
      let y = eo.clientY;
      dragTarget.style.left = x + "px";
      dragTarget.style.top = y - 30 + "px";
      this.show = true;
      window.onmousemove = (e) => {
        x = e.clientX;
        y = e.clientY;
        dragTarget.style.left = x + "px";
        dragTarget.style.top = y - 30 + "px";
      };
      window.onmouseup = () => {
        if (this.mouseChangeFlag) {
          this.$emit("emitbtnid", this.item);
        }
        if (this.show) {
          this.show = false;
          this.mousemoveflag = false;
        }
        window.onmousemove = window.onmouseup = null;
      };
    },
  },
};
</script>
<style lang="less" scoped>
.FCC {
  .style {
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 1;
    background-color: #ecf5ff;
    min-height: 50px;
    padding: 10px;
    border: 2px dashed #909399;
    border-radius: 2px;
    width: calc(100vw - 645px);
    transition: border-radius 0.5s, border 0.5s, background-color 0.5s;
  }
}
.FormComponentButton {
  display: inline-block;
  width: 120px;
  margin: 0 0 5px 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .el-button {
    width: 100%;
    .example {
      .style {
        transition: border-radius 0.5s, border 0.5s, background-color 0.5s;
        position: absolute;
        display: flex;
        align-items: center;
        z-index: 1;
        background-color: rgba(255, 255, 255);
        min-height: 50px;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.507);
      }
    }
  }
}
</style>