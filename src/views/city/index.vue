<template>
  <Suspense>
    <template #default>
      <component :is="cityComponent" />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// import GuangXi from "@/views/city/compents/guangxi.vue";
// import HeiLongJiang from "@/views/city/compents/heilongjiang.vue";
// import BeiJing from "@/views/city/compents/beijing.vue";
// import Jilin from "@/views/city/compents/jilin.vue";
const route = useRoute();
const { cityId } = route.params;
const cityComponent = ref(null);

onMounted(async () => {
  try {
    const component = await import(`@/views/city/compents/${cityId}.vue`);
    cityComponent.value = component.default;
  } catch (error) {
    console.error(`无法加载城市组件: ${error}`);
  }
});
</script>

<style scoped></style>
