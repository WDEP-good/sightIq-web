<template>
  <div class="city-detail">
    <el-row :gutter="12">
      <!-- 第一行：推荐城市和月度游客 -->
      <el-col :span="12">
        <div class="city-detail__title">推荐旅游城市</div>
        <div class="city-detail__content">
          <div ref="cityChartRef" class="city-detail__chart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="city-detail__title">月游客趋势</div>
        <div class="city-detail__content">
          <div ref="monthlyChartRef" class="city-detail__chart"></div>
        </div>
      </el-col>

      <!-- 第二行：日游客和季节热门 -->
      <el-col :span="12">
        <div class="city-detail__title">日游客变化</div>
        <div class="city-detail__content">
          <div ref="dailyChartRef" class="city-detail__chart"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="city-detail__title">景区排名 TOP5</div>
        <div class="city-detail__content">
          <div ref="rankingChartRef" class="city-detail__chart"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const recommendedCities = [
  { name: "北京", value: 85 },
  { name: "上海", value: 82 },
  { name: "成都", value: 78 },
  { name: "西安", value: 76 },
  { name: "广州", value: 75 },
];

const monthlyVisitors = 326.5;
const dailyVisitors = 25631;

const rankingSpots = [
  { rank: 1, name: "西湖景区", visitor_count: 52341, growth_rate: 0.15 },
  { rank: 2, name: "千岛湖", visitor_count: 45123, growth_rate: 0.08 },
  { rank: 3, name: "雁荡山", visitor_count: 38654, growth_rate: -0.05 },
];

// 图表引用
const cityChartRef = ref();
const monthlyChartRef = ref();
const dailyChartRef = ref();
const rankingChartRef = ref();

onMounted(() => {
  // 推荐城市柱状图
  const cityChart = echarts.init(cityChartRef.value);
  cityChart.setOption({
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: recommendedCities.map((city) => city.name),
    },
    yAxis: { type: "value", name: "推荐指数" },
    series: [
      {
        type: "bar",
        data: recommendedCities.map((city) => city.value),
        itemStyle: { color: "#409EFF" },
      },
    ],
  });

  // 月游客趋势折线图
  const monthlyChart = echarts.init(monthlyChartRef.value);
  monthlyChart.setOption({
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    yAxis: { type: "value", name: "游客量(万人)" },
    series: [
      {
        type: "line",
        data: [280, 290, 305, 315, 320, monthlyVisitors],
        smooth: true,
        itemStyle: { color: "#67C23A" },
      },
    ],
  });

  // 日游客变化图
  const dailyChart = echarts.init(dailyChartRef.value);
  dailyChart.setOption({
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: { type: "value", name: "游客数" },
    series: [
      {
        type: "line",
        data: [20000, 22000, 23000, 24000, 25000, dailyVisitors, 26000],
        areaStyle: {},
        itemStyle: { color: "#E6A23C" },
      },
    ],
  });

  // 景区排名条形图
  const rankingChart = echarts.init(rankingChartRef.value);
  rankingChart.setOption({
    tooltip: { trigger: "axis" },
    xAxis: { type: "value", name: "游客数" },
    yAxis: { type: "category", data: rankingSpots.map((spot) => spot.name) },
    series: [
      {
        type: "bar",
        data: rankingSpots.map((spot) => spot.visitor_count),
        itemStyle: { color: "#409EFF" },
      },
    ],
  });
});
</script>

<style scoped lang="less">
@primary-color: #409eff;
@success-color: #67c23a;
@warning-color: #e6a23c;
@danger-color: #f56c6c;
@text-color: #909399;
@bg-opacity: rgba(255, 255, 255, 0.05);
@bg-opacity-hover: rgba(255, 255, 255, 0.08);

.city-detail {
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  
  :deep(.el-row) {
    margin-bottom: 20px !important;
  }

  :deep(.el-col) {
    margin-bottom: 20px;
  }

  &__title {
    font-size: 16px;
    color: #fff;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 4px solid @primary-color;
    display: flex;
    align-items: center;
  }

  &__content {
    width: 100%;
    height: 280px;
    background: @bg-opacity;
    border-radius: 8px;
    padding: 12px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: @bg-opacity-hover;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  &__chart {
    width: 100%;
    height: 100%;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
}

.city {
  &-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &-value {
    color: @primary-color;
    font-weight: bold;
  }
}

.stat {
  &-value {
    font-size: 28px;
    color: @primary-color;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &-compare {
    font-size: 14px;
    color: @text-color;
  }
}

.growth-rate {
  &.positive {
    color: @success-color;
  }
  &.negative {
    color: @danger-color;
  }
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
  color: #409eff;
  font-weight: bold;
}

.scenic-list {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.scenic-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.ranking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.rank-number {
  background: #409eff;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 10px;
}

.seasonal-item {
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.spot-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.popularity {
  color: #e6a23c;
  font-weight: bold;
}

.attractions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.attraction-tag {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
  border: none;
}
</style>
