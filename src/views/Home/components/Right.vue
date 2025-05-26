<template>
  <div class="right">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="title">推荐旅游城市</div>
        <div class="content">
          <div class="city-list">
            <div v-for="city in recommendedCities" :key="city.name" class="city-item">
              <span class="city-name">{{ city.name }}</span>
              <span class="city-value">{{ city.value }}%</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="title">月游客总量</div>
        <div class="content">
          <div class="stat-value">{{ monthlyVisitors }}万人</div>
          <div class="stat-compare">较上月{{ monthlyGrowth > 0 ? '增长' : '下降' }} {{ Math.abs(monthlyGrowth) }}%</div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="title">日游客总量</div>
        <div class="content">
          <div class="stat-value">{{ dailyVisitors }}人</div>
          <div class="stat-compare">较昨日{{ dailyGrowth > 0 ? '增长' : '下降' }} {{ Math.abs(dailyGrowth) }}%</div>
        </div>
      </el-col>
     
    </el-row>
  </div>
</template>

<script setup lang="ts">
const recommendedCities = [
  { name: '北京', value: 85 },
  { name: '上海', value: 82 },
  { name: '成都', value: 78 },
  { name: '西安', value: 76 },
  { name: '广州', value: 75 }
]

const monthlyVisitors = 326.5
const monthlyGrowth = 12.8

const dailyVisitors = 25631
const dailyGrowth = -2.5


</script>

<style scoped>
.right {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.el-col {
  margin-bottom: 20px;
}

.title {
  font-size: 16px;
  color: #fff;
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 4px solid #409EFF;
  display: flex;
  align-items: center;
}

.content {
  width: 100%;
  height: calc(100% - 35px);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.content:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 移除最后一个区块的底部边距 */
.el-col:last-child {
  margin-bottom: 0;
}

.city-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.city-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.city-value {
  color: #409EFF;
  font-weight: bold;
}

.stat-value {
  font-size: 28px;
  color: #409EFF;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-compare {
  font-size: 14px;
  color: #909399;
}

.other-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.other-item:last-child {
  margin-bottom: 0;
}

.label {
  color: #909399;
}

.value {
  color: #409EFF;
  font-weight: bold;
}
</style>
