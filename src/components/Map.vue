<template>
  <div id="container" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

onMounted(() => {
  AMapLoader.load({
    key: "e897de6affc39cf32fe33982b7692ea5", // 替换为你申请的Key
    version: "2.0", // SDK版本
    plugins: [], // 如需插件可填入，例如 ['AMap.Geocoder']
  })
    .then((AMap) => {
      const map = new AMap.Map("container", {
        viewMode: "3D",
        zoom: 11,
        center: [116.397428, 39.90923],
      });
    })
    .catch((e) => {
      console.error("高德地图加载失败：", e);
    });
});
</script>



<style scoped lang="less">
#container {
  width: 100%;
  height: 100%;
  position: relative;
}

</style>