<template>
  <p class="root">
    <SortableList lockAxis="y" v-model="items">
      <SortableItem
        v-for="(item, index) in items"
        :index="index"
        :key="index"
        :item="item"
      />
    </SortableList>
  </p>
</template>

<script>
import SortableList from "./SortableList";
import SortableItem from "./SortableItem";
export default {
  name: "ExampleVue",
  data() {
    return {
      items: [],
    };
  },
  components: { SortableList, SortableItem },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.root {
  z-index: 0;
}
</style>
