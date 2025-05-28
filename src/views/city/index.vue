<template>
  <component :is="cityMap" />
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import GuangXi from "@/views/city/compents/guangxi.vue";
import HeiLongJiang from "@/views/city/compents/heilongjiang.vue";
import BeiJing from "@/views/city/compents/beijing.vue";
const route = useRoute();
const { cityId } = route.params;
console.log(cityId);

const cityMap = computed(() => {
  switch (cityId) {
    case "guangxi":
      return GuangXi;
    case "heilongjiang":
      return HeiLongJiang;
    case "beijing":
      return BeiJing;
  }
});
</script>

<style scoped></style>
