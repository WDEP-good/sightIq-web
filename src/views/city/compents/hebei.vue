<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartHeBei"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import hebeijson from "@/assets/hebei.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("河北", hebeijson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartHeBei"));
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
    if (index >= 11) {
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
      if (index >= 11) {
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

var mapHeBeiData = [
  {
    name: "石家庄市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [114.502461, 38.045474],
  },
  {
    name: "唐山市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [118.175393, 39.635113],
  },
  {
    name: "秦皇岛市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [119.586579, 39.942531],
  },
  {
    name: "邯郸市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [114.490686, 36.612273],
  },
  {
    name: "邢台市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [114.508851, 37.0682],
  },
  {
    name: "保定市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [115.482331, 38.867657],
  },
  {
    name: "张家口市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [114.884091, 40.811901],
  },
  {
    name: "承德市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [117.939152, 40.976204],
  },
  {
    name: "沧州市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [116.857461, 38.310582],
  },
  {
    name: "廊坊市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [116.704441, 39.523927],
  },
  {
    name: "衡水市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [115.665993, 37.735097],
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
      map: "河北",
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
      name: "河北数据",
      type: "map",
      map: "河北",
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
      data: mapHeBeiData,
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

#chartHeBei {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 