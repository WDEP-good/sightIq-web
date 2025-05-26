<template>
  <div class="layout-container">
    <component :is="layout" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import DefaultLayout from "./default.vue";

const route = useRoute();
const layout = computed(() => {
  return DefaultLayout;
});
</script>

<style scoped lang="less">
.layout-container{
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to bottom, #003366, #001a33);
}

</style>
