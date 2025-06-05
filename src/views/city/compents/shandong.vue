<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartShanDong"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import shandongjson from "@/assets/shandong.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("山东", shandongjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartShanDong"));
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
    if (index >= 16) {
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
      if (index >= 16) {
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

var mapShanDongData = [
  {
    name: "济南市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [117.000923, 36.675807],
  },
  {
    name: "青岛市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [120.355173, 36.082982],
  },
  {
    name: "淄博市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [118.047648, 36.814939],
  },
  {
    name: "枣庄市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [117.557964, 34.856424],
  },
  {
    name: "东营市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [118.66471, 37.434564],
  },
  {
    name: "烟台市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [121.391382, 37.539297],
  },
  {
    name: "潍坊市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [119.107078, 36.70925],
  },
  {
    name: "济宁市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [116.587245, 35.415393],
  },
  {
    name: "泰安市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [117.129063, 36.194968],
  },
  {
    name: "威海市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [122.116394, 37.509691],
  },
  {
    name: "日照市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [119.461208, 35.428588],
  },
  {
    name: "临沂市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [118.326443, 35.065282],
  },
  {
    name: "德州市",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [116.307428, 37.453968],
  },
  {
    name: "聊城市",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [115.980367, 36.456013],
  },
  {
    name: "滨州市",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [118.016974, 37.383542],
  },
  {
    name: "菏泽市",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [115.469381, 35.246531],
  }
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
      var x = 0;
      var y = 0;
      var pointX = point[0];
      var pointY = point[1];
      var boxWidth = size.contentSize[0];
      var boxHeight = size.contentSize[1];

      if (boxWidth > pointX) {
        x = pointX + 10;
      } else {
        x = pointX - boxWidth - 10;
      }

      if (boxHeight > pointY) {
        y = 5;
      } else {
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
      var tipHtml = `
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
      map: "山东",
      aspectScale: 0.75,
      zoom: 1.1,
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
      name: "山东数据",
      type: "map",
      map: "山东",
      aspectScale: 0.75,
      zoom: 1.1,
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
      layoutSize: "95%",
      markPoint: {
        symbol: "none",
      },
      data: mapShanDongData,
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

#chartShanDong {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 