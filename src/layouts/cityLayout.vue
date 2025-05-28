<template>
  <el-container>
    <el-container>
      <el-main><RouterView /></el-main>
    </el-container>
    <el-aside width="40%"><CityDetail /></el-aside>
  </el-container>
</template>

<script setup>
import CityDetail from "@/components/CityDetail.vue"

</script>

<style scoped lang="less">
.el-container {
  height: 100%;
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
