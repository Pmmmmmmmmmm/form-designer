<template>
  <ul class="list">
    <slot />
  </ul>
</template>

<script>
import { ContainerMixin } from "vue-slicksort";
export default {
  mixins: [ContainerMixin],
};
</script>
<style scoped>
.list {
  margin: 0;
  padding: 0;
}
</style>
