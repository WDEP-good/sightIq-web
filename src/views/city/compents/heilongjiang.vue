<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartHeiLongJiang"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import heilongjiangjson from "@/assets/heilongjiang.json";

// 在组件初始化时就注册地图数据
echarts.registerMap("黑龙江", heilongjiangjson as any);

let myChart: echarts.ECharts | null = null;

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartHeiLongJiang"));
  myChart.showLoading();

  setTimeout(() => {
    if (myChart) {
      myChart.hideLoading();
      myChart.setOption(option, true);

      window.addEventListener("resize", handleResize);
    }
  }, 1000);
});

const handleResize = () => {
  if (myChart) {
    myChart.resize();
  }
};

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
  window.removeEventListener("resize", handleResize);
});

var mapGuangxiData = [
  {
    name: "全省",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [126.642464, 45.756967],
  },
  {
    name: "哈尔滨市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [126.642464, 45.756967],
  },
  {
    name: "牡丹江市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [129.618602, 44.582962],
  },
  {
    name: "大庆市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [125.11272, 46.590734],
  },
  {
    name: "齐齐哈尔市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [123.95792, 47.342081],
  },
  {
    name: "绥化市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [126.99293, 46.637393],
  },
  {
    name: "七台河市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [131.015584, 45.771266],
  },
  {
    name: "鸡西市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [132.297639, 45.635227],
  },
  {
    name: "黑河市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [127.499023, 50.249585],
  },
  {
    name: "伊春市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [128.899396, 47.724775],
  },
  {
    name: "鹤岗市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [130.807059, 47.644529],
  },
  {
    name: "佳木斯市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [130.361634, 46.809606],
  },
  {
    name: "双鸭山市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [131.157304, 46.643442],
  },
  {
    name: "大兴安岭地区",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [124.711526, 52.335262],
  },
];

let option = {
  tooltip: {
    trigger: "item",
    position: function (
      point: any,
      _params: any,
      _dom: any,
      _rect: any,
      size: any
    ) {
      var x = 0; // x坐标位置
      var y = 0; // y坐标位置
      // 当前鼠标位置
      var pointX = point[0];
      var pointY = point[1];
      // 提示框大小
      var boxWidth = size.contentSize[0];
      var boxHeight = size.contentSize[1];

      // boxWidth > pointX 说明鼠标左边放不下提示框
      if (boxWidth > pointX) {
        x = pointX + 10;
      } else {
        // 左边放的下
        x = pointX - boxWidth - 10;
      }

      // boxHeight > pointY 说明鼠标上边放不下提示框
      if (boxHeight > pointY) {
        y = 5;
      } else {
        // 上边放得下
        y = pointY - boxHeight;
      }
      return [x, y];
    },
    show: true,
    enterable: true,
    textStyle: {
      fontSize: 13,
      color: "#fff",
    },
    backgroundColor: "rgba(0,2,89,0.8)",
    formatter: function (params: any) {
      // console.log(params)
      var tipHtml = "";
      tipHtml = `
                    <div class="ui-map-img">
                        <div class='ui-maptxt'>${params.name}</div>
                        <div class='ui-mapNum'>标段数:${params.data.tradeBidsectionCount}</div>
                        <div class='ui-mapNum'>项目数:${params.data.tradeProjectCount}</div>
                    </div>
                `;
      return tipHtml;
    },
  },
  geo: [
    {
      map: "黑龙江",
      aspectScale: 0.75,
      zoom: 1.0,
      layoutCenter: ["50%", "50%"],
      layoutSize: "95%",
      show: true,
      roam: false,
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          borderColor: "#c0f3fb",
          borderWidth: 1,
          shadowColor: "#8cd3ef",
          shadowOffsetY: 10,
          shadowBlur: 120,
          areaColor: "transparent",
        },
      },
    },
  ],
  series: [
    {
      name: "黑龙江市数据",
      type: "map",
      map: "黑龙江", // 自定义扩展图表类型
      aspectScale: 0.75,
      zoom: 1.0,
      showLegendSymbol: true,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#fff",
            fontSize: "120%",
          },
        },
        emphasis: {
          // show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: {
            type: "linear",
            x: 1200,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgba(3,27,78,0.75)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(58,149,253,0.75)", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          borderColor: "#fff",
          borderWidth: 0.2,
        },
        emphasis: {
          show: false,
          color: "#fff",
          areaColor: "rgba(0,254,233,0.6)",
        },
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "95%",
      markPoint: {
        symbol: "none",
      },
      data: mapGuangxiData,
    },
  ],
};
</script>

<style scoped>
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

#chartHeiLongJiang {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
