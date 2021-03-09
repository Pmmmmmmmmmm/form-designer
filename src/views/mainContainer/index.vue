<template>
  <div class="mainContainer">
    <header>
      <h3>Form Designer</h3>
    </header>
    <div class="container">
      <div class="leftAside">
        <!-- ComponentSelectionArea -->
        <div class="componentSelectionArea">
          <div class="basic">
            <h4>基础表单组件</h4>
            <!-- <form-component-button
              v-for="(item, index) in buttonData"
              :key="index"
              :item="item"
              :mouseChangeFlag="mouseChangeFlag"
              @getItemID="pushComponents"
            >
              <span slot="title">{{ item.name }}</span>
              <div slot="example" :is="item.id"></div>
            </form-component-button>-->

            <!-- 拖拽A -->
            <draggable v-model="buttonData" v-bind="optionsA" @start="onStart" @end="onEnd">
              <transition-group>
                <div class="formComponentButton" v-for="(item, index) in buttonData" :key="index">
                  <el-button @mouseover.native="exampleShow(index)" @mouseout.native="exampleShow('')">
                    <span>{{ item.name }}</span>
                    <div class="example" v-show="index==exampleShow">
                      <div class="style">
                        <component :is="item.id"></component>
                      </div>
                    </div>
                  </el-button>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
      <div class="main">
        <!-- EditingArea -->
        <div class="editingArea">
          <!-- <draggable tag="ul" v-model="listdata" class="ul-draggable" v-bind="options()" @update="datadragEnd">
            <li v-for="(item, index) in listdata" :key="index" class="FCC">
              <component :is="item.id" :currentOptions="item.options" :index="index"></component>
              <div class="toolbar">
                <el-button type="primary" icon="el-icon-setting" @click.stop="setting(index)"></el-button>
                <template>
                  <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
                    <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
                  </el-popconfirm>
                </template>
              </div>
            </li>
          </draggable>-->
          <!-- 拖拽B -->
          <draggable v-bind="optionsB" v-model="listdata" @start="onStart" @end="onEnd">
            <transition-group>
              <div class="item" v-for="(item,index) in listdata" :key="index">{{item.id}}</div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="rightAside">
        <!-- 属性编辑区域 -->
        <AttributeModificationArea :currentItem="currentItem" @emitOpintions="emitOpintions(arguments)" />
      </div>
    </div>
  </div>
</template>

<script>
// 引入主体的三块区域

import draggable from "vuedraggable";
import AttributeModificationArea from "./attributeModificationArea";
import FormComponentButton from './components/FormComponentButton';
//表单组件
import Cascader from "../../components/FormComponents/Cascader";
import Checkbox from "../../components/FormComponents/Checkbox";
import DatePicker from "../../components/FormComponents/Cascader";
import Formswitch from "../../components/FormComponents/Formswitch";
import Input from "../../components/FormComponents/Input";
import InputNumber from "../../components/FormComponents/InputNumber";
import Radio from "../../components/FormComponents/Radio";
import Select from "../../components/FormComponents/Select";
import Slider from "../../components/FormComponents/Slider";
import TimePicker from "../../components/FormComponents/TimePicker";

// 引入表单组件
export default {
  name: "mainContainer",
  data() {
    return {
      drag: false,
      //鼠标进入编辑区域
      // mouseChangeFlag: false,
      //最近加入拖动列表的元素
      currentItem: {},
      //当前操作的配置参数
      currentOptions: {},
      //按钮数据源
      buttonData: [
        { name: "单选框", id: "Radio" },
        { name: "多选框", id: "Checkbox" },
        { name: "输入框", id: "Input" },
        { name: "计数器", id: "InputNumber" },
        { name: "选择器", id: "Select" },
        { name: "级联选择器", id: "Cascader" },
        { name: "开关", id: "Formswitch" },
        { name: "滑块", id: "Slider" },
        { name: "时间选择", id: "TimePicker" },
        { name: "日期选择", id: "DatePicker" },
      ],
      //渲染拖拽组件
      listdata: [{ name: "单选框", id: "Radio" }],
      //example显示

      optionsA: {
        group: {
          name: "site",
          pull: 'clone',
          put: false
        },
        sort: false,
        animation: "160",
        dragClass: "dragClass",
        ghostClass: "ghostClass",
        chosenClass: "chosenClass",
        forceFallback: true,

      },
      optionsB: {
        group: "site",
        animation: "160",
        dragClass: "dragClass",
        ghostClass: "ghostClass",
        chosenClass: "chosenClass",
        forceFallback: true,

      },
    };
  },
  components: {
    // ComponentSelectionArea,
    AttributeModificationArea,
    FormComponentButton,
    //表单组件
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
    //拖拽插件
    draggable
  },
  methods: {
    // mouseover() {  //鼠标进入编辑区域
    //   this.mouseChangeFlag = true;
    // },
    // mouseout() {//离开进入编辑区域
    //   this.mouseChangeFlag = false;
    // },
    // pushComponents(item) {//将选中的表单组件加入编辑区域
    //   this.listdata.push(
    //     {
    //       id: item.id,

    //     });
    //   // this.currentItem.id = item.id;
    //   // this.currentItem.index = item.index
    // },
    // emitOpintions(arg) { //将选中的
    //   this.listdata[arg[1]].options = arg[0];
    // },

    // //主体区域
    // options() {
    //   return {
    //     animation: 150, // 动画时间
    //     disabled: false, // false可拖拽，true不可拖拽
    //     // group: "description",
    //     chosenClass: "sortable-chosen", // 设置被选中的元素的class
    //     ghostClass: "ghost",
    //   };
    // },

    //设置选中项
    setting(index) {
      this.currentItem = {
        id: this.listdata[index].id,
        index: index
      };
      console.log(this.currentItem);
    },
    //拖动结束
    datadragEnd() {
      console.log(this.listdata);
    },
    //移除选中项
    confirm(index) {
      this.listdata.splice(index, 1);
      this.$emit("removeCurrentId", index)
    },
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
      this.exampleShow = false;
      console.log(this.arr2);
    },
    exampleShow(index) {
      return index
    }
  },
  watch: {
    listdata: function (newVal) {

    },
  },
};
</script>

<style lang="less" scoped>
.mainContainer {
  position: fixed;
  width: 100vw;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  header {
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    background-color: #409eff;
    color: #ecf5ff;
    border-bottom: 1px solid #dcdfe6;
    h3 {
      margin: 0;
      margin-left: 15px;
    }
  }
  .container {
    position: relative;
    display: flex;
    height: calc(100% - 40px);
    .leftAside {
      width: 280px;
      .componentSelectionArea {
        height: 100%;
        padding: 10px;
        border: 1px solid #dcdfe6;
        background-color: #ecf5ff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        h4 {
          margin-left: 10px;
        }
        .formComponentButton {
          display: inline-block;
          width: 120px;
          margin: 0 0 5px 5px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          .el-button {
            width: 100%;
            .example {
              .style {
                position: absolute;
                min-width: 300px;
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
      }
    }
    .main {
      min-width: 500px;
      flex: 1;
      background-color: #ecf5ff;
      .editingArea {
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
    }
    .rightAside {
      width: 300px;
    }
  }
}
</style>

