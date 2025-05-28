<template>
  <el-container>
    <el-aside><Left /></el-aside>
    <el-main><RouterView /></el-main>
    <el-aside><Right /></el-aside>
  </el-container>
</template>

<script setup>

import Left from "@/views/country/components/Left.vue";
import Right from "@/views/country/components/Right.vue";
</script>

<style scoped lang="less">
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
</style>
