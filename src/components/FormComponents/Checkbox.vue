<template>
  <div class="Checkbox">
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  data() {
    return {
      checkList: ["选中且禁用", "复选框 A"],
    };
  },
};
</script>