<template>
  <el-container>
    <el-aside><Left /></el-aside>
    <el-main><HomeBg /></el-main>
    <el-aside><Right /></el-aside>
  </el-container>
</template>

<script setup>
import Left from "@/views/Home/components/Left.vue";
import Right from "@/views/Home/components/Right.vue";
import HomeBg from "@/components/homeBg.vue";
</script>

<style scoped lang="less">
.el-aside {
  margin: 10px;
}
</style>
