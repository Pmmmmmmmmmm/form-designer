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
            <!-- 拖拽A -->
            <draggable v-model="buttonData" v-bind="optionsA" @start="onStart" @end="onEnd" :move="onMove">
              <transition-group>
                <div class="formComponentButton" v-for="(item, index) in buttonData" :key="index">
                  <el-button class="dragTarget">
                    <span>{{ item.name }}</span>
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
          <!-- 拖拽B -->
          <draggable v-bind="optionsB" v-model="listdata" @start="onStart" @end="onEnd" class="draggableArea">
            <transition-group>
              <div class="FCC" v-for="(item,index) in listdata" :key="index">
                <div class="toolbar">
                  <el-button type="primary" icon="el-icon-rank" class="handle" title="按此处拖动"></el-button>
                  <div>
                    <el-button
                      v-if="!Array.isArray(item)"
                      type="success"
                      icon="el-icon-plus"
                      @click.stop="addRow(index)"
                      title="点击在此行添加元素"
                    ></el-button>
                    <el-button type="primary" icon="el-icon-setting" @click.stop="setting(index)" title="设置"></el-button>
                    <template>
                      <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
                        <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
                      </el-popconfirm>
                    </template>
                  </div>
                </div>
                <div v-if="Array.isArray(item)" class="tabel">
                  <draggable v-bind="innerOptionsB" v-model="listdata[index]" @start="onStart" @end="onEnd">
                    <transition-group class="innerDraggableList">
                      <div class="innerFCC" v-for="(innerItem,innerIndex) in item" :key="innerIndex">
                        <div class="toolbar">
                          <el-button type="primary" icon="el-icon-rank" class="handle" title="按此处拖动"></el-button>
                          <div>
                            <el-button type="primary" icon="el-icon-setting" @click.stop="setting(index,innerIndex)" title="设置"></el-button>
                            <template>
                              <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index,innerIndex)">
                                <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
                              </el-popconfirm>
                            </template>
                          </div>
                        </div>
                        <component :is="innerItem.id" :currentOptions="innerItem.options" :index="innerIndex"></component>
                      </div>
                    </transition-group>
                  </draggable>
                </div>
                <div v-else>
                  <component :is="item.id" :currentOptions="item.options" :index="index"></component>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="rightAside">
        <!-- 属性编辑区域 -->
        <AttributeModificationArea :currentItem="currentItem" @emitOpintions="emitOpintions" />
      </div>
    </div>
  </div>
</template>

<script>
// 引入主体的三块区域

import draggable from "vuedraggable";
import AttributeModificationArea from "./attributeModificationArea";

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
      //最近加入拖动列表的元素
      currentItem: {},
      //当前操作的配置参数
      currentOptions: {},
      //按钮数据源
      buttonData: [
        { name: "单选框", id: "Radio", options: null },
        { name: "多选框", id: "Checkbox", options: null },
        { name: "输入框", id: "Input", options: null },
        { name: "计数器", id: "InputNumber", options: null },
        { name: "选择器", id: "Select", options: null },
        { name: "级联选择器", id: "Cascader", options: null },
        { name: "开关", id: "Formswitch", options: null },
        { name: "滑块", id: "Slider", options: null },
        { name: "时间选择", id: "TimePicker", options: null },
        { name: "日期选择", id: "DatePicker", options: null },
      ],
      //渲染拖拽组件
      listdata: [
        { name: "单选框", id: "Radio", options: {} },
        // [
        //   { name: "单选框", id: "Radio", options: {} },
        // ],
      ],

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
        handle: '.handle',
        forceFallback: true,

      },

      innerOptionsB: {
        group: {
          name: "site",
          pull: false,

        },
        animation: "100",
        dragClass: "dragClass",
        ghostClass: "ghostClass",
        chosenClass: "chosenClass",
        handle: '.handle',
        forceFallback: true,

      },
    };
  },
  components: {
    AttributeModificationArea,
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
    //将属性设置模块返回的参数渲染到组件中
    emitOpintions() {
      console.log(arguments);
    },
    //设置选中项
    setting() {
      if (arguments.length == 1) {
        this.currentItem = {
          id: this.listdata[arguments[0]].id,
          index: arguments[0],
          options: this.listdata[arguments[0]].options,
        };
      }
      if (arguments.length == 2) {
        this.currentItem = {
          id: this.listdata[arguments[0]][arguments[1]].id,
          index: arguments[0],
          innerIndex: arguments[1],
          options: this.listdata[arguments[0]][arguments[1]].options,
        };
      }
    },
    //添加子元素
    addRow(index) {
      this.listdata[index] = [this.listdata[index]]
      this.$forceUpdate()
    },
    //移除选中项
    confirm() {
      if (arguments.length == 1) {
        this.listdata.splice(arguments[0], 1);
      }
      if (arguments.length == 2) {
        this.listdata[arguments[0]].splice(arguments[1], 1);
      }
      this.$forceUpdate()

    },

    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },

    //move回调方法
    onMove(e) {
      e.dragged.classList.add("FCC")
    },
  },
};
</script>

<style lang="less" scoped>
.mainContainer {
  position: fixed;
  width: 100vw;
  height: 100%;
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
            position: relative;
            width: 100%;
            cursor: move;
            .example {
              .style {
                position: absolute;
                top: 0px;
                left: 140px;
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
        //给滚动条预留位置
        padding: 10px 0 10px 10px;
        height: calc(100% - 50px);
        overflow-y: scroll;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #c6e2ff;
        .draggableArea {
          width: 100%;
          height: 50px;
          .FCC {
            z-index: 0;
            position: relative;
            min-height: 20px;
            padding: 27px 8px 8px 8px;
            background: #ecf5ff;
            border: 2px dashed #909399;
            border-radius: 4px;
            margin-bottom: 5px;
            &:hover {
              background-color: #d9ecff;
              .toolbar {
                display: flex;
              }
            }

            .innerDraggableList {
              display: flex;
              .innerFCC {
                flex: 1;
                z-index: 0;
                max-width: 25%;
                position: relative;
                display: flex;
                align-items: center;
                min-height: 50px;
                padding: 20px 10px 10px 10px;
                background: #ecf5ff;
                border: 1px dotted #909399;
                border-radius: 4px;
                &:hover {
                  background-color: #f1f1f1;
                  .toolbar {
                    display: flex;
                  }
                }
                .dragTarget {
                  border: 0;
                  span {
                    font-size: 20px;
                  }
                }

                .toolbar {
                  display: none;
                  z-index: 1;
                  position: absolute;
                  top: 0;
                  left: 0;
                  box-sizing: border-box;
                  width: 100%;
                  padding: 2px 2px 0 2px;

                  justify-content: space-between;
                  div {
                    display: flex;
                    width: fit-content;
                    justify-content: space-between;
                  }
                  .el-button {
                    font-size: 16px;
                    width: 23px;
                    height: 23px;
                    padding: 0;
                    margin: 0 3px 0 0;
                  }
                }
              }
            }

            //选择区域拖进时改变样式
            .dragTarget {
              border: 0;
              span {
                font-size: 20px;
              }
            }

            .toolbar {
              display: none;
              z-index: 1;
              position: absolute;
              top: 0;
              left: 0;
              box-sizing: border-box;
              width: 100%;
              padding: 2px 2px 0 2px;
              justify-content: space-between;
              div {
                display: flex;
                width: fit-content;
                justify-content: space-between;
              }
              .el-button {
                font-size: 16px;
                width: 23px;
                height: 23px;
                padding: 0;
                margin: 0 3px 0 0;
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
