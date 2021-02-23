<template>
  <div class="Formswitch">
    <el-switch v-model="value" active-color="#409eff" inactive-color="#c6e2ff">
    </el-switch>
  </div>
</template>


<script>
export default {
  name: "Formswitch",
  data() {
    return {
      value: true,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>
