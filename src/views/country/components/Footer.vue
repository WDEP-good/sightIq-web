<template>
  <div class="footer">
    <el-row :gutter="20" align="middle">
      <el-col :span="6" v-for="(stat, index) in otherStats" :key="index">
        <div class="stat-item">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const otherStats = [
  { label: "平均停留时间", value: "4.2小时" },
  { label: "满意度评分", value: "4.8分" },
  { label: "重复游览率", value: "35%" },
  { label: "景点开放数量", value: "128个" },
];
</script>

<style scoped lang="less">
.footer {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 20px;
  .el-row{
    height: 100%;
  }
}

.stat-item {
  text-align: center;
  color: white;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}
</style>
