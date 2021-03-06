<template>
  <div class="EditingArea">
    <draggable tag="ul" v-model="listdata" class="ul-draggable" v-bind="options()" @update="datadragEnd">
      <li v-for="(item, index) in listdata" :key="index" class="FCC">
        <component :is="item.id" :currentOptions="currentOptions" :index="index"></component>
        <div class="toolbar">
          <el-button type="primary" icon="el-icon-setting" @click.stop="setting(index)"></el-button>
          <template>
            <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
              <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
            </el-popconfirm>
          </template>
        </div>
      </li>
    </draggable>
  </div>
</template>



<script>
import draggable from "vuedraggable";
import FormComponents from "../../../components/FormComponents";
import Cascader from "../../../components/FormComponents/Cascader";
import Checkbox from "../../../components/FormComponents/Checkbox";
import DatePicker from "../../../components/FormComponents/Cascader";
import Formswitch from "../../../components/FormComponents/Formswitch";
import Input from "../../../components/FormComponents/Input";
import InputNumber from "../../../components/FormComponents/InputNumber";
import Radio from "../../../components/FormComponents/Radio";
import Select from "../../../components/FormComponents/Select";
import Slider from "../../../components/FormComponents/Slider";
import TimePicker from "../../../components/FormComponents/TimePicker";
export default {
  name: "EditingArea",
  data() {
    return {
      listdata: [], //渲染拖拽组件
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
  props: ["item", 'currentOptions'],
  created() { },
  updated() { },
  computed: {},
  mounted() { },
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

    //设置选中项
    setting(index) {
      this.$emit('getSettingId', index)
    },
    //拖动结束
    datadragEnd() {
      console.log(this.listdata);
    },
    //移除选中项
    confirm(index) {
      this.listdata.splice(index, 1);

      this.$emit("removeCurrentId", index)
    }
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
