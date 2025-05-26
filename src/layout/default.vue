<template>
  <el-row>
    <el-col :span="24"><Header /></el-col
  ></el-row>
  <el-row :gutter="20">
    <el-col :span="8">
      <RouterView name="right" />
    </el-col>
    <el-col :span="8"></el-col>
    <el-col :span="8"> <RouterView name="left" /></el-col>
  </el-row>
</template>

<script setup>
import HomeBg from "@/components/homeBg.vue";
import LoginBg from "@/components/loginBg.vue";
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<style scoped lang="less">
@viewWith: 100vw;
@viewheith: 100vh;
</style>
