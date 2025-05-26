<template>
  <div class="footer">
    <el-row :gutter="20">
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
import { onMounted } from "vue";
// import * as echarts from 'echarts';

const otherStats = [
  { label: '平均停留时间', value: '4.2小时' },
  { label: '满意度评分', value: '4.8分' },
  { label: '重复游览率', value: '35%' },
  { label: '景点开放数量', value: '128个' }
]

onMounted(() => {
  // let myChart = echarts.init(document.getElementById('chartfooterdemo1'), null, {
  //     width: '10',
  //     height: '15',
  // });
  // myChart.showLoading();
  // myChart.hideLoading();
  // myChart.setOption(option);
  // 点击事件:鼠标移入
  // myChart.on('mouseover', function (params: any) {
  // });
});
//做环形图的本质是 radius: ['内半径', '外半径'] 内半径!=0
//画渐变色的原理是：data里面可以设置itemStyle
</script>

<style scoped>
.footer {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 20px;
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
