<template>
  <div class="Formswitch">
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
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
