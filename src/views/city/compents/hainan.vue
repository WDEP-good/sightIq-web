<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartHaiNan"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import hainanjson from "@/assets/hainan.json";

let myChart: echarts.ECharts | null = null;
echarts.registerMap("海南", hainanjson as any);

// 添加初始化函数
const initChart = () => {
  if (!myChart) {
    myChart = echarts.init(document.getElementById("chartHaiNan") as HTMLElement);
  }
  
  const option = {
    geo: {
      map: "海南",
      roam: true,
      zoom: 1.2,
      center: [109.844902, 19.0392],
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
        data: mapHaiNanData.map(item => ({
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

// 添加生命周期钩子
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

var mapHaiNanData = [
  {
    name: "海口市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [110.198293, 20.044001],
  },
  {
    name: "三亚市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [109.508268, 18.247872],
  },
  {
    name: "三沙市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [112.34882, 16.831039],
  },
  {
    name: "儋州市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [109.576782, 19.517486],
  },
  {
    name: "五指山市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [109.516662, 18.776921],
  },
  {
    name: "琼海市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [110.466785, 19.246011],
  },
  {
    name: "文昌市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [110.753975, 19.612986],
  },
  {
    name: "万宁市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [110.388793, 18.796216],
  },
  {
    name: "东方市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [108.653789, 19.10198],
  },
  {
    name: "定安县",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [110.349235, 19.684966],
  },
  {
    name: "屯昌县",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [110.102773, 19.362916],
  },
  {
    name: "澄迈县",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [110.007147, 19.737095],
  },
  {
    name: "临高县",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [109.687697, 19.908293],
  },
  {
    name: "白沙黎族自治县",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [109.452606, 19.224584],
  },
  {
    name: "昌江黎族自治县",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [109.053351, 19.260968],
  },
  {
    name: "乐东黎族自治县",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [109.175444, 18.74758],
  },
  {
    name: "陵水黎族自治县",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [110.037218, 18.505006],
  },
  {
    name: "保亭黎族苗族自治县",
    tradeBidsectionCount: 15,
    tradeProjectCount: 30,
    coordinate: [109.70245, 18.636371],
  },
  {
    name: "琼中黎族苗族自治县",
    tradeBidsectionCount: 10,
    tradeProjectCount: 20,
    coordinate: [109.839996, 19.03557],
  }
];

// ... 其余配置与之前类似 ...

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

#chartHaiNan {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 