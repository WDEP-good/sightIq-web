<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartSiChuan"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import sichuanjson from "@/assets/sichuan.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("四川", sichuanjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartSiChuan"));
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
    if (index >= 21) {
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
      if (index >= 21) {
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

var mapSiChuanData = [
  {
    name: "成都市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [104.065735, 30.659462],
  },
  {
    name: "自贡市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [104.773447, 29.352765],
  },
  {
    name: "攀枝花市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [101.716007, 26.580446],
  },
  {
    name: "泸州市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [105.443348, 28.889138],
  },
  {
    name: "德阳市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [104.398651, 31.127991],
  },
  {
    name: "绵阳市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [104.741722, 31.46402],
  },
  {
    name: "广元市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [105.829757, 32.433668],
  },
  {
    name: "遂宁市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [105.571331, 30.513311],
  },
  {
    name: "内江市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [105.066138, 29.58708],
  },
  {
    name: "乐山市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [103.761263, 29.582024],
  },
  {
    name: "南充市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [106.082974, 30.795281],
  },
  {
    name: "眉山市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [103.831788, 30.048318],
  },
  {
    name: "宜宾市",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [104.630825, 28.760189],
  },
  {
    name: "广安市",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [106.633369, 30.456398],
  },
  {
    name: "达州市",
    tradeBidsectionCount: 30,
    tradeProjectCount: 60,
    coordinate: [107.502262, 31.209484],
  },
  {
    name: "雅安市",
    tradeBidsectionCount: 25,
    tradeProjectCount: 50,
    coordinate: [103.001033, 29.987722],
  },
  {
    name: "巴中市",
    tradeBidsectionCount: 20,
    tradeProjectCount: 40,
    coordinate: [106.753669, 31.858809],
  },
  {
    name: "资阳市",
    tradeBidsectionCount: 15,
    tradeProjectCount: 30,
    coordinate: [104.641917, 30.122211],
  },
  {
    name: "阿坝藏族羌族自治州",
    tradeBidsectionCount: 10,
    tradeProjectCount: 20,
    coordinate: [102.221374, 31.899792],
  },
  {
    name: "甘孜藏族自治州",
    tradeBidsectionCount: 5,
    tradeProjectCount: 10,
    coordinate: [101.963815, 30.050663],
  },
  {
    name: "凉山彝族自治州",
    tradeBidsectionCount: 1,
    tradeProjectCount: 2,
    coordinate: [102.258746, 27.886762],
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
      map: "四川",
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
      name: "四川数据",
      type: "map",
      map: "四川",
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
      data: mapSiChuanData,
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

#chartSiChuan {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 