<template>
  <form-create v-model="fapi" :rule="rule" :option="option" @submit="onSubmit"></form-create>
</template>

<script>
export default {
  data() {
    return {
      fapi: null,
      rule: formCreate.parseJson(
        '[{"type":"switch","field":"j735qrlkpwsh","title":"开关","info":"","_fc_drag_tag":"switch","hidden":false,"display":true},{"type":"radio","field":"m2p5qrlkq5bs","title":"单选框","info":"","effect":{"fetch":""},"options":[{"value":"1","label":"选项1"},{"value":"2","label":"选项2"}],"_fc_drag_tag":"radio","hidden":false,"display":true},{"type":"switch","field":"d9k1lfnzssesp","title":"开关","info":"","_fc_drag_tag":"switch","hidden":false,"display":true},{"type":"slider","field":"4df5qrlkqbhj","title":"滑块","info":"","_fc_drag_tag":"slider","hidden":false,"display":true,"value":39},{"type":"slider","field":"7bh1lfnzsqb6e","title":"滑块","info":"","_fc_drag_tag":"slider","hidden":false,"display":true,"value":50},{"type":"tree","field":"hsr1lfnzt946z","title":"树形控件","info":"","effect":{"fetch":""},"props":{"props":{"label":"label"},"showCheckbox":true,"nodeKey":"id","data":[{"id":1,"label":"一级 1","children":[{"id":4,"label":"二级 1-1","children":[{"id":9,"label":"三级 1-1-1"},{"id":10,"label":"三级 1-1-2"}]}]},{"id":2,"label":"一级 2","children":[{"id":5,"label":"二级 2-1"},{"id":6,"label":"二级 2-2"}]},{"id":3,"label":"一级 3","children":[{"id":7,"label":"二级 3-1"},{"id":8,"label":"二级 3-2"}]}]},"_fc_drag_tag":"tree","hidden":false,"display":true},{"type":"FcRow","children":[{"type":"col","props":{"span":12},"children":[{"type":"el-transfer","field":"y5y1lfnztqymx","title":"穿梭框","info":"","props":{"data":[{"key":1,"label":"备选项 1","disabled":false},{"key":2,"label":"备选项 2","disabled":false},{"key":3,"label":"备选项 3","disabled":false},{"key":4,"label":"备选项 4","disabled":true},{"key":5,"label":"备选项 5","disabled":false},{"key":6,"label":"备选项 6","disabled":false},{"key":7,"label":"备选项 7","disabled":false},{"key":8,"label":"备选项 8","disabled":true},{"key":9,"label":"备选项 9","disabled":false},{"key":10,"label":"备选项 10","disabled":false},{"key":11,"label":"备选项 11","disabled":false},{"key":12,"label":"备选项 12","disabled":true},{"key":13,"label":"备选项 13","disabled":false},{"key":14,"label":"备选项 14","disabled":false},{"key":15,"label":"备选项 15","disabled":false}]},"_fc_drag_tag":"el-transfer","hidden":false,"display":true},{"type":"tree","field":"sgo1lfnzterii","title":"树形控件","info":"","effect":{"fetch":""},"props":{"props":{"label":"label"},"showCheckbox":true,"nodeKey":"id","data":[{"id":1,"label":"一级 1","children":[{"id":4,"label":"二级 1-1","children":[{"id":9,"label":"三级 1-1-1"},{"id":10,"label":"三级 1-1-2"}]}]},{"id":2,"label":"一级 2","children":[{"id":5,"label":"二级 2-1"},{"id":6,"label":"二级 2-2"}]},{"id":3,"label":"一级 3","children":[{"id":7,"label":"二级 3-1"},{"id":8,"label":"二级 3-2"}]}]},"_fc_drag_tag":"tree","hidden":false,"display":true},{"type":"el-transfer","field":"leg1lfnzt69yc","title":"穿梭框","info":"","props":{"data":[{"key":1,"label":"备选项 1","disabled":false},{"key":2,"label":"备选项 2","disabled":false},{"key":3,"label":"备选项 3","disabled":false},{"key":4,"label":"备选项 4","disabled":true},{"key":5,"label":"备选项 5","disabled":false},{"key":6,"label":"备选项 6","disabled":false},{"key":7,"label":"备选项 7","disabled":false},{"key":8,"label":"备选项 8","disabled":true},{"key":9,"label":"备选项 9","disabled":false},{"key":10,"label":"备选项 10","disabled":false},{"key":11,"label":"备选项 11","disabled":false},{"key":12,"label":"备选项 12","disabled":true},{"key":13,"label":"备选项 13","disabled":false},{"key":14,"label":"备选项 14","disabled":false},{"key":15,"label":"备选项 15","disabled":false}]},"_fc_drag_tag":"el-transfer","hidden":false,"display":true}],"_fc_drag_tag":"col","hidden":false,"display":true}],"_fc_drag_tag":"row","hidden":false,"display":true}]'
      ),
      option: formCreate.parseJson(
        '{"form":{"labelPosition":"right","size":"mini","labelWidth":"125px","hideRequiredAsterisk":false,"showMessage":true,"inlineMessage":false}}'
      )
    }
  },
  methods: {
    onSubmit(formData) {
      //todo 提交表单
    }
  }
}
</script>