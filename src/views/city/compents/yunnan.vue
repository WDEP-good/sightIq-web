<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartYunNan"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import yunnanjson from "@/assets/yunnan.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("云南", yunnanjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartYunNan"));
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

var mapYunNanData = [
  {
    name: "昆明市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [102.712251, 25.040609],
  },
  {
    name: "曲靖市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [103.797851, 25.501557],
  },
  {
    name: "玉溪市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [102.543907, 24.350461],
  },
  {
    name: "保山市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [99.167133, 25.111802],
  },
  {
    name: "昭通市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [103.717216, 27.336999],
  },
  {
    name: "丽江市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [100.233026, 26.872108],
  },
  {
    name: "普洱市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [100.972344, 22.777321],
  },
  {
    name: "临沧市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [100.08697, 23.886567],
  },
  {
    name: "楚雄彝族自治州",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [101.546046, 25.041988],
  },
  {
    name: "红河哈尼族彝族自治州",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [103.384182, 23.366775],
  },
  {
    name: "文山壮族苗族自治州",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [104.24401, 23.36951],
  },
  {
    name: "西双版纳傣族自治州",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [100.797941, 22.001724],
  },
  {
    name: "大理白族自治州",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [100.225668, 25.589449],
  },
  {
    name: "德宏傣族景颇族自治州",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [98.578363, 24.436694],
  },
  {
    name: "怒江傈僳族自治州",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [98.854304, 25.850949],
  },
  {
    name: "迪庆藏族自治州",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [99.706463, 27.826853],
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
      map: "云南",
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
      name: "云南数据",
      type: "map",
      map: "云南",
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
      data: mapYunNanData,
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

#chartYunNan {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 