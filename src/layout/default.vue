<template>
  <el-container>
    <el-header><Header /></el-header>
    <LayoutContainer />
  </el-container>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/views/Home/components/Footer.vue";
import LayoutContainer from "@/layout/layoutcontainer.vue";
</script>

<style scoped lang="less">
.el-container {
  height:100vh;
  .el-header {
    margin: 10px;
  }
  .el-footer {
    height: 25%;
    margin: 10px;
  }
}
</style>
