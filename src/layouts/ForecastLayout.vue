<template>
    <el-container>
      <el-main>1212</el-main>
      <el-aside width="40%">121</el-aside>
    </el-container>
  </template>
  
  <script setup>
  import Map from "@/components/Map.vue";
  import ChatBox from "@/components/ChatBox.vue"
  
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
  