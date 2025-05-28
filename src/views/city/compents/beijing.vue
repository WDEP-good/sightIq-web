<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartBeijing"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import beijingjson from "@/assets/110000.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

// 在组件初始化时就注册地图数据
echarts.registerMap("北京", beijingjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartBeijing"));
  myChart.showLoading();

  setTimeout(() => {
    if (myChart) {
      myChart.hideLoading();
      myChart.setOption(option, true);

      window.addEventListener("resize", handleResize);
    }
  }, 1000);

  // 鼠标交互事件
  myChart.on("mouseover", function (params) {
    console.log(params);
    clearInterval(showTip);
    myChart?.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    });
  });

  var showTip = setInterval(function () {
    myChart?.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    index++;
    if (index >= 14) {
      index = 0;
    }
  }, 2000);

  myChart.on("mouseout", function (_params) {
    showTip && clearInterval(showTip);
    showTip = setInterval(function () {
      myChart?.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index >= 14) {
        index = 0;
      }
    }, 2000);
  });
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

var mapBeijingData = [
  {
    name: "北京市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [116.405285, 39.904989],
  },
  {
    name: "东城区",
    tradeBidsectionCount: 80,
    tradeProjectCount: 150,
    coordinate: [116.416357, 39.928353],
  },
  {
    name: "西城区",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [116.366794, 39.915309],
  },
  {
    name: "朝阳区",
    tradeBidsectionCount: 120,
    tradeProjectCount: 240,
    coordinate: [116.443108, 39.921489],
  },
  {
    name: "海淀区",
    tradeBidsectionCount: 150,
    tradeProjectCount: 280,
    coordinate: [116.298262, 39.959333],
  },
  {
    name: "丰台区",
    tradeBidsectionCount: 70,
    tradeProjectCount: 160,
    coordinate: [116.287149, 39.858427],
  },
  {
    name: "石景山区",
    tradeBidsectionCount: 50,
    tradeProjectCount: 120,
    coordinate: [116.222982, 39.906611],
  },
  {
    name: "门头沟区",
    tradeBidsectionCount: 40,
    tradeProjectCount: 100,
    coordinate: [116.102009, 39.940646],
  },
  {
    name: "房山区",
    tradeBidsectionCount: 45,
    tradeProjectCount: 110,
    coordinate: [116.143267, 39.749144],
  },
  {
    name: "通州区",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [116.656435, 39.909946],
  },
  {
    name: "顺义区",
    tradeBidsectionCount: 60,
    tradeProjectCount: 130,
    coordinate: [116.654651, 40.130347],
  },
  {
    name: "昌平区",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [116.231204, 40.22066],
  },
  {
    name: "大兴区",
    tradeBidsectionCount: 65,
    tradeProjectCount: 140,
    coordinate: [116.341395, 39.726929],
  },
  {
    name: "怀柔区",
    tradeBidsectionCount: 35,
    tradeProjectCount: 90,
    coordinate: [116.631889, 40.316876],
  },
  {
    name: "平谷区",
    tradeBidsectionCount: 30,
    tradeProjectCount: 80,
    coordinate: [117.121383, 40.140701],
  },
  {
    name: "密云区",
    tradeBidsectionCount: 25,
    tradeProjectCount: 70,
    coordinate: [116.843352, 40.377362],
  },
  {
    name: "延庆区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 60,
    coordinate: [115.974848, 40.456951],
  },
];

let option = {
  backgroundColor: "transparent",
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
      map: "北京",
      aspectScale: 1,
      zoom: 0.65,
      layoutCenter: ["50%", "50%"],
      layoutSize: "180%",
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
          shadowColor: "rgba(58,149,253,0.8)",
          shadowOffsetY: 5,
          shadowBlur: 15,
          areaColor: "transparent",
        },
      },
    },
  ],
  series: [
    {
      name: "北京市数据",
      type: "map",
      map: "北京",
      aspectScale: 1,
      zoom: 0.65,
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
          show: false,
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
                color: "rgba(3,27,78,0.75)",
              },
              {
                offset: 1,
                color: "rgba(58,149,253,0.75)",
              },
            ],
            global: true,
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
      layoutSize: "180%",
      markPoint: {
        symbol: "none",
      },
      data: mapBeijingData,
    },
  ],
};
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

#chartBeijing {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
