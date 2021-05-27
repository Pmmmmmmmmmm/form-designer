<template>
  <form-create v-model="fapi" :rule="rule" :option="option" @submit="onSubmit"></form-create>
</template>

<script>
export default {
  props: ['listdata'],

  data() {
    return {
      fapi: null,
      rule: formCreate.parseJson(
        '[{"type":"input","title":"col24","field":"col24_1"},{"type":"input","title":"col24","field":"col242_1","col":{"span":12}},{"type":"input","title":"col24","field":"col2342_1","col":{"span":12}}]'
      ),
      option: formCreate.parseJson(
        '{"form":{"labelPosition":"right","size":"mini","labelWidth":"125px","hideRequiredAsterisk":false,"showMessage":true,"inlineMessage":false}}'
      )
    }
  },
  created() {
    console.log(this.listdata)
    this.rule = formCreate.parseJson(JSON.stringify(this.formatData(this.listdata)))
  },
  methods: {
    onSubmit(formData) {
      //todo 提交表单
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
    }
  }
}
</script>


// '[{"name": "单选框","type": "radio","index": 0，"col":{"span":"12"},"options": [{"label": "选项1","value": "10"},{"label": "选项2","value": "20"},{"value": "value3","label": "选项3"}],},{"name": "单选框","type":"radio","index": 0,"col":{"span":"12"},"options": [{"label": "选项1","value": "10"},{"label": "选项2","value": "20"},{"value": "value3","label": "选项3"}],}]'