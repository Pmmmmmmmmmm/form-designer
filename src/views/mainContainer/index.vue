<template>
  <div class="mainContainer">
    <header>
      <h4>基于vue的行政审批表单设计器</h4>
      <el-button type="primary" title="导入JSON" @click="()=>{listdata=[],currentItem = {}} ">
        <i class="el-icon-refresh-right"></i>
      </el-button>

      <el-button type="primary" title="导入JSON" @click="showInjectJSON=true">
        <i class="el-icon-upload2"></i>
      </el-button>
      <el-button type="primary" title="查看JSON" @click="createJSON">
        <i class="el-icon-tickets"></i>
      </el-button>
      <el-button type="primary" title="开始" @click="showForm=true">
        <i class="el-icon-video-play"></i>
      </el-button>
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
            <h4>表单模板</h4>
            <el-button class="formComponentButton">
              <span class="dragTarget" @click="personClick(1)">事务申请</span>
            </el-button>
            <el-button class="formComponentButton">
              <span class="dragTarget" @click="personClick(2)">信息填报</span>
            </el-button>
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
    <!-- 导入json -->
    <el-dialog title="导入JSON" width="50%" :visible.sync="showInjectJSON" :modal-append-to-body="false">
      <el-input class="resizeNone" :autosize="{ minRows: 20, maxRows: 14}" type="textarea" v-model="InjectJSONData"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="injectJSON">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 显示json -->
    <el-dialog title="导出JSON" width="50%" :visible.sync="showJSON" :modal-append-to-body="false">
      <el-input class="resizeNone" :autosize="{ minRows: 2, maxRows: 14}" type="textarea" v-model="listdataJSON"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showJSON = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表单效果预览 -->
    <el-dialog title="效果预览" width="50%" :visible.sync="showForm" v-if="showForm" :modal-append-to-body="false">
      <form-show :listdata="listdata"></form-show>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showForm = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入主体的三块区域

import draggable from 'vuedraggable'
import AttributeModificationArea from '../mainContainer/AttributeModificationArea/index'

//表单组件
import Fd_Checkbox from '../../components/FormComponents/Checkbox'
import Fd_DatePicker from '../../components/FormComponents/DatePicker'
import Fd_Switch from '../../components/FormComponents/Formswitch' // switch组件名与switch关键字冲突需要单独处理
import Fd_Input from '../../components/FormComponents/Input' // Input组件名与Input表单关键字冲突需要单独处理
import Fd_InputNumber from '../../components/FormComponents/InputNumber'
import Fd_Radio from '../../components/FormComponents/Radio'
import Fd_Select from '../../components/FormComponents/Select' // Select组件名与Select表单关键字冲突需要单独处理
import Fd_Slider from '../../components/FormComponents/Slider'
import Fd_TimePicker from '../../components/FormComponents/TimePicker'
//引入表单效果展示页
import FormShow from '../../components/FormShow/index'
export default {
  name: 'mainContainer',
  data() {
    return {
      showInjectJSON: false,
      showJSON: false,
      showForm: false,
      InjectJSONData: '',
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
        { name: '开关', type: 'Fd_Switch' },
        { name: '滑块', type: 'Fd_Slider' },
        { name: '时间选择', type: 'Fd_TimePicker' },
        { name: '日期选择', type: 'Fd_DatePicker' }
      ],
      //渲染拖拽组件
      listdata: [],
      listdataJSON: '',
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
    draggable,
    FormShow
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

      //  拖拽区域生成，强制更新
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
      this.currentItem = {}

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
    },
    createJSON() {
      let temp = this.formatData(this.listdata)
      this.showJSON = true
      this.listdataJSON = JSON.stringify(temp, null, 4)
    },
    injectJSON() {
      if (!this.isJSON(this.InjectJSONData)) {
        alert('请输入正确的数据格式')
        this.InjectJSONData = ''
        return false
      }
      this.showInjectJSON = false
      this.listdata = this.reverseFormatData(JSON.parse(this.InjectJSONData))
      this.InjectJSONData = ''
    },
    isJSON(str) {
      if (typeof str == 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj == 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          return false
        }
      }
    },
    formatData(obj) {
      let temp = JSON.parse(JSON.stringify(obj))
      for (let index = 0; index < temp.length; index++) {
        if (Array.isArray(temp[index])) {
          temp[index].forEach(el => {
            el.col = {}
            el.col.span = 24 / temp[index].length
          })
          temp.splice(index, 1, ...temp[index])
        }
      }
      temp.forEach(item => {
        if (item.type == 'Fd_Radio') {
          item.type = 'radio'
        }
        if (item.type == 'Fd_Cascader') {
          item.type = 'Cascader'
        }
        if (item.type == 'Fd_Checkbox') {
          item.type = 'Checkbox'
        }
        if (item.type == 'Fd_Input') {
          item.type = 'Input'
        }
        if (item.type == 'Fd_DatePicker') {
          item.type = 'DatePicker'
        }
        if (item.type == 'Fd_InputNumber') {
          item.type = 'InputNumber'
        }
        if (item.type == 'Fd_TimePicker') {
          item.type = 'TimePicker'
        }
        if (item.type == 'Fd_Switch') {
          item.type = 'Switch'
        }
        if (item.type == 'Fd_Slider') {
          item.type = 'Slider'
        }
        if (item.type == 'Fd_Select') {
          item.type = 'Select'
        }
      })
      return temp
    },
    reverseFormatData(obj) {
      let temp = JSON.parse(JSON.stringify(obj))
      5
      temp.forEach(item => {
        if (item.type == 'radio') {
          item.type = 'Fd_Radio'
        }
        if (item.type == 'Cascader') {
          item.type = 'Fd_Cascader'
        }
        if (item.type == 'Checkbox') {
          item.type = 'Fd_Checkbox'
        }
        if (item.type == 'Input') {
          item.type = 'Fd_Input'
        }
        if (item.type == 'DatePicker') {
          item.type = 'Fd_DatePicker'
        }
        if (item.type == 'InputNumber') {
          item.type = 'Fd_InputNumber'
        }
        if (item.type == 'TimePicker') {
          item.type = 'Fd_TimePicker'
        }
        if (item.type == 'Switch') {
          item.type = 'Fd_Switch'
        }
        if (item.type == 'Slider') {
          item.type = 'Fd_Slider'
        }
        if (item.type == 'Select') {
          item.type = 'Fd_Select'
        }
      })
      return temp
    },
    personClick(flag) {
      this.InjectJSONData =
        flag == 1
          ? '[{"field":"cate_id2","title":"事务类型","value":"","options":[{"label":"个人事务","value":"10"},{"label":"公共事务","value":"20"}],"props":{"disabled":false},"name":"单选框","type":"radio","index":0},{"type":"Input","title":"活动名称","field":"is_postagec","value":"","props":{"maxlength":"","placeholder":"请输入","clearable":"","disabled":false,"size":""},"name":"输入框","index":1},{"type":"Select","field":"city","title":"城市","value":"","options":[{"value":"104","label":"天津"},{"value":"105","label":"北京"},{"value":"value3","label":"上海"}],"props":{"disabled":false,"multiple":false,"size":"","clearable":"","placeholder":""},"name":"选择器","index":2},[{"type":"Fd_DatePicker","field":"section_days","title":"开始日期","value":"","props":{"placeholder":"请选择活动日期"},"name":"日期选择","index":2,"innerIndex":0},{"type":"Fd_DatePicker","field":"sectiozn_day","title":"结束日期","value":"","props":{"placeholder":"请选择活动日期"},"name":"日期选择","index":2,"innerIndex":1}],{"type":"Input","title":"地点","field":"is_postaged","value":"","props":{"maxlength":"","placeholder":"请输入地点","clearable":"","disabled":false,"size":""},"name":"输入框","index":4},{"type":"Input","title":"申请人","field":"is_postages","value":"","props":{"maxlength":"","placeholder":"请输入","clearable":"","disabled":false,"size":""},"name":"输入框","index":4},{"type":"Input","title":"联系方式","field":"phone","value":"","props":{"maxlength":"","placeholder":"请输入","clearable":"","disabled":false,"size":""},"name":"输入框","index":5},{"type":"Input","title":"申请理由","field":"is_postagez","value":"","props":{"maxlength":"","placeholder":"请输入","clearable":"","disabled":false,"size":""},"name":"输入框","index":4}]'
          : '[[{"type":"Fd_Input","title":"姓名","field":"name","value":"","props":{"maxlength":"","placeholder":"请输入姓名","clearable":true,"disabled":false,"size":""},"name":"输入框","index":0,"col":{"span":12}},{"field":"sex","title":"性别","value":"","options":[{"label":"男","value":"10"},{"label":"女","value":"20"}],"props":{"disabled":false},"name":"单选框","type":"Fd_Radio","index":0,"innerIndex":1,"col":{"span":12}}],{"type":"Input","title":"年龄","field":"age","value":"","props":{"maxlength":"","placeholder":"","clearable":"","disabled":false,"size":""},"name":"输入框","index":1},{"type":"DatePicker","field":"section_day","title":"出生日期","value":"","props":{"placeholder":"请选择出生日期"},"name":"日期选择","index":2},{"type":"Checkbox","title":"职位","field":"hobby","value":[],"options":[{"label":"前端开发","value":"10"},{"label":"后端开发","value":"20"},{"label":"运维","value":3}],"props":{"size":"","disabled":false},"name":"多选框","index":3},{"type":"Select","field":"ssqzx","title":"学历","value":"","options":[{"value":"104","label":"大专"},{"value":"105","label":"本科"},{"value":"value3","label":"硕士"},{"value":"value4","label":"博士"}],"props":{"disabled":false,"multiple":false,"size":"","clearable":"","placeholder":""},"name":"选择器","index":4},{"type":"DatePicker","field":"section_daya","title":"入职时间","value":"","props":{"placeholder":"请选择入职日期","size":"mini"},"name":"日期选择","index":4}]'

      this.injectJSON()
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>
.mainContainer {
  header {
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;
    h4 {
      flex: 1;
    }
    .el-button {
      width: 40px;
      height: 40px;
      padding: 0;
    }
    i {
      font-size: 20px;
      font-weight: bold;
    }
  }
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
          max-width: calc(100% - 10px);
          min-width: 120px;
          display: inline-block;
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
  /deep/.el-dialog__wrapper {
    .el-dialog {
      min-width: 60%;
      min-height: fit-content;
      overflow: auto;
    }
    .resizeNone {
      .el-textarea__inner {
        resize: none;
      }
    }
  }
}
</style>
