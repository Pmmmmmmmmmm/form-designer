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
              <transition-group class="fromspan">
                <div class="formComponentButton" v-for="(item,index)  in buttonData" :key="item+''+index">
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
          <draggable
            v-bind="optionsB"
            v-if="condition"
            v-model="listdata"
            @start="onStart"
            @end="onEnd"
            :move="onMove"
            class="draggableArea"
          >
            <transition-group>
              <div class="FCC" v-for="(item,index) in listdata" :key="item+''+index">
                <!-- 父级工具栏 -->
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
                    <el-button
                      type="primary"
                      v-if="!Array.isArray(item)"
                      icon="el-icon-setting"
                      @click.stop="setting(index)"
                      title="设置"
                    ></el-button>
                    <template>
                      <el-popconfirm title="确定删除此项吗？" @confirm="confirm(index)">
                        <el-button type="danger" slot="reference" icon="el-icon-delete"></el-button>
                      </el-popconfirm>
                    </template>
                  </div>
                </div>
                <!-- 子级 -->
                <div v-if="Array.isArray(item)" class="tabel">
                  <draggable v-bind="innerOptionsB" v-model="listdata[index]" @start="onStart" @end="onEnd">
                    <transition-group class="innerDraggableList">
                      <div class="innerFCC" v-for="(innerItem,innerIndex) in item" :key="innerItem+''+innerIndex">
                        <!-- 子级工具栏 -->
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
                        <component :is="innerItem.type" :currentOptions="innerItem" :index="innerIndex"></component>
                      </div>
                    </transition-group>
                  </draggable>
                </div>
                <!-- 父级组件 -->
                <div v-else>
                  <component :is="item.type" :currentOptions="item" :index="index"></component>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="rightAside">
        <!-- 属性编辑区域 -->
        <attribute-modification-area :currentItem="currentItem" @emitOpintions="emitOpintions" />
      </div>
    </div>
  </div>
</template>

<script>
// 引入主体的三块区域

import draggable from 'vuedraggable'
import AttributeModificationArea from './AttributeModificationArea'

//表单组件
import Fd_Cascader from '../../components/FormComponents/Cascader'
import Fd_Checkbox from '../../components/FormComponents/Checkbox'
import Fd_DatePicker from '../../components/FormComponents/Cascader'
import Fd_Switch from '../../components/FormComponents/Formswitch' // switch组件名与switch关键字冲突需要单独处理
import Fd_Input from '../../components/FormComponents/Input' // Input组件名与Input表单关键字冲突需要单独处理
import Fd_InputNumber from '../../components/FormComponents/InputNumber'
import Fd_Radio from '../../components/FormComponents/Radio'
import Fd_Select from '../../components/FormComponents/Select' // Select组件名与Select表单关键字冲突需要单独处理
import Fd_Slider from '../../components/FormComponents/Slider'
import Fd_TimePicker from '../../components/FormComponents/TimePicker'

// 引入表单组件
export default {
  name: 'mainContainer',
  data() {
    return {
      drag: false,
      //最近加入拖动列表的元素
      currentItem: {},
      //当前操作的配置参数
      currentOptions: {},
      //按钮数据源
      buttonData: [
        { name: '单选框', type: 'Fd_Radio' },
        { name: '多选框', type: 'Fd_Checkbox' },
        { name: '输入框', type: 'Fd_Input' },
        { name: '计数器', type: 'Fd_InputNumber' },
        { name: '选择器', type: 'Fd_Select' },
        { name: '级联选择器', type: 'Fd_Cascader' },
        { name: '开关', type: 'Fd_Switch' },
        { name: '滑块', type: 'Fd_Slider' },
        { name: '时间选择', type: 'Fd_TimePicker' },
        { name: '日期选择', type: 'Fd_DatePicker' }
      ],
      //渲染拖拽组件
      listdata: [],
      // 按钮拖拽区设置
      optionsA: {
        group: {
          name: 'site',
          pull: 'clone',
          put: false
        },
        sort: false,
        animation: '160',
        dragClass: 'dragClass',
        ghostClass: 'ghostClass',
        chosenClass: 'chosenClass',
        forceFallback: true
      },
      // 编辑拖拽区设置
      optionsB: {
        group: 'site',
        animation: '160',
        dragClass: 'dragClass',
        ghostClass: 'ghostClass',
        chosenClass: 'chosenClass',
        handle: '.handle',
        forceFallback: true
      },
      // 内部编辑拖拽区设置
      innerOptionsB: {
        group: {
          name: 'site',
          pull: false
        },
        animation: '100',
        dragClass: 'dragClass',
        ghostClass: 'ghostClass',
        chosenClass: 'chosenClass',
        handle: '.handle',
        forceFallback: true
      },
      condition: true //用于拖拽区域强制更新
    }
  },
  components: {
    AttributeModificationArea,
    //表单组件
    Fd_Cascader,
    Fd_Checkbox,
    Fd_Input,
    Fd_DatePicker,
    Fd_InputNumber,
    Fd_TimePicker,
    Fd_Switch,
    Fd_Slider,
    Fd_Radio,
    Fd_Select,
    //拖拽插件
    draggable
  },
  methods: {
    //将属性设置模块返回的参数渲染到组件中
    emitOpintions() {
      this.condition = false //拖拽区域销毁

      if (typeof arguments[arguments.length - 1] === 'undefined') {
        this.listdata[arguments[1]] = arguments[0]
      } else if (typeof arguments[arguments.length - 1] != 'undefined') {
        this.listdata[arguments[1]][arguments[2]] = arguments[0]
      }

      // // 拖拽区域生成，强制更新
      this.$nextTick(function() {
        this.condition = true
      })
    },
    //设置选中项
    setting() {
      // 清空当前的对象
      this.currentItem = {}
      let i = arguments[0]
      let j = arguments[1]
      arguments.length === 1
        ? // 点击父级组件设置的时候
          this.$nextTick(function() {
            this.currentItem = this.listdata[i]
            this.currentItem.index = i
          })
        : // 点击子级组件设置的时候
          this.$nextTick(function() {
            this.currentItem = this.listdata[i][j]
            this.currentItem.index = i
            this.currentItem.innerIndex = j
          })
    },
    //添加子元素
    addRow(index) {
      this.listdata[index] = JSON.parse(JSON.stringify([this.listdata[index]]))
      this.$forceUpdate()
    },
    //移除选中项
    confirm() {
      if (arguments.length === 1) {
        this.listdata.splice(arguments[0], 1)
      }
      if (arguments.length === 2) {
        this.listdata[arguments[0]].splice(arguments[1], 1)
        if (this.listdata[arguments[0]].length === 0) {
          this.listdata.splice(arguments[0], 1)
        }
      }
      this.$forceUpdate()
    },

    //开始拖拽事件
    onStart() {
      // this.drag = true
    },
    //拖拽结束事件
    onEnd() {
      this.currentItem = {}

      // 清除表单属性设置参数
      this.condition = false //拖拽区域销毁
      // this.drag = false
      // 拖拽区域生成，强制更新
      this.$nextTick(function() {
        this.condition = true
      })
    },

    //move回调方法
    onMove(e) {
      // 元素从选择区进入编辑区时添加 适配的css

      if (e.from.className === 'fromspan') {
        e.dragged.classList.add('FCC')
      }
      // 如果  拖动元素本身是嵌套元素 并且 拖动目标的也为嵌套元素内部  则禁止拖拽
      if (Array.isArray(e.draggedContext.element) && e.related.className === 'innerFCC') {
        return false
      }
      return true
    }
  }
}
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
          & > span {
            width: 100%;
            min-height: 200px;
            display: block;
            padding: 0 0 100px 0;
            .FCC {
              z-index: 0;
              position: relative;
              min-height: 20px;
              padding: 27px 8px 8px 8px;
              background: #ecf5ff;
              border: 2px dashed #909399;
              border-radius: 4px;
              margin-bottom: 5px;
              overflow: hidden;
              &:hover {
                background-color: #d9ecff;
                .toolbar {
                  display: flex;
                }
              }

              .innerDraggableList {
                display: flex;
                justify-content: flex-start;
                .innerFCC {
                  flex: 1;
                  z-index: 0;
                  max-width: fit-content;
                  position: relative;
                  display: flex;
                  align-items: center;
                  padding: 15px;
                  background: #ecf5ff;
                  border: 1px dotted #909399;
                  border-radius: 4px;
                  margin-right: 5px;
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
                    z-index: 10;
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
    }
    .rightAside {
      width: 300px;
    }
  }
}
</style>
