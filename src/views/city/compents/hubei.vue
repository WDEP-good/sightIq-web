<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartHuBei"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import hubeijson from "@/assets/hubei.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("湖北", hubeijson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartHuBei"));
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
    if (index >= 17) {
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
      if (index >= 17) {
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

var mapHuBeiData = [
  {
    name: "武汉市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [114.298572, 30.584355],
  },
  {
    name: "黄石市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [115.077048, 30.220074],
  },
  {
    name: "十堰市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [110.787916, 32.646907],
  },
  {
    name: "宜昌市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [111.290843, 30.702636],
  },
  {
    name: "襄阳市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [112.144146, 32.042426],
  },
  {
    name: "鄂州市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [114.890593, 30.396536],
  },
  {
    name: "荆门市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [112.204251, 31.03542],
  },
  {
    name: "孝感市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [113.926655, 30.926423],
  },
  {
    name: "荆州市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [112.23813, 30.326857],
  },
  {
    name: "黄冈市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [114.879365, 30.447711],
  },
  {
    name: "咸宁市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [114.328963, 29.832798],
  },
  {
    name: "随州市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [113.37377, 31.717497],
  },
  {
    name: "恩施土家族苗族自治州",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [109.48699, 30.283114],
  },
  {
    name: "仙桃市",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [113.453974, 30.364953],
  },
  {
    name: "潜江市",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [112.896866, 30.421215],
  },
  {
    name: "天门市",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [113.165862, 30.653061],
  },
  {
    name: "神农架林区",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [110.671525, 31.744449],
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
      map: "湖北",
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
      name: "湖北数据",
      type: "map",
      map: "湖北",
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
      data: mapHuBeiData,
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

#chartHuBei {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 