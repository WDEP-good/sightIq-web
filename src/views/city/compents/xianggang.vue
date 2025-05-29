<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartXiangGang"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import hongkong from "@/assets/map/xianggang.json";

let myChart: echarts.ECharts | null = null;

echarts.registerMap("香港", hongkong as any);

const initChart = () => {
  if (!myChart) {
    myChart = echarts.init(document.getElementById("chartXiangGang") as HTMLElement);
  }
  
  const option = {
    geo: {
      map: "香港",
      roam: true,
      zoom: 1.2,
      label: {
        show: true,
        color: "#fff",
        fontSize: 12,
      },
      itemStyle: {
        areaColor: "#0c1c4c",
        borderColor: "#1cccff",
      },
      emphasis: {
        itemStyle: {
          areaColor: "#0c1c4c",
        },
        label: {
          color: "#fff",
        },
      },
    },
    series: [
      {
        type: "scatter",
        coordinateSystem: "geo",
        data: mapXiangGangData.map(item => ({
          name: item.name,
          value: [...item.coordinate, item.tradeBidsectionCount],
        })),
        symbolSize: 8,
        label: {
          show: true,
          formatter: "{b}",
          position: "right",
        },
        itemStyle: {
          color: "#1cccff",
        },
      },
    ],
  };

  myChart.setOption(option);
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", () => {
    myChart?.resize();
  });
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
  window.removeEventListener("resize", () => {
    myChart?.resize();
  });
});

const mapXiangGangData = [
  {
    name: "中西区",
    tradeBidsectionCount: 100,
    coordinate: [114.154374, 22.286074],
  },
  {
    name: "湾仔",
    tradeBidsectionCount: 90,
    coordinate: [114.182915, 22.276389],
  },
  {
    name: "东区",
    tradeBidsectionCount: 80,
    coordinate: [114.225983, 22.279714],
  },
  {
    name: "南区",
    tradeBidsectionCount: 70,
    coordinate: [114.174288, 22.246738],
  },
  {
    name: "油尖旺",
    tradeBidsectionCount: 85,
    coordinate: [114.173332, 22.311632],
  },
  {
    name: "深水埗",
    tradeBidsectionCount: 75,
    coordinate: [114.163349, 22.330781],
  },
  {
    name: "九龙城",
    tradeBidsectionCount: 65,
    coordinate: [114.195053, 22.328937],
  },
  {
    name: "黄大仙",
    tradeBidsectionCount: 60,
    coordinate: [114.203364, 22.339530],
  },
  {
    name: "观塘",
    tradeBidsectionCount: 95,
    coordinate: [114.231268, 22.309430],
  }
];
</script>

<style scoped lang="less">
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-row {
  flex: 1;
  position: relative;
  min-height: 0;
  height: 100vh;
}

#chartXiangGang {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
