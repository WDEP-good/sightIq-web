<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartGanSu"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import gansujson from "@/assets/gansu.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("甘肃", gansujson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartGanSu"));
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

var mapGanSuData = [
  {
    name: "兰州市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [103.823557, 36.058039],
  },
  {
    name: "嘉峪关市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [98.277304, 39.786529],
  },
  {
    name: "金昌市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [102.187888, 38.514238],
  },
  {
    name: "白银市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [104.173606, 36.54568],
  },
  {
    name: "天水市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [105.724998, 34.578529],
  },
  {
    name: "武威市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [102.634697, 37.929996],
  },
  {
    name: "张掖市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [100.455472, 38.932897],
  },
  {
    name: "平凉市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [106.684691, 35.54279],
  },
  {
    name: "酒泉市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [98.510795, 39.744023],
  },
  {
    name: "庆阳市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [107.638372, 35.734218],
  },
  {
    name: "定西市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [104.626294, 35.579578],
  },
  {
    name: "陇南市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [104.929379, 33.388598],
  },
  {
    name: "临夏回族自治州",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [103.212006, 35.599446],
  },
  {
    name: "甘南藏族自治州",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [102.911008, 34.986354],
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
      map: "甘肃",
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
      name: "甘肃数据",
      type: "map",
      map: "甘肃",
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
      data: mapGanSuData,
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

#chartGanSu {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 