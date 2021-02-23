<template>
  <div class="EditingArea">
    <draggable
      tag="ul"
      v-model="listdata"
      class="ul-draggable"
      v-bind="options()"
    >
      <li v-for="(item, index) in listdata" :key="index" class="FCC">
        <form-components :componentid="item" :index="index" />
        <div class="toolbar">
          <el-button
            type="primary"
            icon="el-icon-setting"
            @click.stop="setting(index)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click.stop="del(index)"
          ></el-button>
        </div>
      </li>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import FormComponents from "./FormComponents.vue";
import Cascader from "./FormComponents/Cascader.vue";
import Checkbox from "./FormComponents/Checkbox.vue";
import DatePicker from "./FormComponents/DatePicker.vue";
import Formswitch from "./FormComponents/Formswitch.vue";
import Input from "./FormComponents/Input.vue";
import InputNumber from "./FormComponents/InputNumber.vue";
import Radio from "./FormComponents/Radio.vue";
import Select from "./FormComponents/Select.vue";
import Slider from "./FormComponents/Slider.vue";
import TimePicker from "./FormComponents/TimePicker.vue";
export default {
  name: "EditingArea",
  data() {
    return {
      componentsdata: [
        draggable,
        Radio,
        Checkbox,
        Input,
        InputNumber,
        Select,
        Cascader,
        Formswitch,
        Slider,
        TimePicker,
        DatePicker,
      ],
      listdata: [],
      binddata: [],
    };
  },
  components: {
    draggable,
    Radio,
    Checkbox,
    Input,
    InputNumber,
    Select,
    Cascader,
    Formswitch,
    Slider,
    TimePicker,
    DatePicker,
    FormComponents,
  },
  props: ["item"],
  created() {},
  updated() {},
  computed: {},
  mounted() {},
  methods: {
    options() {
      return {
        animation: 150, // 动画时间
        disabled: false, // false可拖拽，true不可拖拽
        // group: "description",
        chosenClass: "sortable-chosen", // 设置被选中的元素的class
        ghostClass: "ghost",
      };
    },
    del(index) {
      this.listdata.splice(index, 1);
    },
    setting(index) {},
  },
  watch: {
    listdata: function (newVal) {
      // console.log("newVal:", newVal);
    },
  },
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
  .ul-draggable {
    padding: 0;
    margin-top: 10px;
    .FCC {
      z-index: 0;
      position: relative;
      display: flex;
      align-items: center;
      min-height: 50px;
      padding: 10px;
      background: #ecf5ff;
      border: 2px dashed #909399;

      border-radius: 2px;
      margin-bottom: 5px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      &:hover {
        background-color: #f1f1f1;
        cursor: move;
      }
      .sortable-chosen {
        border: solid 2px #3089dc !important;
      }
      .ghost {
        display: none;
      }
      .toolbar {
        position: absolute;
        top: 2px;
        right: 2px;
        z-index: 1;
        width: 62px;
        display: flex;
        justify-content: space-between;
        .el-button {
          width: 30px;
          height: 30px;
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
