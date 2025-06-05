<template>
  <div class="layout-container">
    <el-container>
      <el-header><Header /></el-header>
      <component :is="layout" />
    </el-container>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Header from "@/components/Header.vue";
import DefaultLayout from "@/layouts/default.vue";
import CityLayout from "@/layouts/cityLayout.vue";
import AnalysisLayout from "@/layouts/AnalysisLayout.vue";
import ForecastLayout from "@/layouts/ForecastLayout.vue";

const route = useRoute();

const layout = computed(() => {
  if (route.params.cityId) return CityLayout;
  if (route.name === "analysis") return AnalysisLayout;
  if (route.name === "forecast") return ForecastLayout;
  return DefaultLayout;
});
</script>

<style scoped lang="less">
.layout-container {
  width: 100vw;
  min-height: 100vh;

  .el-container {
    height: 100vh;
    .el-header {
      margin: 10px;
    }
    .el-footer {
      height: 25%;
      margin: 10px;
    }
    .el-aside {
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      margin: 10px;
    }
  }
}
</style>
