<template>
  <el-col :span="24" class="map-container">
    <el-row class="chart-row">
      <div id="chartLiaoNing"></div>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
// @ts-ignore
import liaoningjson from "@/assets/liaoning.json";

let myChart: echarts.ECharts | null = null;
var index = 0; //播放所在下标

echarts.registerMap("辽宁", liaoningjson as any);

onMounted(() => {
  myChart = echarts.init(document.getElementById("chartLiaoNing"));
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

var mapLiaoNingData = [
  {
    name: "沈阳市",
    tradeBidsectionCount: 100,
    tradeProjectCount: 200,
    coordinate: [123.429096, 41.796767],
  },
  {
    name: "大连市",
    tradeBidsectionCount: 95,
    tradeProjectCount: 190,
    coordinate: [121.618622, 38.91459],
  },
  {
    name: "鞍山市",
    tradeBidsectionCount: 90,
    tradeProjectCount: 180,
    coordinate: [122.995632, 41.110626],
  },
  {
    name: "抚顺市",
    tradeBidsectionCount: 85,
    tradeProjectCount: 170,
    coordinate: [123.921109, 41.875956],
  },
  {
    name: "本溪市",
    tradeBidsectionCount: 80,
    tradeProjectCount: 160,
    coordinate: [123.770519, 41.297909],
  },
  {
    name: "丹东市",
    tradeBidsectionCount: 75,
    tradeProjectCount: 150,
    coordinate: [124.383044, 40.124296],
  },
  {
    name: "锦州市",
    tradeBidsectionCount: 70,
    tradeProjectCount: 140,
    coordinate: [121.135742, 41.119269],
  },
  {
    name: "营口市",
    tradeBidsectionCount: 65,
    tradeProjectCount: 130,
    coordinate: [122.235151, 40.667432],
  },
  {
    name: "阜新市",
    tradeBidsectionCount: 60,
    tradeProjectCount: 120,
    coordinate: [121.648962, 42.011796],
  },
  {
    name: "辽阳市",
    tradeBidsectionCount: 55,
    tradeProjectCount: 110,
    coordinate: [123.18152, 41.269402],
  },
  {
    name: "盘锦市",
    tradeBidsectionCount: 50,
    tradeProjectCount: 100,
    coordinate: [122.06957, 41.124484],
  },
  {
    name: "铁岭市",
    tradeBidsectionCount: 45,
    tradeProjectCount: 90,
    coordinate: [123.844279, 42.290585],
  },
  {
    name: "朝阳市",
    tradeBidsectionCount: 40,
    tradeProjectCount: 80,
    coordinate: [120.451176, 41.576758],
  },
  {
    name: "葫芦岛市",
    tradeBidsectionCount: 35,
    tradeProjectCount: 70,
    coordinate: [120.856394, 40.755572],
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
      map: "辽宁",
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
      name: "辽宁数据",
      type: "map",
      map: "辽宁",
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
      data: mapLiaoNingData,
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

#chartLiaoNing {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 