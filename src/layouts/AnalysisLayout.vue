<template>
  <el-container>
    <el-main><Map /></el-main>
    <el-aside width="35%"><ChatBox /></el-aside>
  </el-container>
</template>

<script setup>
import Map from "@/components/Map.vue";
import ChatBox from "@/components/ChatBox.vue"

</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  .el-aside {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin: 10px;
  }
}
</style>
