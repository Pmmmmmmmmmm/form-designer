<template>
  <div class="FormComponentButton">
    <el-button @mousedown.native="drag($event)">
      <slot name="title"></slot>
      <div class="example" v-show="show">
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
  methods: {
    drag(eo) {
      console.log(1);
      let dragTarget = this.$refs.dragTarget;
      console.log(this.$refs);
      console.log();
      let x = eo.clientX;
      let y = eo.clientY;
      dragTarget.style.left = x + "px";
      dragTarget.style.top = y - 50 + "px";
      this.show = true;
      window.onmousemove = (e) => {
        console.log(2);
        x = e.clientX;
        y = e.clientY;
        dragTarget.style.left = x + "px";
        dragTarget.style.top = y - 50 + "px";
      };
      window.onmouseup = () => {
        console.log(3);
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
.FormComponentButton {
  display: inline-block;
  width: 120px;
  margin: 0 0 5px 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .el-button {
    width: 100%;
    .example {
      .style {
        position: absolute;
        display: flex;
        align-items: center;
        z-index: 1;
        background-color: rgba(255, 255, 255);
        min-height: 40px;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.507);
      }
    }
  }
}
</style>